import * as yup from 'yup';

export const passwordValidationYup = yup
  .string()
  .min(10, 'Your password must have at least 10 characters.')
  .matches(
    /^([a-z]|[A-Z]|[0-9]|[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])*$/g,
    'Your password contains an invalid character or white space.'
  )
  .test('password-requirements', '', (value, { createError }) => {
    let errorMessage = 'Your password must contain at least one';
    const hasLower = /(?=.*[a-z])/g.test(value || '');
    const hasUpper = /(?=.*[A-Z])/g.test(value || '');
    const hasNumber = /(?=.*[0-9])/g.test(value || '');
    const hasSpecial = /(?=.*[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g.test(value || '');

    if (!hasLower) {
      errorMessage += ' lowercase character';
    }
    if (!hasUpper) {
      errorMessage += `${!hasLower ? `,${hasSpecial && hasNumber ? ' or' : ''}` : ''} uppercase character`;
    }
    if (!hasNumber) {
      errorMessage += `${!hasLower || !hasUpper ? `,${hasSpecial ? ' or' : ''}` : ''} number`;
    }
    if (!hasSpecial) {
      errorMessage += `${!hasLower || !hasUpper || !hasNumber ? ', or' : ''} special character`;
    }

    if (!hasLower || !hasUpper || !hasNumber || !hasSpecial) {
      return createError({ message: errorMessage });
    }
    return true;
  });
