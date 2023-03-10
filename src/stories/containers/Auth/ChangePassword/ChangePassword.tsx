import styled from '@emotion/styled';
import { Skeleton } from '@mui/material';
import React from 'react';
import { capitalizeWordWithoutConvertLowerCase } from '../../../../core/utils/string';
import CloseButton from '../../../components/CloseButton/CloseButton';
import { CustomButton } from '../../../components/CustomButton/CustomButton';
import TextInput from '../../../components/TextInput/TextInput';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import { ButtonWrapper, Form } from '../Login/LoginForm/LoginForm';
import { useUserChangePassword } from './useUserChangePassword';

const ChangePassword: React.FC<{ adminChange?: boolean }> = ({ adminChange = false }) => {
  const {
    isLight,
    form,
    username,
    loading,
    isUserLoading,
    hasErrorLoadingUser,
    error,
    isWrongOldPassword,
    isMobileOrTable,
    handleGoBack,
    isUserDisable,
  } = useUserChangePassword(adminChange);

  if (hasErrorLoadingUser) {
    return <MessageContainer>Error fetching user</MessageContainer>;
  }

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
            {adminChange && isUserLoading ? (
              <Skeleton
                variant="rectangular"
                width={140}
                height={32}
                style={{
                  borderRadius: '8px',
                  background: isLight ? '#ECF1F3' : '#1E2C37',
                }}
              />
            ) : (
              capitalizeWordWithoutConvertLowerCase(username || '')
            )}
          </Username>
        </UserWrapper>
        <ChangePasswordLabel isLight={isLight}>Change {adminChange ? 'User' : 'Your'} Password</ChangePasswordLabel>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <InputsWrapper>
            <Label isLight={isLight}>{adminChange ? 'Enter Your Admin Password' : 'Enter Existing Password'}</Label>
            <TextInput
              type="password"
              placeholder="Password"
              name="oldPassword"
              value={form.values.oldPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={
                (form.touched.oldPassword && form.errors.oldPassword) ||
                (isWrongOldPassword && `Wrong ${adminChange ? 'admin' : 'old'} password`) ||
                (isUserDisable && 'Account disabled. Reach admin for more info') ||
                error
              }
              style={{ marginBottom: 32 }}
              disabled={loading}
            />
            <Label isLight={isLight}>{adminChange ? 'Enter a New User Password' : 'Enter New Password'}</Label>
            <TextInput
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={form.values.newPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.newPassword && form.errors.newPassword}
              style={{ marginBottom: 24 }}
              disabled={loading}
            />
            <TextInput
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.confirmPassword && form.errors.confirmPassword}
              style={{ marginBottom: 32 }}
              disabled={loading}
            />
          </InputsWrapper>
          <ButtonWrapper>
            <CustomButton
              label="Set New Password"
              onClick={form.submitForm}
              style={{
                width: 174,
                height: 34,
                borderRadius: 22,
                ...(isMobileOrTable ? { borderColor: isLight ? '#25273D' : '#343442' } : {}),
              }}
              type="submit"
              disabled={loading}
            />
          </ButtonWrapper>
        </Form>
      </Container>
    </Wrapper>
  );
};

export default ChangePassword;

const MessageContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 100,
});

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

export const UserWrapper = styled.div({
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

export const Spacer = styled.div({
  background: '#D4D9E1',
  height: 1,
  width: 228,
  order: 2,
  '@media (min-width: 834px)': {
    display: 'none',
  },
});

export const UserLabel = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#708390' : '#D2D4EF',
  fontSize: 20,
  lineHeight: '24px',
  fontWeight: 600,
  margin: 0,
  order: 3,
  '@media (min-width: 834px)': {
    margin: '0 8px 0 0',
    ':after': {
      content: '":"',
    },
    order: 1,
  },
}));

export const Username = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 24,
  lineHeight: '29px',
  color: isLight ? '#231536' : '#D2D4EF',
  textAlign: 'center',
  margin: 0,
  order: 1,
}));

export const ChangePasswordLabel = styled.h2<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 20,
  lineHeight: '24px',
  color: isLight ? '#434358' : '#D2D4EF',
  margin: '0 0 32px 0',
  alignSelf: 'flex-start',
  letterSpacing: 0.4,
  fontWeight: 600,
}));

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 16,
}));

const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginBottom: 32,
  },
});
