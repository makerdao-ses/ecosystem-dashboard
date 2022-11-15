import styled from '@emotion/styled';
import React from 'react';
import CloseButton from '../../../components/close-button/close-button';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import TextInput from '../../../components/text-input/text-input';
import { ButtonWrapper, Container, Form, Wrapper } from '../login/login';
import { userChangePasswordMvvm } from './change-password.mvvm';
import { CircleAvatar } from '../../../components/circle-avatar/circle-avatar';

export default () => {
  const { isLight } = useThemeContext();
  const { form, username, loading, error } = userChangePasswordMvvm();

  return (
    <Wrapper isLight={isLight}>
      <Container isLight={isLight}>
        <CloseButton
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
          }}
        />
        <CircleAvatar name={username} width={'64px'} height={'64px'} />
        <UserWrapper>
          <UserLabel isLight={isLight}>Username</UserLabel>
          <Spacer />
          <Username isLight={isLight}>{username}</Username>
        </UserWrapper>
        <ChangePassword>Change Your Password</ChangePassword>
        <Form onSubmit={form.submitForm}>
          <InputsWrapper>
            <Label>Enter Existing Password</Label>
            <TextInput
              type="password"
              placeholder="Password"
              name="oldPassword"
              value={form.values.oldPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.oldPassword && form.errors.oldPassword}
              style={{ marginBottom: 32 }}
              disabled={loading}
            />
            <Label>Enter New Password</Label>
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
              error={(form.touched.confirmPassword && form.errors.confirmPassword) ?? error}
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
              }}
              disabled={loading}
            />
          </ButtonWrapper>
          <input type="submit" style={{ display: 'none' }} />
        </Form>
      </Container>
    </Wrapper>
  );
};

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
  '@media (min-width: 834px)': {
    display: 'none',
  },
});

export const UserLabel = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#708390' : '#D2D4EF',
  fontSize: 24,
  lineHeight: '24px',
  fontWeight: 600,
  margin: 0,
  '@media (min-width: 834px)': {
    margin: '0 8px 0 0',
    ':after': {
      content: '":"',
    },
  },
}));

export const Username = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 24,
  lineHeight: '29px',
  color: isLight ? '#231536' : '#D2D4EF',
  textAlign: 'center',
  margin: 0,
}));

export const ChangePassword = styled.h2<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: 20,
  lineHeight: '24px',
  color: isLight ? '#231536' : '#D2D4EF',
  margin: '0 0 32px 0',
  alignSelf: 'flex-start',
  letterSpacing: 0.4,
  fontWeight: 600,
}));

const Label = styled.div({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: '#231536',
  marginBottom: 16,
});

const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginBottom: 32,
  },
});
