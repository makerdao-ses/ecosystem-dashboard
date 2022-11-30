import { useRouter } from 'next/router';
import { useCallback, useState, useEffect } from 'react';
import useSWR from 'swr';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useIsAdmin } from '../../../../core/hooks/useIsAdmin';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import { fetcher } from '../../../../core/utils/fetcher';
import { getCorrectRoleApi } from '../../../../core/utils/string.utils';
import { ENABLE_DISABLE_USER_REQUEST } from '../../auth/enable-disable-accounts/enable-disable.api';
import { FETCH_USER_BY_USERNAME } from './managed-user-profile.api';

const useManagedUserProfile = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user, clientRequest } = useAuthContext();
  const isAdmin = useIsAdmin(user || ({} as UserDTO));

  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserDTO | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const { data: response, error: errorFetchingUser } = useSWR(FETCH_USER_BY_USERNAME(username as string), fetcher);

  useEffect(() => {
    if (response?.users?.length > 0) {
      // otherwise, the user is not found
      setUserProfile(response.users[0]);
      const allRoles = getCorrectRoleApi(response.users[0]).allRoles;
      setUserRoles(allRoles.length > 0 ? allRoles : ['User']);
    }

    setIsLoading(!response && !errorFetchingUser);
  }, [response]);

  const handleChange = useCallback(async () => {
    if (!userProfile) {
      console.error('User profile is not defined');
      return;
    }
    try {
      const { query: gqlQuery, input } = ENABLE_DISABLE_USER_REQUEST(!userProfile.active, userProfile.id.toString());
      const data = await clientRequest?.request(gqlQuery, input);
      if (data) {
        setUserProfile(data.userSetActiveFlag);
      }
    } catch (error) {
      console.error(error);
    }
  }, [clientRequest, userProfile]);

  const handleGoBack = useCallback(() => {
    router.push(`/auth/manage/${isAdmin ? 'accounts' : 'my-profile'}`);
  }, [isAdmin, router]);

  const handleDeleteAccount = useCallback(() => {
    router.push({
      pathname: '/auth/delete-account',
      query: {
        userName: userProfile?.username,
        id: userProfile?.id,
      },
    });
  }, [router, userProfile]);

  return {
    userProfile,
    userRoles,
    isLoading,
    errorFetchingUser,
    handleChange,
    handleDeleteAccount,
    handleGoBack,
  };
};
export default useManagedUserProfile;
