import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import useTransparencyReporting from '@ses/core/hooks/useTransparencyReporting';
import useTransparencyReportingTabs from '@ses/core/hooks/useTransparencyReportingTabs';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import type { SnapshotLimitPeriods } from '@ses/core/hooks/useBudgetStatementPager';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { DateTime } from 'luxon';

export enum TRANSPARENCY_IDS_ENUM {
  ACTUALS = 'actuals',
  FORECAST = 'forecast',
  MKR_VESTING = 'mkr-vesting',
  TRANSFER_REQUESTS = 'transfer-requests',
  AUDIT_REPORTS = 'audit-reports',
  ACCOUNTS_SNAPSHOTS = 'accounts-snapshots',
  COMMENTS = 'comments',
  EXPENSE_REPORT = 'expense-report',
}

export const useTransparencyReportView = (coreUnit: CoreUnit, snapshotLimitPeriods?: SnapshotLimitPeriods) => {
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
  } = useTransparencyReporting<TRANSPARENCY_IDS_ENUM>(coreUnit, {
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
    code: coreUnit.shortCode,
    longCode: coreUnit.code,
    setSnapshotCreated,
  };
};
