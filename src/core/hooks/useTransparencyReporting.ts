import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getLastUpdateForBudgetStatement } from '../businessLogic/coreUnits';
import { useAuthContext } from '../context/AuthContext';
import { BudgetStatus } from '../models/dto/coreUnitDTO';
import { budgetStatementCommentsCollectionId } from '../utils/collectionsIds';
import { LastVisitHandler } from '../utils/lastVisitHandler';
import useBudgetStatementComments from './useBudgetStatementComments';
import useBudgetStatementPager from './useBudgetStatementPager';
import type { SnapshotLimitPeriods } from './useBudgetStatementPager';
import type { CoreUnit } from '../models/interfaces/coreUnit';
import type { WithActivityFeed, WithBudgetStatement } from '../models/interfaces/generics';
import type { Team } from '../models/interfaces/team';

interface TransparencyReportingOptions<TabIds extends string> {
  commentTabId?: TabIds;
  initTabIndex?: () => TabIds;
  snapshotLimitPeriods?: SnapshotLimitPeriods;
}

const useTransparencyReporting = <TabIds extends string>(
  transparencyElement: Team | CoreUnit,
  options: TransparencyReportingOptions<TabIds> = {}
) => {
  const router = useRouter();
  const query = router.query;
  const pagerRef = useRef<HTMLDivElement>(null);
  const { permissionManager } = useAuthContext();
  const [tabsIndex, setTabsIndex] = useState<TabIds>(() => {
    if (options.initTabIndex) {
      return options.initTabIndex();
    }
    return query?.section as TabIds;
  });
  const [lastVisitHandler, setLastVisitHandler] = useState<LastVisitHandler>();

  // mark as visited the current budget statement when the user move to another budget statement
  const onPagerChanges = useCallback(() => {
    if (tabsIndex === (options.commentTabId ?? 'comments')) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [lastVisitHandler, options.commentTabId, tabsIndex]);

  // data and functions to navigate between budget statements
  const { currentMonth, currentBudgetStatement, handleNextMonth, handlePreviousMonth, hasNextMonth, hasPreviousMonth } =
    useBudgetStatementPager(transparencyElement as WithBudgetStatement, {
      onNext: onPagerChanges,
      onPrevious: onPagerChanges,
      latestSnapshotPeriod: options.snapshotLimitPeriods,
    });

  useEffect(() => {
    // update lastVisitHandler for the current budgetStatement
    if (currentBudgetStatement) {
      setLastVisitHandler(
        new LastVisitHandler(budgetStatementCommentsCollectionId(currentBudgetStatement.id), permissionManager)
      );
    }
  }, [currentBudgetStatement, permissionManager]);

  // get the budget statement last update date
  const lastUpdateForBudgetStatement = useMemo(
    () =>
      getLastUpdateForBudgetStatement(currentBudgetStatement as WithActivityFeed, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement]
  );

  // should we show the budget status CTA?
  const [showExpenseReportStatusCTA, setShowExpenseReportStatusCTA] = useState<boolean>(false);
  useEffect(() => {
    switch (currentBudgetStatement?.status) {
      case BudgetStatus.Draft:
        if (!transparencyElement.auditors?.length) {
          setShowExpenseReportStatusCTA(false);
          break;
        }
        // TODO: check if those permissions are always the same for CU and actors
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isCoreUnitAdmin(transparencyElement.id));
        break;
      case BudgetStatus.Review:
      case BudgetStatus.Escalated:
        // TODO: replace with the correct type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isAuditor(transparencyElement as any));
        break;
      default:
        setShowExpenseReportStatusCTA(false);
    }
  }, [transparencyElement, currentBudgetStatement, permissionManager]);

  // comments of the current budget statement
  const { comments, numbersComments, commentsLastVisitState, updateHasNewComments } = useBudgetStatementComments(
    currentBudgetStatement,
    lastVisitHandler,
    tabsIndex === (options?.commentTabId ?? 'comments')
  );

  return {
    pagerRef,
    tabsIndex,
    setTabsIndex,
    lastVisitHandler,
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    lastUpdateForBudgetStatement,
    showExpenseReportStatusCTA,

    // comments
    comments,
    numbersComments,
    commentsLastVisitState,
    updateHasNewComments,
  };
};

export default useTransparencyReporting;
