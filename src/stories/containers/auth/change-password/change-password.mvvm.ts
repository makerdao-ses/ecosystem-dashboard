import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import request, { ClientError } from 'graphql-request';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import lightTheme from '../../../../../styles/theme/light';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { passwordValidationYup } from '../../../../core/utils/form-validation';
import { UPDATE_PASSWORD_REQUEST } from './change-password.api';

const validationSchema = yup.object({
  oldPassword: yup.string().required('Old Password is required'),
  newPassword: passwordValidationYup
    .notOneOf([yup.ref('oldPassword'), null], 'New password should not be as old password')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const userChangePasswordMvvm = () => {
  const router = useRouter();
  const { user, authToken, isAdmin } = useAuthContext();
  const [error, setError] = useState<string>('');
  const [isWrongOldPassword, setIsWrongOldPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobileOrTable = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  const form = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      setIsWrongOldPassword(false);
      const { query, input } = UPDATE_PASSWORD_REQUEST(user?.username ?? '', values.oldPassword, values.newPassword);

      try {
        await request(GRAPHQL_ENDPOINT, query, input, { Authorization: `Bearer ${authToken}` });
        router.push(isAdmin ? '/auth/manage/my-profile' : '/auth/user-profile');
      } catch (err) {
        if (err instanceof ClientError) {
          if (
            err.response.errors &&
            err.response.errors.length > 0 &&
            err.response.errors[0].message === 'Error: wrong old password'
          ) {
            setIsWrongOldPassword(true);
          } else {
            // we got an unknown error
            setError('There was a server error when trying to update the password');
            console.error(err);
          }
        } else {
          // we got an unexpected error
          setError('There was an error when trying to update the password');
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return {
    form,
    loading,
    error,
    username: user?.username ?? '',
    isWrongOldPassword,
    isMobileOrTable,
  };
};
