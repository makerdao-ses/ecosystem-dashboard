import request from 'graphql-request';
import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { featureFlags } from '../../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT, GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import { TabItem } from '../../../components/tabs/tabs';
import { ParenthesisNumber } from '../../transparency-report/transparency-report';
import { QUERY_USERS } from './user-manager.api';

export const useManagerAccountLayoutViewModel = () => {
  const [FEATURE_AUTH] = useState<boolean>(featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUTH);
  const { hasToken, authToken, isAdmin } = useAuthContext();

  const fetcher = (query: string) => request(GRAPHQL_ENDPOINT, query, null, { Authorization: `Bearer ${authToken}` });
  const { data, error: errorFetchingUsers } = useSWR(QUERY_USERS, fetcher);
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
