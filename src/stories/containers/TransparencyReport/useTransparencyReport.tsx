import CommentsTab from '@ses/components/Tabs/CommentsTab/CommentsTab';
import { getLastUpdateForBudgetStatement } from '@ses/core/businessLogic/coreUnits';
import { useAuthContext } from '@ses/core/context/AuthContext';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import useBudgetStatementComments from '@ses/core/hooks/useBudgetStatementComments';
import useBudgetStatementPager from '@ses/core/hooks/useBudgetStatementPager';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { budgetStatementCommentsCollectionId } from '@ses/core/utils/collectionsIds';
import { LastVisitHandler } from '@ses/core/utils/lastVisitHandler';
import { removeEmptyProperties } from '@ses/core/utils/urls';
import UserActivityManager from '@ses/core/utils/userActivity';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { AUDITOR_VIEW_STORAGE_COLLECTION_KEY } from './utils/constants';
import type { TableItems } from './TransparencyReport';
import type { InternalTabsProps } from '@ses/components/Tabs/Tabs';
import type { CoreUnitDto } from '@ses/core/models/dto/coreUnitDTO';

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

export const useTransparencyReport = (coreUnit: CoreUnitDto) => {
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;
  const transparencyTableRef = useRef<HTMLDivElement>(null);
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();

  const [tabsIndex, setTabsIndex] = useState<TRANSPARENCY_IDS_ENUM>(() => {
    // initialize quickly the correct tab to avoid tab flickering
    const view = query?.view ?? 'default';
    if (view === 'auditor') {
      switch (query?.section) {
        case TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS:
          return TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS;
        case TRANSPARENCY_IDS_ENUM.COMMENTS:
          return TRANSPARENCY_IDS_ENUM.COMMENTS;
        default:
          return TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT;
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
          return TRANSPARENCY_IDS_ENUM.ACTUALS;
      }
    }
  });

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
    useBudgetStatementPager(coreUnit, {
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

  const longCode = coreUnit?.code;

  const lastUpdateForBudgetStatement = useMemo(
    () => getLastUpdateForBudgetStatement(coreUnit, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement, coreUnit]
  );

  const [showExpenseReportStatusCTA, setShowExpenseReportStatusCTA] = useState<boolean>(false);
  useEffect(() => {
    switch (currentBudgetStatement?.status) {
      case BudgetStatus.Draft:
        if (!coreUnit.auditors?.length) {
          setShowExpenseReportStatusCTA(false);
          break;
        }
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isCoreUnitAdmin(coreUnit));
        break;
      case BudgetStatus.Review:
      case BudgetStatus.Escalated:
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isAuditor(coreUnit));
        break;
      default:
        setShowExpenseReportStatusCTA(false);
    }
  }, [coreUnit, currentBudgetStatement, permissionManager]);

  const { comments, numbersComments, commentsLastVisitState, updateHasNewComments } = useBudgetStatementComments(
    currentBudgetStatement,
    lastVisitHandler,
    tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS
  );

  const [isEnabled] = useFlagsActive();
  const accountsSnapshotTab = {
    item: 'Accounts Snapshot',
    id: TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS,
  };
  const commentTab = {
    item: (
      <CommentsTab
        hasNewComments={!commentsLastVisitState.isFetching && commentsLastVisitState.hasNewComments}
        numbersComments={numbersComments}
      />
    ),
    id: TRANSPARENCY_IDS_ENUM.COMMENTS,
  };
  const tabItems: TableItems[] = [
    {
      item: 'Actuals',
      id: TRANSPARENCY_IDS_ENUM.ACTUALS,
    },
    {
      item: 'Forecast',
      id: TRANSPARENCY_IDS_ENUM.FORECAST,
    },
    ...(isEnabled('FEATURE_MKR_VESTING')
      ? [
          {
            item: 'MKR Vesting',
            id: TRANSPARENCY_IDS_ENUM.MKR_VESTING,
          },
        ]
      : []),
    {
      item: 'Transfer Requests',
      id: TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS,
    },
    ...(isEnabled('FEATURE_ACCOUNTS_SNAPSHOT') ? [accountsSnapshotTab] : []),
    ...(isEnabled('FEATURE_AUDIT_REPORTS')
      ? [
          {
            item: 'Audit Reports',
            id: TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS,
          },
        ]
      : []),
    ...(isEnabled('FEATURE_TRANSPARENCY_COMMENTS') ? [commentTab] : []),
  ];

  const compressedTabItems: TableItems[] = [
    {
      item: 'Expense Report',
      id: TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT,
    },
    ...(isEnabled('FEATURE_ACCOUNTS_SNAPSHOT') ? [accountsSnapshotTab] : []),
    commentTab,
  ];

  const onTabChange = useCallback(
    (current?: string, previous?: string) => {
      // changing from "comments tab" to any other tab should mark the budget statement as visited
      if (isTimestampTrackingAccepted && previous === TRANSPARENCY_IDS_ENUM.COMMENTS) {
        const visit = async () => {
          const lastVisit = (await lastVisitHandler?.visit()) || DateTime.now().toMillis();
          await updateHasNewComments(DateTime.fromMillis(lastVisit));
        };
        visit();
      }
      setTabsIndex(current as TRANSPARENCY_IDS_ENUM);
    },
    [isTimestampTrackingAccepted, lastVisitHandler, updateHasNewComments]
  );

  interface AuditorViewStoragePayload {
    isAuditorViewEnabled: boolean;
  }
  const onTabsExpand = useCallback(
    // save the auditor view status on the storage/server
    async (isExpanded: boolean) => {
      if (isTimestampTrackingAccepted) {
        const manager = new UserActivityManager(permissionManager);
        await manager.create({
          userId: permissionManager.loggedUser?.id || '',
          collection: AUDITOR_VIEW_STORAGE_COLLECTION_KEY,
          data: {
            isAuditorViewEnabled: !isExpanded,
          },
        });
      }
    },
    [isTimestampTrackingAccepted, permissionManager]
  );

  // restore the auditor view status from the storage/server if needed
  const [handleTabsExpand, setHandleTabsExpand] = useState<InternalTabsProps['setExpanded'] | undefined>();
  const onTabsInit = useCallback(({ setExpanded }: InternalTabsProps) => {
    setHandleTabsExpand(() => setExpanded);
  }, []);

  useEffect(() => {
    const restoreAuditorViewFunction = async () => {
      // restore the auditor view status form the storage/server if needed
      // the auditor view status in the query param has priority over the stored value
      if (!query.view && handleTabsExpand && isTimestampTrackingAccepted) {
        const manager = new UserActivityManager(permissionManager);
        const result = await manager.getLastActivity(AUDITOR_VIEW_STORAGE_COLLECTION_KEY);
        if ((result?.data as AuditorViewStoragePayload)?.isAuditorViewEnabled) {
          // activate the auditor view
          handleTabsExpand(false);
          router.replace(
            {
              pathname: router.pathname,
              query: {
                ...removeEmptyProperties(router.query),
                view: 'auditor',
              },
            },
            undefined,
            { shallow: true }
          );
          setTabsIndex(TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT);
        }
      }
    };
    restoreAuditorViewFunction();
  }, [handleTabsExpand, isTimestampTrackingAccepted, permissionManager, query.view, router]);

  return {
    tabItems,
    code,
    transparencyTableRef,
    currentMonth,
    handlePreviousMonth,
    handleNextMonth,
    hasNextMonth,
    currentBudgetStatement,
    tabsIndex,
    showExpenseReportStatusCTA,
    lastUpdateForBudgetStatement,
    longCode,
    hasPreviousMonth,
    comments,
    lastVisitHandler,
    onTabsInit,
    onTabChange,
    onTabsExpand,
    compressedTabItems,
  };
};
