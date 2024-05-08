import useMediaQuery from '@mui/material/useMediaQuery';
import { useFormik } from 'formik';
import request, { ClientError } from 'graphql-request';
import { useRouter } from 'next/router';
import { useState, useEffect, useCallback } from 'react';
import * as yup from 'yup';
import lightTheme from '../../../../../styles/theme/themes';
import { GRAPHQL_ENDPOINT } from '../../../../config/endpoints';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { passwordValidationYup } from '../../../../core/utils/formValidation';
import { triggerToast } from '../../../../core/utils/notifications';
import { goBack } from '../../../../core/utils/routing';
import { FETCH_USER_BY_USERNAME } from '../../Users/ManagedUserProfile/managedUserProfileAPI';
import { UPDATE_PASSWORD_REQUEST } from './ChangePasswordAPI';
import type { UserDTO } from '../../../../core/models/dto/authDTO';

const validationSchema = yup.object({
  oldPassword: yup.string().required('Old Password is required'),
  newPassword: passwordValidationYup
    .notOneOf([yup.ref('oldPassword'), null], 'New password should not be as old password')
    .required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('newPassword'), null],
      "Your password doesn't match, please insert a different password confirmation."
    )
    .required('Password confirmation is required'),
});

const adminChangeValidationSchema = yup.object({
  oldPassword: yup.string().required('Admin Password is required'),
  newPassword: passwordValidationYup.required('New password is required'),
  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('newPassword'), null],
      "Your password doesn't match, please insert a different password confirmation."
    )
    .required('Password confirmation is required'),
});

export const useUserChangePassword = (adminChange: boolean) => {
  const { isLight } = useThemeContext();
  const router = useRouter();
  const { user: authenticatedUser, authToken, isAdmin } = useAuthContext();
  const [error, setError] = useState<string>('');
  const [isWrongOldPassword, setIsWrongOldPassword] = useState<boolean>(false);
  const [isUserDisable, setIsUserDisable] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobileOrTable = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  // for "adminChange" only
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isUserLoading, setIsUserLoading] = useState<boolean>(true);
  const [hasErrorLoadingUser, setHasErrorLoadingUser] = useState<boolean>(false);

  useEffect(() => {
    const asyncFunction = async () => {
      if (adminChange) {
        const { username } = router.query;
        if (username) {
          try {
            const { query, input } = FETCH_USER_BY_USERNAME(username as string);
            const response = await request(GRAPHQL_ENDPOINT, query, input, { Authorization: `Bearer ${authToken}` });
            if (response.users.length > 0) {
              setUser(response.users[0]);
            }
          } catch (error) {
            setHasErrorLoadingUser(true);
            console.error(error);
          } finally {
            setIsUserLoading(false);
          }
        }
      }
    };
    asyncFunction();
  }, [adminChange, authToken, router]);
  // end adminChange

  const handleGoBack = useCallback(() => {
    if (adminChange) {
      goBack(`/auth/manage/user/${router.query.username}`);
      return;
    }
    goBack(`/auth/${isAdmin ? 'manage/my-profile' : 'user-profile'}`);
  }, [adminChange, isAdmin, router.query.username]);

  const form = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: adminChange ? adminChangeValidationSchema : validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError('');
      setIsWrongOldPassword(false);
      const { query, input } = UPDATE_PASSWORD_REQUEST(
        (adminChange ? user?.username : authenticatedUser?.username) ?? '',
        values.oldPassword,
        values.newPassword
      );

      try {
        await request(GRAPHQL_ENDPOINT, query, input, { Authorization: `Bearer ${authToken}` });

        triggerToast({
          message: adminChange
            ? `You have successfully created a new password for ${user?.username || ''}`
            : 'Your new password has been successfully created',
        });

        router.push(
          adminChange
            ? `/auth/manage/user/${router.query.username}`
            : isAdmin
            ? '/auth/manage/my-profile'
            : '/auth/user-profile'
        );
      } catch (err) {
        if (err instanceof ClientError) {
          if (err.response.errors && err.response.errors.length > 0) {
            if (
              ['Error: wrong old password', 'Error: Wrong admin old password'].includes(err.response.errors[0].message)
            ) {
              setIsWrongOldPassword(true);
            }

            if (['Error: Account disabled. Reach admin for more info.'].includes(err.response.errors[0].message)) {
              setIsUserDisable(true);
            }
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
    isLight,
    form,
    loading: loading || (adminChange && isUserLoading),
    error,
    isAdmin,
    username: (adminChange ? user?.username : authenticatedUser?.username) ?? '',
    isUserLoading,
    hasErrorLoadingUser,
    isWrongOldPassword,
    isMobileOrTable,
    handleGoBack,
    isUserDisable,
  };
};
