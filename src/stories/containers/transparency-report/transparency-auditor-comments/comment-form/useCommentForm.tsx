import { useEffect, useMemo, useRef, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import lightTheme from '../../../../../../styles/theme/light';
import { useAuthContext } from '../../../../../core/context/AuthContext';
import { useCoreUnitContext } from '../../../../../core/context/CoreUnitContext';
import { useThemeContext } from '../../../../../core/context/ThemeContext';
import { BudgetStatus } from '../../../../../core/models/dto/core-unit.dto';
import request from 'graphql-request';
import { CREATE_BUDGET_STATEMENT_COMMENT } from './auditor-comenting.api';
import { GRAPHQL_ENDPOINT } from '../../../../../config/endpoints';

const useCommentForm = (currentBudgetStatus: BudgetStatus, budgetStatementId: string) => {
  const { isLight } = useThemeContext();
  const { permissionManager, authToken } = useAuthContext();
  const { currentCoreUnit } = useCoreUnitContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitLabel, setSubmitLabel] = useState<string>('Submit Comment');
  const [availableStatuses, setAvailableStatuses] = useState<BudgetStatus[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<BudgetStatus | undefined>();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // update the selected status every time the budget statement changes
  useEffect(() => {
    setSelectedStatus(currentBudgetStatus);
  }, [currentBudgetStatus, budgetStatementId]);

  // set the available statuses for the authenticated user in the current CU
  useEffect(() => {
    const hasAuditor = !!currentCoreUnit?.auditors?.length;
    const isAuditor = permissionManager.coreUnit.isAuditor(currentCoreUnit);

    if (!hasAuditor && !isAuditor) {
      // cu admin without auditor
      setAvailableStatuses([BudgetStatus.Draft, BudgetStatus.Final]);
      return;
    } else if (!isAuditor && hasAuditor) {
      // cu admin with auditor
      if (currentBudgetStatus === BudgetStatus.Draft) {
        setAvailableStatuses([BudgetStatus.Draft, BudgetStatus.Review]);
        return;
      } else if (currentBudgetStatus === BudgetStatus.Final) {
        setAvailableStatuses([BudgetStatus.Draft, BudgetStatus.Final]);
      }
    } else if (isAuditor) {
      // auditor
      if (currentBudgetStatus === BudgetStatus.Review) {
        setAvailableStatuses([BudgetStatus.Review, BudgetStatus.Escalated, BudgetStatus.Final]);
        return;
      } else if (currentBudgetStatus === BudgetStatus.Final) {
        setAvailableStatuses([BudgetStatus.Review, BudgetStatus.Final]);
      }
    }

    // just can comment
    setAvailableStatuses([currentBudgetStatus]);
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
  }, [selectedStatus, permissionManager]);

  const handleChangeVariant = (value: BudgetStatus) => {
    setSelectedStatus(value);
  };

  const handleSubmit = async () => {
    const { query, input } = CREATE_BUDGET_STATEMENT_COMMENT(
      budgetStatementId,
      permissionManager.loggedUser?.id || '',
      selectedStatus,
      textAreaRef.current?.value || ''
    );

    try {
      setIsSubmitting(true);
      const x = await request(GRAPHQL_ENDPOINT, query, input, { Authorization: `Bearer ${authToken}` });
      console.log(x);
      // TODO: update the Core Unit so the comment can be added to the list
    } catch (err) {
      console.log(err);
      // show toast error
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
    textAreaRef,
    isSubmitting,
    handleChangeVariant,
    handleSubmit,
  } as const;
};

export default useCommentForm;
