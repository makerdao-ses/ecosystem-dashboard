import styled from '@emotion/styled';
import Skeleton from '@mui/material/Skeleton';
import { ButtonWrapper } from '@ses/containers/auth/login/login-form/login-form';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { useIsAdmin } from '../../../../core/hooks/useIsAdmin';
import { goBack } from '../../../../core/utils/routing';
import { capitalizeWordWithoutConvertLowerCase } from '../../../../core/utils/string.utils';
import CloseButton from '../../../components/close-button/close-button';
import { CustomButton } from '../../../components/custom-button/custom-button';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import TextInput from '../../../components/text-input/text-input';
import { Spacer, UserLabel, Username } from '../../auth/change-password/change-password';
import { useDeleteAccountMvvm } from './delete-account.mvvm';
import type { UserDTO } from '../../../../core/models/dto/auth.dto';

const DeleteAccount: React.FC<{ username?: string }> = ({ username }) => {
  const router = useRouter();
  const { user, isAdmin } = useAuthContext();
  const isAdminRouter = router.pathname.includes('manage/delete-my-account');

  const { isLight } = useThemeContext();
  const { form: formLogic, isFetchingUser, deletingUser, isDeleting } = useDeleteAccountMvvm(username);

  const isLoggedAdmin = useIsAdmin(user || ({} as UserDTO));

  const handleGoBack = useCallback(() => {
    if (!isLoggedAdmin) {
      goBack('/auth/user-profile');
      return;
    }
    goBack(`/auth/manage/user/${deletingUser?.username}`);
  }, [isLoggedAdmin, deletingUser]);

  return (
    <Wrapper>
      <Container isLight={isLight}>
        <CloseButton
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
          }}
          onClick={handleGoBack}
        />
        <AvatarPlaceholder />
        <UserWrapper>
          <UserLabel isLight={isLight}>Username</UserLabel>
          <Spacer />
          <Username isLight={isLight}>
            {isFetchingUser ? (
              <Skeleton variant="rectangular" width={140} height={32} style={{ borderRadius: 8 }} />
            ) : (
              capitalizeWordWithoutConvertLowerCase(username || (router.query.username as string))
            )}
          </Username>
        </UserWrapper>

        <DeleteLabel isLight={isLight}>Delete Account</DeleteLabel>
        <WarningLabel>ATTENTION: this action cannot be undone</WarningLabel>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formLogic.handleSubmit();
          }}
        >
          <Label isLight={isLight}>{`${
            isAdmin && !isAdminRouter
              ? 'Enter your admin password to delete the account'
              : 'Enter your password to delete the account'
          }`}</Label>
          <InputsWrapper>
            <TextInput
              disabled={isFetchingUser}
              onBlur={formLogic.handleBlur}
              type="password"
              placeholder="Password"
              name="password"
              style={{ marginBottom: 32 }}
              value={formLogic.values.password}
              onChange={(e) => {
                formLogic.handleChange(e);
              }}
            />
          </InputsWrapper>

          <ButtonWrapper>
            <CustomButton
              type="submit"
              allowsHover={false}
              label="Delete Account"
              style={{
                width: 151,
                height: 34,
                borderRadius: 22,
                borderColor: isLight
                  ? formLogic.values.password !== '' && !isDeleting
                    ? '#F75524'
                    : '#D4D9E1'
                  : formLogic.values.password !== '' && !isDeleting
                  ? '#F75524'
                  : '#343442',
              }}
              styleText={{
                color: isLight
                  ? formLogic.values.password !== '' && !isDeleting
                    ? '#F75524'
                    : 'unset'
                  : formLogic.values.password !== '' && !isDeleting
                  ? '#F75524'
                  : '#343442',
              }}
              disabled={!(formLogic.values.password !== '') || isFetchingUser || isDeleting}
            />
          </ButtonWrapper>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default DeleteAccount;

const Wrapper = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
  paddingBottom: 128,
}));

const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  width: 343,
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  borderRadius: '6px',
  '@media (min-width: 834px)': {
    padding: '40px 64px',
    width: '484px',
  },
}));

const DeleteLabel = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  margin: '0 0 8px 0',
  fontWeight: 600,
  fontSize: 20,
  lineHeight: '24px',
  color: isLight ? '#434358' : '#D2D4EF',
  alignSelf: 'flex-start',
}));

const WarningLabel = styled.h1({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  color: '#F75524',
  margin: '0 0 32px 0',
  alignSelf: 'flex-start',
});

const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginBottom: 32,
  },
});

const UserWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 16,
  gap: 4,
  marginBottom: 48,
  '@media (min-width: 834px)': {
    flexDirection: 'row',
    gap: 0,
  },
});
const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 16,
}));

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
