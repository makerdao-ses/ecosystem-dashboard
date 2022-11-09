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
        <AvatarPlaceholder />
        <UserWrapper>
          <UserLabel>Username</UserLabel>
          <Spacer />
          <Username>Wouter Kampman</Username>
        </UserWrapper>
        <ChangePassword>Change Your Password</ChangePassword>
        <InputsWrapper>
          <Label>Enter Existing Password</Label>
          <TextInput type="password" placeholder="Password" name="OldPassword" style={{ marginBottom: 32 }} />
          <Label>Enter New Password</Label>
          <TextInput type="password" placeholder="New Password" name="NewPassword" style={{ marginBottom: 24 }} />
          <TextInput
            type="password"
            placeholder="Confirm Password"
            name="ConfirmPassword"
            style={{ marginBottom: 32 }}
          />
        </InputsWrapper>
        <ButtonWrapper>
          <CustomButton
            label="Set New Password"
            style={{
              width: 174,
              height: 34,
              borderRadius: 22,
            }}
          />
        </ButtonWrapper>
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

export const UserLabel = styled.p({
  color: '#708390',
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
});

export const Username = styled.h1({
  fontSize: 24,
  lineHeight: '29px',
  color: '#231536',
  textAlign: 'center',
  margin: 0,
});

const ChangePassword = styled.h2({
  fontSize: 20,
  lineHeight: '24px',
  color: '#231536',
  margin: '0 0 32px 0',
  alignSelf: 'flex-start',
  letterSpacing: 0.4,
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
