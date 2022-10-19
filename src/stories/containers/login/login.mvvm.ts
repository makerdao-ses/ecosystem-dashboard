/* eslint-disable spellcheck/spell-checker */
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup
    .string()
    .required('Username is required and this is a really long string to check how it works with multiple lines'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .matches(/thisthis/, 'Password can only contain Latin letters.')
    .required('Password is required'),
});

export const useLoginMvvm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return {
    formik,
  };
};
