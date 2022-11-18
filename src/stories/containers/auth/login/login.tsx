import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import TextInput from '../../../components/text-input/text-input';
import { useLoginMvvm } from './login.mvvm';
import Image from 'next/image';

export default () => {
  const { form: formLogic, loading, error, clearErrors } = useLoginMvvm();
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
              error={(formLogic.touched.username && formLogic.errors.username) ?? !!error}
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
                width: 128,
                borderRadius: 22,
              }}
              type="submit"
              disabled={loading || !!error || Object.keys(formLogic.errors).length > 0}
            />
          </ButtonWrapper>
        </Form>
      </Container>
    </Wrapper>
  );
};

export const Wrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? 'url(/assets/img/bg-page.png)' : 'url(/assets/img/login-bg.png)',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
}));

export const Container = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  position: 'absolute',
  top: 104,
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
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '39px',
  textAlign: 'center',
  letterSpacing: 0.4,
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: 24,
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginTop: 40,
    fontSize: 32,
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
}));

export const ButtonWrapper = styled.div({
  alignSelf: 'flex-end',
});

export const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 42,
  '@media (min-width: 834px)': {
    marginBottom: 64,
  },
});

export const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
