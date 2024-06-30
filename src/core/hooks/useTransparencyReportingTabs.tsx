import CommentsTab from '@ses/components/Tabs/CommentsTab/CommentsTab';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import type { TableItems } from '@/views/CoreUnitBudgetStatement/CoreUnitBudgetStatementView';
import { TRANSPARENCY_IDS_ENUM } from '@/views/CoreUnitBudgetStatement/useCoreUnitBudgetStatementView';
import { AUDITOR_VIEW_STORAGE_COLLECTION_KEY } from '@/views/CoreUnitBudgetStatement/utils/constants';
import { useAuthContext } from '../context/AuthContext';
import { useCookiesContextTracking } from '../context/CookiesContext';
import { removeEmptyProperties } from '../utils/urls';
import UserActivityManager from '../utils/userActivity';
import { useFlagsActive } from './useFlagsActive';
import type { CommentsLastVisitState } from './useBudgetStatementComments';
import type { LastVisitHandler } from '../utils/lastVisitHandler';
import type { InternalTabsProps } from '@ses/components/Tabs/Tabs';

interface AuditorViewStoragePayload {
  isAuditorViewEnabled: boolean;
}

interface TransparencyReportTabsOptions {
  commentsLastVisitState: CommentsLastVisitState;
  numbersComments: number;
  updateHasNewComments: (date?: DateTime) => Promise<void>;
  lastVisitHandler?: LastVisitHandler;
  setTabsIndex: (tab: TRANSPARENCY_IDS_ENUM) => void;
}

const useTransparencyReportingTabs = ({
  commentsLastVisitState,
  numbersComments,
  updateHasNewComments,
  lastVisitHandler,
  setTabsIndex,
}: TransparencyReportTabsOptions) => {
  const [isEnabled] = useFlagsActive();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();
  const { permissionManager } = useAuthContext();
  const router = useRouter();
  const query = router.query;

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

  // tabs to shown when the tabs is expanded
  const tabItems: TableItems[] = [
    ...[accountsSnapshotTab],
    {
      item: 'Actuals',
      id: TRANSPARENCY_IDS_ENUM.ACTUALS,
    },
    {
      item: 'Forecast',
      id: TRANSPARENCY_IDS_ENUM.FORECAST,
    },
    {
      item: 'MKR Vesting',
      id: TRANSPARENCY_IDS_ENUM.MKR_VESTING,
    },
    {
      item: 'Transfer Requests',
      id: TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS,
    },
    ...(isEnabled('FEATURE_AUDIT_REPORTS')
      ? [
          {
            item: 'Audit Reports',
            id: TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS,
          },
        ]
      : []),
    ...[commentTab],
  ];

  // tabs to shown when the tabs is collapsed/compressed
  const compressedTabItems: TableItems[] = [
    ...[accountsSnapshotTab],
    {
      item: 'Expense Report',
      id: TRANSPARENCY_IDS_ENUM.EXPENSE_REPORT,
    },
    ...[commentTab],
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
    [isTimestampTrackingAccepted, lastVisitHandler, setTabsIndex, updateHasNewComments]
  );

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
          // it's coming from default view, but comment is in both views so we can keep it activated
          if (router.query.section !== TRANSPARENCY_IDS_ENUM.COMMENTS) {
            setTabsIndex(TRANSPARENCY_IDS_ENUM.ACCOUNTS_SNAPSHOTS);
          }
        }
      }
    };
    restoreAuditorViewFunction();
  }, [handleTabsExpand, isTimestampTrackingAccepted, permissionManager, query.view, router, setTabsIndex]);

  return {
    tabItems,
    compressedTabItems,
    onTabChange,
    onTabsExpand,
    onTabsInit,
  };
};

export default useTransparencyReportingTabs;
