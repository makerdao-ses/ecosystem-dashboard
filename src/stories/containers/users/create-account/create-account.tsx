import styled from '@emotion/styled';
import React from 'react';
import Image from 'next/image';
import CloseButton from '../../../components/close-button/close-button';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import TextInput from '../../../components/text-input/text-input';
import { ButtonWrapper, Container, Wrapper, Form } from '../../auth/login/login';
import { useCreateAccountMvvm } from './create-account.mvvm';

export default () => {
  const { isLight } = useThemeContext();
  const { form, loading, error } = useCreateAccountMvvm();

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
              error={(form.touched.username && form.errors.username) ?? !!error}
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
              error={(form.touched.password && form.errors.password) ?? !!error}
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
              error={(form.touched.confirmPassword && form.errors.confirmPassword) ?? !!error}
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
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginBottom: 32,
  },
});
