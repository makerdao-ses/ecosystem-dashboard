import Skeleton from '@mui/material/Skeleton';
import { useMemo } from 'react';
import useSWR from 'swr';
import type { TabItem } from '@/components/Tabs/Tabs';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { fetcher } from '../../../../core/utils/fetcher';
import { ParenthesisNumber } from '../../../../views/CoreUnitBudgetStatement/CoreUnitBudgetStatementView';
import { ManagerTabs } from './managerTabsEnum';
import { QUERY_USERS } from './userManagerAPI';
import type { UserDTO } from '../../../../core/models/dto/authDTO';
import type { Fetcher } from 'swr';

export const useManagerAccountLayout = () => {
  const { hasToken, authToken, isAdmin } = useAuthContext();

  const { data, error: errorFetchingUsers } = useSWR<{ users: UserDTO[] }, string>(
    QUERY_USERS,
    fetcher as Fetcher<{ users: UserDTO[] }>
  );
  const users: UserDTO[] = useMemo(() => data?.users || [], [data?.users]);

  const tabItems = useMemo<TabItem[]>(
    () => [
      {
        item: 'Your Profile',
        id: ManagerTabs.PROFILE,
        href: '/auth/manage/my-profile',
      },
      {
        item: (
          <ParenthesisNumber
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Manage Accounts
            <span
              style={{
                display: 'inline-flex',
                marginLeft: 3,
              }}
            >
              {!data && !errorFetchingUsers ? (
                <Skeleton variant="rectangular" width={20} height={18} style={{ borderRadius: 8 }} />
              ) : (
                `(${users.length})`
              )}
            </span>
          </ParenthesisNumber>
        ),
        id: ManagerTabs.MANAGER,
        href: '/auth/manage/accounts',
      },
    ],
    [data, errorFetchingUsers, users.length]
  );

  return {
    tabItems,
    hasToken,
    authToken,
    isAdmin,
    users,
    errorFetchingUsers,
  };
};
