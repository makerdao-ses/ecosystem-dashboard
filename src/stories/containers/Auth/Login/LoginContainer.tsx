import styled from '@emotion/styled';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import LoginForm from './LoginForm/LoginForm';
import { useLogin } from './useLogin';

const LoginContainer: React.FC = () => {
  const { form: formLogic, loading, error, clearErrors, hasUserInactive } = useLogin();
  const { isLight } = useThemeContext();

  return (
    <Wrapper isLight={isLight}>
      <SEOHead
        title="MakerDAO Ecosystem Performance Dashboard | Login Page"
        description="Login Page for Core Unit administrators and auditors provides easy access to MakerDAO Ecosystem Performance Dashboard to manage expense reports"
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
      />
      <Container isLight={isLight}>
        <LoginForm
          form={formLogic}
          clearErrors={clearErrors}
          hasUserInactive={hasUserInactive}
          loading={loading}
          error={error}
        />
      </Container>
    </Wrapper>
  );
};

export default LoginContainer;

export const Wrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
  paddingTop: 64,
}));

const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: '6px',
  padding: '24px',
  marginTop: 40,
  marginBottom: 148,

  [lightTheme.breakpoints.up('table_834')]: {
    padding: '40px 64px',
    marginTop: 64,
    marginBottom: 128,
    width: 484,
    top: 128,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginTop: 40,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 64,
  },
}));
