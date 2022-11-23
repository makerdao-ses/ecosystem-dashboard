// eslint-disable-next-line spellcheck/spell-checker
import { useFormik } from 'formik';
import request from 'graphql-request';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { notificationHelper } from '../../../helpers/helpers';
import { LOGIN_REQUEST } from '../../auth/login/login.api';
import { USERS_DELETE_FROM_ADMIN } from './delete-account.api';

export const useDeleteAccountMvvm = () => {
  const router = useRouter();
  const { id, userName } = router.query;
  const { user, clientRequest } = useAuthContext();

  const handleOnSubmit = useCallback(
    async (password: string) => {
      const { query: gqlQueryLogin, input } = LOGIN_REQUEST(user?.username || '', password);
      const { query: gqlQuery, filter } = USERS_DELETE_FROM_ADMIN(id as string);
      try {
        const response = await request(GRAPHQL_ENDPOINT, gqlQueryLogin, input);

        if (response) {
          const data = await clientRequest?.request(gqlQuery, filter);
          if (data.userDelete) {
            notificationHelper({
              isSuccess: true,
              userName: userName as string,
            });
            setTimeout(() => {
              router.push('/auth/manage');
            }, 3000);
          }
        }
      } catch (err) {
        notificationHelper({ isSuccess: false });
      }
    },
    [clientRequest, id, router, user?.username]
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
  };
};
