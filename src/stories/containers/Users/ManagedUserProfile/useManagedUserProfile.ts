import request from 'graphql-request';
import { useRouter } from 'next/router';
import { useCallback, useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useIsAdmin } from '../../../../core/hooks/useIsAdmin';
import { fetcher } from '../../../../core/utils/fetcher';
import { getCorrectRoleApi } from '../../../../core/utils/string';
import { ENABLE_DISABLE_USER_REQUEST } from '../../Auth/ToggleAccountsActiveFlag/ToggleAccountsActiveFlagAPI';
import { QUERY_USERS } from '../UsersManager/userManagerAPI';
import { FETCH_USER_BY_USERNAME } from './managedUserProfileAPI';
import type { UserDTO } from '../../../../core/models/dto/authDTO';
import type { Fetcher } from 'swr';

const useManagedUserProfile = () => {
  const { authToken } = useAuthContext();
  const router = useRouter();
  const { username } = router.query;
  const { user } = useAuthContext();
  const isAdmin = useIsAdmin(user || ({} as UserDTO));
  const [isChanging, setIsChanging] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserDTO | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const { mutate } = useSWRConfig();
  const { data: response, error: errorFetchingUser } = useSWR<{ users: UserDTO[] }, unknown>(
    FETCH_USER_BY_USERNAME(username as string),
    fetcher as Fetcher<{ users: UserDTO[] }>
  );
  const isToLong = (userProfile?.username || '').length > 17;
  useEffect(() => {
    if (response && (response.users?.length ?? 0) > 0) {
      // otherwise, the user is not found
      setUserProfile(response.users[0]);
      const allRoles = getCorrectRoleApi(response.users[0]).allRoles;
      setUserRoles(allRoles.length > 0 ? allRoles : ['User']);
    }

    setIsLoading(!response && !errorFetchingUser);
  }, [errorFetchingUser, response]);

  const handleChange = useCallback(async () => {
    if (!userProfile) {
      console.error('User profile is not defined');
      return;
    }
    try {
      setIsChanging(true);
      const { query: gqlQuery, input } = ENABLE_DISABLE_USER_REQUEST(!userProfile.active, userProfile.id.toString());
      const data = await request(GRAPHQL_ENDPOINT, gqlQuery, input, { Authorization: `Bearer ${authToken}` });
      if (data) {
        setUserProfile(data.userSetActiveFlag);
        // update the user list
        mutate(
          QUERY_USERS,
          (args: unknown) => {
            const cachedData = args as { users?: UserDTO[] };
            if (cachedData?.users) {
              const index = cachedData.users.findIndex((u) => u.id === userProfile.id);
              if (index !== -1) {
                cachedData.users[index] = data.userSetActiveFlag;
              }
            }
            return { users: [...(cachedData?.users || [])] };
          },
          {
            rollbackOnError: true,
            revalidate: false,
          }
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsChanging(false);
    }
  }, [authToken, mutate, userProfile]);

  const handleGoBack = useCallback(() => {
    router.push(`/auth/manage/${isAdmin ? 'accounts' : 'my-profile'}`);
  }, [isAdmin, router]);

  const handleDeleteAccount = useCallback(() => {
    router.push(`/auth/manage/user/${userProfile?.username}/delete-account`);
  }, [router, userProfile]);

  return {
    userProfile,
    userRoles,
    isLoading,
    errorFetchingUser,
    isChanging,
    handleChange,
    handleDeleteAccount,
    handleGoBack,
    isToLong,
  };
};
export default useManagedUserProfile;
