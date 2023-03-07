import Skeleton from '@mui/material/Skeleton';
import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { featureFlags } from '../../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { fetcher } from '../../../../core/utils/fetcher';
import { ParenthesisNumber } from '../../transparency-report/transparency-report';
import { QUERY_USERS } from './user-manager.api';
import type { UserDTO } from '../../../../core/models/dto/auth.dto';
import type { TabItem } from '../../../components/Tabs/Tabs';

export const useManagerAccountLayout = () => {
  const [FEATURE_AUTH] = useState<boolean>(featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH);
  const { hasToken, authToken, isAdmin } = useAuthContext();

  const { data, error: errorFetchingUsers } = useSWR<{ users: UserDTO[] }, string>(QUERY_USERS, fetcher);
  const users: UserDTO[] = useMemo(() => data?.users || [], [data?.users]);

  const tabItems = useMemo<TabItem[]>(
    () => [
      {
        item: 'Your Profile',
        id: '',
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
        id: '',
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
    FEATURE_AUTH,
    users,
    errorFetchingUsers,
  };
};
