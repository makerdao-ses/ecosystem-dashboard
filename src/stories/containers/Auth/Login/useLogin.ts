import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useFormik } from 'formik';
import request, { ClientError } from 'graphql-request';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import lightTheme from '../../../../../styles/theme/themes';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { LOGIN_REQUEST } from './LoginAPI';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const useLogin = () => {
  const { setCredentials, clearCredentials } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasUserInactive, setHasUserInactive] = useState<boolean>(false);
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));

  const shouldKeepOpenModal = router.pathname === siteRoutes.login && isMobile;

  useEffect(() => {
    if (shouldKeepOpenModal && !(router.query.modal === 'true')) {
      router.replace(`${siteRoutes.login}?modal=true`, undefined, { shallow: true });
    } else if (!shouldKeepOpenModal && router.query.modal === 'true') {
      router.replace(siteRoutes.login, undefined, { shallow: true });
    }
  }, [isMobile, router, shouldKeepOpenModal]);

  useEffect(() => {
    if (router.pathname === siteRoutes.login) {
      clearCredentials?.();
    }
  }, [clearCredentials, router.pathname]);

  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      setHasUserInactive(false);

      const { query: gqlQuery, input } = LOGIN_REQUEST(values.username, values.password);
      try {
        const response = await request(GRAPHQL_ENDPOINT, gqlQuery, input);
        setCredentials?.(response.userLogin);
        router.push('/');
      } catch (err) {
        if (err instanceof ClientError) {
          if (
            err.response.errors &&
            err.response.errors.length > 0 &&
            err.response.errors[0].message === 'Error: Account disabled. Reach admin for more info.'
          ) {
            setHasUserInactive(true);
          } else {
            setError('Please verify your username and password are correct');
            console.error(err);
          }
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const clearErrors = () => {
    setError('');
    setHasUserInactive(false);
  };

  return {
    form,
    error,
    loading,
    clearErrors,
    isMobile,
    isTable,
    clearCredentials,
    hasUserInactive,
    shouldKeepOpenModal,
  };
};
