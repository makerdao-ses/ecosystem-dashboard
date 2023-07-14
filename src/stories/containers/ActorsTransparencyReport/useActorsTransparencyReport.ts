// disables required as this is WIP
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getLastUpdateForBudgetStatement } from '@ses/core/businessLogic/coreUnits';
import { useAuthContext } from '@ses/core/context/AuthContext';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import useBudgetStatementPager from '@ses/core/hooks/useBudgetStatementPager';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { budgetStatementCommentsCollectionId } from '@ses/core/utils/collectionsIds';
import { LastVisitHandler } from '@ses/core/utils/lastVisitHandler';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TRANSPARENCY_IDS_ENUM } from '../TransparencyReport/useTransparencyReport';
import type { WithBudget } from '@ses/core/hooks/useBudgetStatementPager';
import type { Team } from '@ses/core/models/interfaces/team';

const useActorsTransparencyReport = (actor: Team) => {
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;
  const pagerRef = useRef<HTMLDivElement>(null);
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();

  const [tabsIndex, setTabsIndex] = useState<TRANSPARENCY_IDS_ENUM>();

  const [lastVisitHandler, setLastVisitHandler] = useState<LastVisitHandler>();

  const onPrevious = useCallback(() => {
    if (tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [lastVisitHandler, tabsIndex]);

  const onNext = useCallback(() => {
    if (tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [lastVisitHandler, tabsIndex]);

  const { currentMonth, currentBudgetStatement, handleNextMonth, handlePreviousMonth, hasNextMonth, hasPreviousMonth } =
    useBudgetStatementPager(actor as unknown as WithBudget, {
      onNext,
      onPrevious,
    });

  useEffect(() => {
    // update lastVisitHandler for the current budgetStatement
    if (currentBudgetStatement) {
      setLastVisitHandler(
        new LastVisitHandler(budgetStatementCommentsCollectionId(currentBudgetStatement.id), permissionManager)
      );
    }
  }, [currentBudgetStatement, permissionManager]);

  const longCode = actor?.code;

  const lastUpdateForBudgetStatement = useMemo(
    () => getLastUpdateForBudgetStatement(actor as any, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement, actor]
  );

  const [showExpenseReportStatusCTA, setShowExpenseReportStatusCTA] = useState<boolean>(false);
  useEffect(() => {
    switch (currentBudgetStatement?.status) {
      case BudgetStatus.Draft:
        if (!actor.auditors?.length) {
          setShowExpenseReportStatusCTA(false);
          break;
        }
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isCoreUnitAdmin(actor as any));
        break;
      case BudgetStatus.Review:
      case BudgetStatus.Escalated:
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isAuditor(actor as any));
        break;
      default:
        setShowExpenseReportStatusCTA(false);
    }
  }, [actor, currentBudgetStatement, permissionManager]);

  return {
    pagerRef,
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    longCode,
    lastUpdateForBudgetStatement,
    showExpenseReportStatusCTA,
  };
};

export default useActorsTransparencyReport;
