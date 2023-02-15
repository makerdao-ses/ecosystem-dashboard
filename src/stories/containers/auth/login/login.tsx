import styled from '@emotion/styled';
import { CustomLink } from '@ses/components/custom-link/custom-link';
import lightTheme from '@ses/styles/theme/light';
import Image from 'next/image';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import TextInput from '../../../components/text-input/text-input';
import { useLoginMvvm } from './login.mvvm';
import type { WithIsLight } from '@ses/core/utils/types-helpers';

const LoginContainer: React.FC = () => {
  const { form: formLogic, loading, error, clearErrors, isMobile, isTable, hasUserInactive } = useLoginMvvm();
  const { isLight } = useThemeContext();

  return (
    <Wrapper isLight={isLight}>
      <Container isLight={isLight}>
        <Image src={'/assets/img/ses-logo-64x64.png'} width={64} height={64} />
        <Title isLight={isLight}>Log In</Title>
        <Description isLight={isLight}>
          Enter your username and password to get access to the administration area.
        </Description>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formLogic.handleSubmit();
          }}
        >
          <InputsWrapper>
            <TextInput
              name="username"
              style={{ marginBottom: 32 }}
              placeholder="Username"
              value={formLogic.values.username}
              onChange={(e) => {
                clearErrors();
                formLogic.handleChange(e);
              }}
              onBlur={formLogic.handleBlur}
              error={
                (formLogic.touched.username && formLogic.errors.username) ||
                (hasUserInactive && 'Account disabled. Reach admin for more info.')
              }
              disabled={loading}
            />
            <TextInput
              name="password"
              placeholder="Password"
              value={formLogic.values.password}
              onChange={(e) => {
                clearErrors();
                formLogic.handleChange(e);
              }}
              onBlur={formLogic.handleBlur}
              error={(formLogic.touched.password && formLogic.errors.password) ?? error}
              type="password"
              disabled={loading}
              errorAbsolutePosition={true}
            />
          </InputsWrapper>
          <ButtonWrapper>
            <CustomButton
              label="Log In"
              onClick={formLogic.submitForm}
              style={{
                height: isMobile || isTable ? '34px' : '48px',
                width: isMobile ? '93px' : isTable ? '89px' : '127px',
                ...(isMobile || isTable ? { borderColor: isLight ? '#25273D' : '#343442' } : {}),
              }}
              type="submit"
              disabled={loading || !!error || Object.keys(formLogic.errors).length > 0}
            />
          </ButtonWrapper>
        </Form>

        <RequestContainer>
          <RequestText isLight={isLight}>Don't have your Log In credentials yet?</RequestText>
          <CustomLink
            href="https://discord.gg/yPadwNU7"
            style={{
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '18px',
              letterSpacing: 'normal',
              marginLeft: 0,
            }}
            iconHeight={10}
            iconWidth={10}
            target="_blank"
          >
            Request Access
          </CustomLink>
        </RequestContainer>
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
  marginTop: 64,
}));

export const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
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

const Title = styled.h1<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  textAlign: 'center',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 24,
  marginBottom: 0,

  '@media (min-width: 834px)': {
    marginTop: 40,
    fontSize: 32,
    lineHeight: '39px',
  },
}));

const Description = styled.h3<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  textAlign: 'center',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 42,
  maxWidth: 294,

  [lightTheme.breakpoints.up('table_834')]: {
    maxWidth: '100%',
    marginBottom: 64,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    marginBottom: 42,
  },
}));

export const ButtonWrapper = styled.div({
  alignSelf: 'flex-end',
});

export const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 40,

  '@media (min-width: 834px)': {
    marginBottom: 64,
  },
});

export const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

const RequestContainer = styled.div({
  display: 'block',
  width: '100%',
  textAlign: 'center',
  marginTop: 48,

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 40,
  },
});

const RequestText = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  marginBottom: 2,
  color: isLight ? '#231536' : '#D2D4EF',
}));
