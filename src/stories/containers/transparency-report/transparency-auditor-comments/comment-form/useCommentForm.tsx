import { useMediaQuery } from '@mui/material';
import request from 'graphql-request';
import { useEffect, useMemo, useState } from 'react';
import lightTheme from '../../../../../../styles/theme/light';
import { GRAPHQL_ENDPOINT } from '../../../../../config/endpoints';
import { useAuthContext } from '../../../../../core/context/AuthContext';
import { useCommentActivityContext } from '../../../../../core/context/CommentActivityContext';
import { useCoreUnitContext } from '../../../../../core/context/CoreUnitContext';
import { useThemeContext } from '../../../../../core/context/ThemeContext';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import { triggerToast } from '../../../../helpers/helpers';
import { CREATE_BUDGET_STATEMENT_COMMENT } from './auditor-comenting.api';
import type { CommentsBudgetStatementDto, CoreUnitDto } from '../../../../../core/models/dto/core-unit.dto';

const useCommentForm = (currentBudgetStatus: BudgetStatus, budgetStatementId: string) => {
  const { isLight } = useThemeContext();
  const { permissionManager, authToken } = useAuthContext();
  const { currentCoreUnit, setCurrentCoreUnit } = useCoreUnitContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
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
    const hasAuditor = !!currentCoreUnit?.auditors?.length;
    const isAuditor = permissionManager.coreUnit.isAuditor(currentCoreUnit);

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
  }, [permissionManager, currentBudgetStatus, currentCoreUnit]);

  // update the right submit button label for each status combination
  useEffect(() => {
    const isAuditor = permissionManager.coreUnit.isAuditor(currentCoreUnit);

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
  }, [selectedStatus, currentBudgetStatus, permissionManager, currentCoreUnit]);

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
      const newCommentResult = await request<{ budgetStatementCommentCreate: CommentsBudgetStatementDto[] }>(
        GRAPHQL_ENDPOINT,
        query,
        input,
        {
          Authorization: `Bearer ${authToken}`,
        }
      );

      const newComment = newCommentResult.budgetStatementCommentCreate[0];
      const updatedBudgetStatement = currentCoreUnit?.budgetStatements?.map((bs) => {
        if (bs.id === newComment.budgetStatementId) {
          return {
            ...bs,
            status: newComment.status,
            comments: [...bs.comments, newComment],
          };
        }
        return bs;
      });
      const updatedCoreUnit: CoreUnitDto = {
        ...(currentCoreUnit || ({} as CoreUnitDto)),
        budgetStatements: [...(updatedBudgetStatement || [])],
      };

      // prevent the new comment being marked as unvisited
      await lastVisitHandler?.visit();

      setCurrentCoreUnit(updatedCoreUnit);
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

  const roleString = useMemo(() => {
    if (currentCoreUnit?.auditors?.some((auditor) => auditor.id === permissionManager.loggedUser?.id)) {
      return 'Auditor';
    }
    return `${currentCoreUnit?.shortCode} Core Unit`;
  }, [currentCoreUnit, permissionManager]);

  return {
    isLight,
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
    handleSubmit,
  } as const;
};

export default useCommentForm;
