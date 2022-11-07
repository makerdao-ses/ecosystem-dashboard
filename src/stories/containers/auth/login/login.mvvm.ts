/* eslint-disable spellcheck/spell-checker */
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';

const charactersNotAllowedMessage =
  'Characters not allowed. Only letters, numbers, and the following characters are allowed: !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';

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
      charactersNotAllowedMessage
    )
    .required('Password is required'),
});

export const useLoginMvvm = () => {
  const [error, setError] = useState<string>('');
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const onLogin = () => {
    if (!error) {
      setError('Please Verify your username and password are correct');
    } else {
      setError('');
    }
  };

  return {
    form,
    error,
    onLogin,
  };
};
