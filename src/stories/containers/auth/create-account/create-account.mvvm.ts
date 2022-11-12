import { useFormik } from 'formik';
import request from 'graphql-request';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { INVALID_CHARACTERS_MESSAGE } from '../../../../core/utils/const';
import { CREATE_ACCOUNT_REQUEST } from './create-account.api';

const validationSchema = yup.object({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(10, 'Your password must have at least 10 characters.')
    .matches(/[^a-z]/g, 'Your password must contain at least one uppercase character, number, or special character.')
    .matches(/[^A-Z]/g, 'Your password must contain at least one lowercase character, number, or special character.')
    .matches(
      /[^0-9]/g,
      'Your password must contain at least one uppercase character, lowercase character, or special character.'
    )
    .matches(
      /[^!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
      'Your password must contain at least one lowercase character, uppercase character, or number.'
    )
    .matches(
      /^((((([a-z]+[A-Z]+)+)|(([A-Z]+[a-z]+)+)|(([a-z]+[0-9]+)+)|(([0-9]+[a-z]+)+)|(([A-Z]+[0-9]+)+)|(([0-9]+[A-Z]+)+)))|(((([!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+[A-Z]+)+)|(([A-Z]+[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+)+)|(([a-z]+[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+)+)||(([!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+[a-z]+)+)|(([A-Z]+[0-9]+)+)|(([0-9]+[A-Z]+)+)))|(((([!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+[0-9]+)+)|(([0-9]+[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+)+))))[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/g,
      INVALID_CHARACTERS_MESSAGE
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    // .min(10, 'Your password must have at least 10 characters.')
    .matches(/[^a-z]/g, 'Your password must contain at least one uppercase character, number, or special character.')
    .matches(/[^A-Z]/g, 'Your password must contain at least one lowercase character, number, or special character.')
    .matches(
      /[^0-9]/g,
      'Your password must contain at least one uppercase character, lowercase character, or special character.'
    )
    .matches(
      /[^!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
      'Your password must contain at least one lowercase character, uppercase character, or number.'
    )
    .matches(
      /^((((([a-z]+[A-Z]+)+)|(([A-Z]+[a-z]+)+)|(([a-z]+[0-9]+)+)|(([0-9]+[a-z]+)+)|(([A-Z]+[0-9]+)+)|(([0-9]+[A-Z]+)+)))|(((([!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+[A-Z]+)+)|(([A-Z]+[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+)+)|(([a-z]+[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+)+)||(([!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+[a-z]+)+)|(([A-Z]+[0-9]+)+)|(([0-9]+[A-Z]+)+)))|(((([!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+[0-9]+)+)|(([0-9]+[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]+)+))))[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]*$/g,
      INVALID_CHARACTERS_MESSAGE
    )
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
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
        router.push('/');
      } catch (err) {
        setError('There was a server error when trying to create the user');
        console.error(err);
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
