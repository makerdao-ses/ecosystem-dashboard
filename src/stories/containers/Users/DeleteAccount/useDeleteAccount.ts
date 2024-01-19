import { useFormik } from 'formik';
import request from 'graphql-request';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';
import useSWR from 'swr';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { fetcher } from '../../../../core/utils/fetcher';
import { notificationHelper } from '../../../../core/utils/notifications';
import { LOGIN_REQUEST } from '../../Auth/Login/LoginAPI';
import { FETCH_USER_BY_USERNAME } from '../ManagedUserProfile/managedUserProfileAPI';
import { USERS_DELETE_FROM_ADMIN } from './deleteAccountAPI';
import type { UserDTO } from '../../../../core/models/dto/authDTO';
import type { Fetcher } from 'swr';

export const useDeleteAccount = (username?: string) => {
  const router = useRouter();
  const { authToken, user, isAdmin, clearCredentials } = useAuthContext();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { data: response, error: errorFetchingUser } = useSWR<{ users: UserDTO[] }, unknown>(
    [isAdmin ? FETCH_USER_BY_USERNAME(username ?? (router.query.username as string)) : null, isAdmin],
    fetcher as Fetcher<{ users: UserDTO[] }>
  );

  const deletingUser = useMemo<UserDTO | undefined>(
    () => (!isAdmin ? user : response?.users?.[0]),
    [isAdmin, user, response?.users]
  );

  const handleOnSubmit = useCallback(
    async (password: string) => {
      setIsDeleting(true);
      const { query: gqlQueryLogin, input } = LOGIN_REQUEST(user?.username || '', password);
      const { query: gqlQuery, filter } = USERS_DELETE_FROM_ADMIN(deletingUser?.id?.toString() || '');
      try {
        const response = await request(GRAPHQL_ENDPOINT, gqlQueryLogin, input);

        if (response) {
          const data = await request(GRAPHQL_ENDPOINT, gqlQuery, filter, { Authorization: `Bearer ${authToken}` });
          if (data.userDelete && isAdmin) {
            notificationHelper({
              isSuccess: true,
              userName: deletingUser?.username as string,
            });
            setTimeout(() => {
              router.push('/auth/manage/accounts');
            }, 3000);
          }
          if (data.userDelete && !isAdmin) {
            notificationHelper({
              isSuccess: true,
              userName: deletingUser?.username as string,
            });
            setTimeout(() => {
              clearCredentials?.();
              router.push('/login');
            }, 3000);
          }
        }
      } catch (err) {
        notificationHelper({
          isSuccess: false,
        });
      }
      setIsDeleting(false);
    },
    [authToken, clearCredentials, deletingUser?.id, deletingUser?.username, isAdmin, router, user?.username]
  );

  const form = useFormik({
    initialValues: {
      password: '',
    },
    onSubmit: (values) => {
      handleOnSubmit(values.password);
    },
  });

  return {
    form,
    isFetchingUser: !response && !errorFetchingUser,
    deletingUser,
    isDeleting,
  };
};
