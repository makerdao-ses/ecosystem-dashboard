import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import useTransparencyReporting from '@ses/core/hooks/useTransparencyReporting';
import useTransparencyReportingTabs from '@ses/core/hooks/useTransparencyReportingTabs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { TRANSPARENCY_IDS_ENUM } from '../CoreUnitBudgetStatement/useCoreUnitBudgetStatementView';
import { useBreadcrumbTeamPager } from '../EcosystemActorAbout/hooks';
import type { SnapshotLimitPeriods } from '@ses/core/hooks/useBudgetStatementPager';
import type { Team } from '@ses/core/models/interfaces/team';
import type { DateTime } from 'luxon';

const useEcosystemActorBudgetStatementView = (
  actor: Team,
  actors: Team[],
  snapshotLimitPeriods?: SnapshotLimitPeriods
) => {
  const router = useRouter();
  const query = router.query;
  const [isEnabled] = useFlagsActive();

  const initTabIndex = useCallback(() => {
    // initialize quickly the correct tab to avoid tab flickering
    const view = query?.view ?? 'default';
    if (view === 'auditor') {
      switch (query?.section) {
        case TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS:
          return TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS;
        case TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT:
          return TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT;
        case TRANSPARENCY_IDS_ENUM.COMMENTS:
          return TRANSPARENCY_IDS_ENUM.COMMENTS;
        default:
          return TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS;
      }
    } else {
      // default
      switch (query?.section) {
        case TRANSPARENCY_IDS_ENUM.ACTUALS:
          return TRANSPARENCY_IDS_ENUM.ACTUALS;
        case TRANSPARENCY_IDS_ENUM.FORECAST:
          return TRANSPARENCY_IDS_ENUM.FORECAST;
        case TRANSPARENCY_IDS_ENUM.MKR_VESTING:
          return TRANSPARENCY_IDS_ENUM.MKR_VESTING;
        case TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS:
          return TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS;
        case TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS:
          return TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS;
        case TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS:
          return TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS;
        case TRANSPARENCY_IDS_ENUM.COMMENTS:
          return TRANSPARENCY_IDS_ENUM.COMMENTS;
        default:
          return TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS;
      }
    }
  }, [query?.section, query?.view]);

  const {
    pagerRef,
    tabsIndex,
    setTabsIndex,
    lastVisitHandler,
    currentBudgetStatement,
    currentMonth,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    lastUpdateForBudgetStatement,
    showExpenseReportStatusCTA,
    comments,
    commentsLastVisitState,
    numbersComments,
    updateHasNewComments,
  } = useTransparencyReporting<TRANSPARENCY_IDS_ENUM>(actor, {
    commentTabId: TRANSPARENCY_IDS_ENUM.COMMENTS,
    initTabIndex,
    snapshotLimitPeriods,
  });

  const { tabItems, compressedTabItems, onTabChange, onTabsExpand, onTabsInit } = useTransparencyReportingTabs({
    commentsLastVisitState,
    numbersComments,
    updateHasNewComments,
    lastVisitHandler,
    setTabsIndex,
  });

  const [snapshotCreated, setSnapshotCreated] = useState<DateTime | undefined>();
  const [lastUpdate, setLastUpdate] = useState<DateTime | undefined>();

  useEffect(() => {
    // update the last update if the account snapshot tab is selected or if it is a budget statement tab selected
    if (tabsIndex === TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS) {
      setLastUpdate(snapshotCreated);
    } else {
      setLastUpdate(lastUpdateForBudgetStatement);
    }
  }, [lastUpdateForBudgetStatement, snapshotCreated, tabsIndex]);

  const pager = useBreadcrumbTeamPager(actor, actors);

  return {
    isEnabled,
    pagerRef,
    tabsIndex,
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    lastUpdate,
    showExpenseReportStatusCTA,
    tabItems,
    compressedTabItems,
    onTabsInit,
    onTabsExpand,
    onTabChange,
    lastVisitHandler,
    comments,
    setSnapshotCreated,
    pager,
  };
};

export default useEcosystemActorBudgetStatementView;
