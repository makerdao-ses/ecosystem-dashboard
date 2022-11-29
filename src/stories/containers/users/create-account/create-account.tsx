import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import Image from 'next/image';
import CloseButton from '../../../components/close-button/close-button';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import TextInput from '../../../components/text-input/text-input';
import { ButtonWrapper, Form } from '../../auth/login/login';
import { useCreateAccountMvvm } from './create-account.mvvm';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import { useIsAdmin } from '../../../../core/hooks/useIsAdmin';
import lightTheme from '../../../../../styles/theme/light';

export default () => {
  const { isLight } = useThemeContext();
  const { user } = useAuthContext();
  const router = useRouter();
  const { form, loading, error } = useCreateAccountMvvm();

  const isAdmin = useIsAdmin(user || ({} as UserDTO));

  const handleGoBack = useCallback(() => {
    if (window?.history?.state?.idx > 0) {
      router.back();
    } else {
      router.push(`/auth/manage/${isAdmin ? 'accounts' : 'my-profile'}`);
    }
  }, [isAdmin, router]);

  return (
    <Wrapper isLight={isLight} style={{ alignItems: 'flex-start' }}>
      <Container isLight={isLight}>
        <CloseButton
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
          }}
          onClick={handleGoBack}
        />
        <Image src={'/assets/img/ses-logo-64x64.png'} width={64} height={64} />
        <Title isLight={isLight}>Create New Account</Title>
        <Description isLight={isLight}>
          Create a new user account to provide access to the administration area.
        </Description>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <InputsWrapper>
            <Label>Enter Username</Label>
            <TextInput
              type="text"
              placeholder="Username"
              name="username"
              value={form.values.username}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={
                (form.touched.username && form.errors.username) ||
                (error && 'Error: username already taken, try a new one')
              }
              style={{
                marginBottom: '32px',
              }}
            />
            <Label>Create Password</Label>
            <TextInput
              type="password"
              placeholder="Password"
              name="password"
              value={form.values.password}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={
                (form.touched.password && form.errors.password) ||
                (error &&
                  'Error: Your password must contain at least one uppercase character, lowercase character, number, or special character.')
              }
              disabled={loading}
              style={{
                marginBottom: '24px',
              }}
            />
            <TextInput
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.values.confirmPassword}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={
                (form.touched.confirmPassword && form.errors.confirmPassword) ||
                (error &&
                  'Error: Your password must contain at least one uppercase character, lowercase character, number, or special character.')
              }
              disabled={loading}
              style={{
                marginBottom: '24px',
              }}
            />
          </InputsWrapper>
          <ButtonWrapper>
            <CustomButton
              label="Create Account"
              style={{
                width: 200,
                height: 40,
                borderRadius: 22,
              }}
              type="submit"
            />
          </ButtonWrapper>
        </Form>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
}));

const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 24,
  width: 343,
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',

  borderRadius: '6px',
  '@media (min-width: 834px)': {
    padding: '40px 64px',
    width: '484px',
    top: 128,
  },
}));

const Title = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  margin: '24px 0 16px 0',
  fontWeight: 600,
  lineHeight: '39px',
  fontSize: 24,
  color: isLight ? '#231536' : '#D2D4EF',
  '@media (min-width: 834px)': {
    fontSize: 32,
  },
}));

const Description = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  margin: '0 0 64px 0',
  fontWeight: 400,
  fontSize: 16,
  color: isLight ? '#231536' : '#D2D4EF',
  lineHeight: '22px',
  textAlign: 'center',
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
  marginBottom: 40,
});
