import styled from '@emotion/styled';
import React from 'react';
import { CustomButton } from '../../../components/custom-button/custom-button';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import TextInput from '../../../components/text-input/text-input';
import { ButtonWrapper, Container, InputsWrapper, Wrapper } from '../login/login';

export default () => {
  return (
    <Wrapper>
      <Container>
        <AvatarPlaceholder />
        <Username>Wouter Kampman</Username>
        <ChangePassword>Change Your Password</ChangePassword>
        <InputsWrapper>
          <Label>Enter Existing Password</Label>
          <TextInput type="password" placeholder="Password" name="OldPassword" style={{ marginBottom: 32 }} />
          <Label>Enter New Password</Label>
          <TextInput type="password" placeholder="Password" name="NewPassword" style={{ marginBottom: 24 }} />
          <TextInput type="password" placeholder="Password" name="ConfirmPassword" style={{ marginBottom: 32 }} />
        </InputsWrapper>
        <ButtonWrapper>
          <CustomButton
            label="Set New Password"
            style={{
              width: 174,
              borderRadius: 22,
            }}
          />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

const Username = styled.h1({
  fontSize: 24,
  lineHeight: '29px',
  color: '#231536',
  marginTop: 16,
  marginBottom: 48,
  textAlign: 'center',
});

const ChangePassword = styled.h2({
  fontSize: 20,
  lineHeight: '24px',
  color: '#231536',
  marginBottom: 32,
  textAlign: 'center',
  letterSpacing: 0.4,
});

const Label = styled.div({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: '#231536',
  marginBottom: 16,
});
