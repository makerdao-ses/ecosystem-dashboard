import { useMediaQuery } from '@mui/material';
import { GRAPHQL_ENDPOINT } from '@ses/config/endpoints';
import { useAuthContext } from '@ses/core/context/AuthContext';
import { useCommentActivityContext } from '@ses/core/context/CommentActivityContext';
import { useTeamContext } from '@ses/core/context/TeamContext';
import { BudgetStatus, ResourceType } from '@ses/core/models/interfaces/types';
import { triggerToast } from '@ses/core/utils/notifications';
import request from 'graphql-request';
import { useEffect, useMemo, useState } from 'react';
import { CREATE_BUDGET_STATEMENT_COMMENT } from './auditorComentingAPI';
import type { Theme } from '@mui/material';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';
import type { Team } from '@ses/core/models/interfaces/team';

const useCommentForm = (currentBudgetStatus: BudgetStatus, budgetStatementId: string, resource: ResourceType) => {
  const { permissionManager, authToken } = useAuthContext();
  const { currentTeam, setCurrentTeam } = useTeamContext();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitLabel, setSubmitLabel] = useState<string>('Submit Comment');
  const [availableStatuses, setAvailableStatuses] = useState<BudgetStatus[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<BudgetStatus | undefined>();
  const [textareaValue, setTextareaValue] = useState<string>('');

  const lastVisitHandler = useCommentActivityContext();

  // update the selected status every time the budget statement changes
  useEffect(() => {
    setSelectedStatus(currentBudgetStatus);
  }, [currentBudgetStatus, budgetStatementId]);

  // set the available statuses for the authenticated user in the current CU
  useEffect(() => {
    const hasAuditor = !!currentTeam?.auditors?.length;
    const isAuditor = permissionManager.team.isAuditor(currentTeam);

    switch (currentBudgetStatus) {
      case BudgetStatus.Draft:
        if (!isAuditor && !hasAuditor) {
          // cu admin without auditor
          setAvailableStatuses([BudgetStatus.Draft, BudgetStatus.Final]);
          break;
        } else if (!isAuditor && hasAuditor) {
          // cu admin with auditor
          setAvailableStatuses([BudgetStatus.Draft, BudgetStatus.Review]);
          break;
        }
        setAvailableStatuses([BudgetStatus.Draft]);
        break;
      case BudgetStatus.Review:
        if (isAuditor) {
          // auditor
          setAvailableStatuses([BudgetStatus.Review, BudgetStatus.Escalated, BudgetStatus.Final]);
          break;
        }
        setAvailableStatuses([BudgetStatus.Review]);
        break;
      case BudgetStatus.Final:
        if (!isAuditor) {
          setAvailableStatuses([BudgetStatus.Draft, BudgetStatus.Final]);
          break;
        } else if (isAuditor) {
          // auditor
          setAvailableStatuses([BudgetStatus.Review, BudgetStatus.Final]);
          break;
        }
        setAvailableStatuses([BudgetStatus.Final]);
        break;
      case BudgetStatus.Escalated:
        if (isAuditor) {
          setAvailableStatuses([BudgetStatus.Review, BudgetStatus.Escalated]);
          break;
        }
        setAvailableStatuses([BudgetStatus.Escalated]);
        break;
      default:
        // just can comment
        setAvailableStatuses([currentBudgetStatus]);
    }
  }, [permissionManager, currentBudgetStatus, currentTeam]);

  // update the right submit button label for each status combination
  useEffect(() => {
    const isAuditor = permissionManager.team.isAuditor(currentTeam);

    if (selectedStatus === currentBudgetStatus) {
      setSubmitLabel('Submit Comment');
    } else if (selectedStatus === BudgetStatus.Draft) {
      setSubmitLabel('Reopen');
    } else if (selectedStatus === BudgetStatus.Review) {
      setSubmitLabel(isAuditor ? 'Reopen' : 'Submit for Review');
    } else if (selectedStatus === BudgetStatus.Escalated) {
      setSubmitLabel('Escalate');
    } else if (selectedStatus === BudgetStatus.Final) {
      setSubmitLabel(isAuditor ? 'Approve' : 'Mark as Final');
    }
  }, [selectedStatus, currentBudgetStatus, permissionManager, currentTeam]);

  const handleChangeVariant = (value: BudgetStatus) => {
    setSelectedStatus(value);
  };

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTextareaValue(e.target.value);

  const handleSubmit = async () => {
    const { query, input } = CREATE_BUDGET_STATEMENT_COMMENT(
      budgetStatementId,
      permissionManager.loggedUser?.id || '',
      selectedStatus,
      textareaValue
    );

    try {
      setIsSubmitting(true);
      const newCommentResult = await request<{ budgetStatementCommentCreate: BudgetStatementComment[] }>(
        GRAPHQL_ENDPOINT,
        query,
        input,
        {
          Authorization: `Bearer ${authToken}`,
        }
      );

      const newComment = newCommentResult.budgetStatementCommentCreate[0];
      const updatedBudgetStatement = currentTeam?.budgetStatements?.map((bs) => {
        if (bs.id === newComment.budgetStatementId) {
          return {
            ...bs,
            status: newComment.status,
            comments: [...bs.comments, newComment],
          };
        }
        return bs;
      });
      const updatedCoreUnit: Team = {
        ...(currentTeam || ({} as Team)),
        budgetStatements: [...(updatedBudgetStatement || [])],
      };

      // prevent the new comment being marked as unvisited
      await lastVisitHandler?.visit();

      setCurrentTeam(updatedCoreUnit);
      setTextareaValue('');
    } catch (err) {
      triggerToast({
        message: 'An unexpected error occurred. Please try again.',
        type: 'warning',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setTextareaValue('');
    setSelectedStatus(currentBudgetStatus);
  };

  const roleString = useMemo(() => {
    if (currentTeam?.auditors?.some((auditor) => auditor.id === permissionManager.loggedUser?.id)) {
      return 'Auditor';
    }

    return `${currentTeam?.shortCode} ${resource === ResourceType.CoreUnit ? 'Core Unit' : 'Ecosystem Actor'}`;
  }, [currentTeam?.auditors, currentTeam?.shortCode, permissionManager.loggedUser?.id, resource]);

  return {
    isMobile,
    submitLabel,
    roleString,
    availableStatuses,
    selectedStatus,
    username: permissionManager.loggedUser?.username,
    textareaValue,
    isSubmitting,
    isCommenting: selectedStatus === currentBudgetStatus,
    handleChangeVariant,
    handleChangeTextarea,
    handleReset,
    handleSubmit,
  } as const;
};

export default useCommentForm;
