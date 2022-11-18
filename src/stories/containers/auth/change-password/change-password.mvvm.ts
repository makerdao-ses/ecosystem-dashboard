// eslint-disable-next-line spellcheck/spell-checker
import { useFormik } from 'formik';
import request from 'graphql-request';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as yup from 'yup';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { INVALID_CHARACTERS_MESSAGE } from '../../../../core/utils/const';
import { UPDATE_PASSWORD_REQUEST } from './change-password.api';

const validationSchema = yup.object({
  oldPassword: yup
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
    .required('Old Password is required'),
  newPassword: yup
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
    .required('New password is required'),
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
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

export const userChangePasswordMvvm = () => {
  const router = useRouter();
  const { user, authToken } = useAuthContext();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // eslint-disable-next-line spellcheck/spell-checker
  const form = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const { query, input } = UPDATE_PASSWORD_REQUEST(user?.username ?? '', values.oldPassword, values.newPassword);

      try {
        await request(GRAPHQL_ENDPOINT, query, input, { Authorization: `Bearer ${authToken}` });
        router.push('/');
      } catch (err) {
        setError('There was a server error when trying to update the password');
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
    username: user?.username ?? '',
  };
};
