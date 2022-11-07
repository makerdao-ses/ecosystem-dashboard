import styled from '@emotion/styled';
import React from 'react';
import { CustomButton } from '../../../components/custom-button/custom-button';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import TextInput from '../../../components/text-input/text-input';
import { ButtonWrapper, Container, Wrapper } from '../login/login';

export default () => {
  return (
    <Wrapper>
      <Container>
        <CustomButton
          label="Close"
          style={{
            width: 86,
            height: 34,
            borderRadius: 22,
            position: 'absolute',
            top: 24,
            right: 24,
          }}
        />
        <AvatarPlaceholder />
        <Title>Create New Account</Title>
        <Description>Create a new user account to provide access to the administration area.</Description>
        <InputsWrapper>
          <Label>Enter Username</Label>
          <TextInput
            type="text"
            placeholder="Username"
            name="username"
            style={{
              marginBottom: '32px',
            }}
          />
          <Label>Create Password</Label>
          <TextInput
            type="password"
            placeholder="Password"
            name="password"
            style={{
              marginBottom: '24px',
            }}
          />
          <TextInput type="password" placeholder="Confirm Password" name="confirm-password" />
        </InputsWrapper>
        <ButtonWrapper>
          <CustomButton
            label="Create Account"
            style={{
              width: 200,
              height: 40,
              borderRadius: 22,
            }}
          />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

const Title = styled.h1({
  margin: '24px 0 16px 0',
  fontWeight: 600,
  fontSize: 32,
  lineHeight: '39px',
  color: '#231536',
});

const Description = styled.p({
  margin: '0 0 64px 0',
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  textAlign: 'center',
});

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
