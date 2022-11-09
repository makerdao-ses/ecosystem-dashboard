import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import TextInput from '../../../components/text-input/text-input';
import { useLoginMvvm } from './login.mvvm';

export default () => {
  const { isLight } = useThemeContext();
  const { form, error, onLogin } = useLoginMvvm();

  return (
    <Wrapper isLight={isLight}>
      <Container>
        <AvatarPlaceholder />
        <Title>Log In</Title>
        <Description>Enter your username and password to get access to the administration area.</Description>
        <InputsWrapper>
          <TextInput
            style={{ marginBottom: 32 }}
            placeholder="Username"
            value={form.values.username}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={(form.touched.username && form.errors.username) ?? error}
            name="username"
          />
          <TextInput
            placeholder="Password"
            value={form.values.password}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={(form.touched.password && form.errors.password) ?? error}
            type="password"
            name="password"
          />
        </InputsWrapper>
        <ButtonWrapper>
          <CustomButton
            label="Log In"
            onClick={onLogin}
            style={{
              width: 128,
              borderRadius: 22,
            }}
          />
        </ButtonWrapper>
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

export const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '24px',
  position: 'absolute',
  top: 104,
  width: 343,
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
  '@media (min-width: 834px)': {
    padding: '40px 64px',
    width: '484px',
    top: 128,
  },
});

const Title = styled.h1({
  fontWeight: 600,
  fontSize: 32,
  lineHeight: '39px',
  textAlign: 'center',
  letterSpacing: 0.4,
  color: '#231536',
  marginTop: 24,
  marginBottom: 16,
  '@media (min-width: 834px)': {
    marginTop: 40,
  },
});

const Description = styled.h3({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  textAlign: 'center',
  color: '#231536',
  marginBottom: 42,
  maxWidth: 294,
});

export const ButtonWrapper = styled.div({
  alignSelf: 'flex-end',
});

export const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 42,
  '@media (min-width: 834px)': {
    marginBottom: 60,
  },
});
