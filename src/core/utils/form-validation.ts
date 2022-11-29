import * as yup from 'yup';
import { INVALID_CHARACTERS_MESSAGE } from './const';

export const passwordValidationYup = yup
  .string()
  .min(10, 'Your password must have at least 10 characters.')
  .matches(/^([a-z]|[A-Z]|[0-9]|[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])*$/g, INVALID_CHARACTERS_MESSAGE)
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).*$/g,
    'Your password must contain at least one uppercase, one lowercase, one number and one special character.'
  );
