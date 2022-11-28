// eslint-disable-next-line spellcheck/spell-checker
import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import request from 'graphql-request';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import lightTheme from '../../../../../styles/theme/light';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { LOGIN_REQUEST } from './login.api';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const useLoginMvvm = () => {
  const { setCredentials } = useAuthContext();
  const router = useRouter();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const isTable = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  // eslint-disable-next-line spellcheck/spell-checker
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      const { query: gqlQuery, input } = LOGIN_REQUEST(values.username, values.password);
      try {
        const response = await request(GRAPHQL_ENDPOINT, gqlQuery, input);
        setCredentials?.(response.userLogin);
        router.push('/');
      } catch (err) {
        setError('Please verify your username and password are correct');
        console.error(err);
        setLoading(false);
      }
    },
  });

  const clearErrors = () => {
    setError('');
  };

  return {
    form,
    error,
    loading,
    clearErrors,
    isMobile,
    isTable,
  };
};
