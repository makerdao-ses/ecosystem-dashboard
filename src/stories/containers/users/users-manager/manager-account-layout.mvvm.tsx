import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { featureFlags } from '../../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import { authFetcher } from '../../../../core/utils/fetcher';
import { TabItem } from '../../../components/tabs/tabs';
import { ParenthesisNumber } from '../../transparency-report/transparency-report';
import { QUERY_USERS } from './user-manager.api';

export const useManagerAccountLayoutViewModel = () => {
  const [FEATURE_AUTH] = useState<boolean>(featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH);
  const { hasToken, authToken, isAdmin } = useAuthContext();

  const { data, error: errorFetchingUsers } = useSWR<{ users: UserDTO[] }, string>(QUERY_USERS, authFetcher);
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
          <ParenthesisNumber>
            Manage Accounts <span>{`(${users.length})`}</span>
          </ParenthesisNumber>
        ),
        id: '',
        href: '/auth/manage/accounts',
      },
    ],
    [users]
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
