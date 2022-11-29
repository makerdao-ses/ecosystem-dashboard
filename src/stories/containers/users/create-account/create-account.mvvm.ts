// eslint-disable-next-line spellcheck/spell-checker
import { useFormik } from 'formik';
import request, { ClientError } from 'graphql-request';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { passwordValidationYup } from '../../../../core/utils/form-validation';
import { CREATE_ACCOUNT_REQUEST } from './create-account.api';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: passwordValidationYup.required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Password confirmation is required')
    .oneOf(
      [yup.ref('password'), null],
      "Your password doesn't match, please insert a different password confirmation."
    ),
  //
});

export const useCreateAccountMvvm = () => {
  const router = useRouter();
  const { authToken } = useAuthContext();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // eslint-disable-next-line spellcheck/spell-checker
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { query, input } = CREATE_ACCOUNT_REQUEST(values.username, values.password);

      try {
        await request(GRAPHQL_ENDPOINT, query, input, { Authorization: `Bearer ${authToken}` });
        router.push('/auth/manage/accounts');
      } catch (err) {
        if (err instanceof ClientError) {
          if (err.response.errors && err.response.errors.length > 0 && err.response.errors[0].message) {
            setError(err.response.errors[0].message);
          } else {
            setError('There was a server error when trying to update the password');
            console.error(err);
          }
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
  };
};
