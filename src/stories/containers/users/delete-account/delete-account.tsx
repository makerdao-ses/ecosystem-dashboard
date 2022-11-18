import styled from '@emotion/styled';
import CloseButton from '../../../components/close-button/close-button';
import React, { useCallback, useState } from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import TextInput from '../../../components/text-input/text-input';
import { Spacer, Username, UserWrapper } from '../../auth/change-password/change-password';
import { ButtonWrapper, Container, Wrapper } from '../../auth/login/login';

export default () => {
  const testingPassword = '1234';
  const [value, setValue] = useState('');
  const { isLight } = useThemeContext();

  const handleChange = useCallback((value: React.ChangeEvent<HTMLInputElement>) => {
    setValue(value.target.value);
  }, []);

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
        <AvatarPlaceholder />
        <UserWrapper>
          <UserLabel>Username</UserLabel>
          <Spacer />
          <Username isLight={isLight}>Wouter Kampman</Username>
        </UserWrapper>

        <DeleteLabel>Delete Account</DeleteLabel>
        <WarningLabel>ATTENTION: this action cannot be undone</WarningLabel>

        <InputsWrapper>
          <Label isLight={isLight}>Enter password to delete the account</Label>
          <TextInput
            type="password"
            placeholder="Password"
            name="Password"
            style={{ marginBottom: 32 }}
            value={value}
            onChange={handleChange}
          />
        </InputsWrapper>

        <ButtonWrapper>
          <CustomButton
            label="Delete Account"
            style={{
              width: 151,
              height: 34,
              borderRadius: 22,
              borderColor: isLight
                ? testingPassword === value
                  ? '#F75524'
                  : 'none'
                : testingPassword === value
                ? '#F75524'
                : '#343442',
            }}
            styleText={{
              color: isLight
                ? testingPassword === value
                  ? '#F75524'
                  : 'unset'
                : testingPassword === value
                ? '#F75524'
                : '#343442',
            }}
            disabled={!(testingPassword === value)}
          />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

const DeleteLabel = styled.h1({
  margin: '0 0 8px 0',
  fontWeight: 600,
  fontSize: 20,
  lineHeight: '24px',
  color: '#434358',
  alignSelf: 'flex-start',
});

const WarningLabel = styled.h1({
  fontWeight: 400,
  fontSize: 16,
  lineHeight: '22px',
  color: '#F75524',
  margin: '0 0 32px 0',
  alignSelf: 'flex-start',
});

const InputsWrapper = styled.div({
  width: '100%',
  marginBottom: 0,
  '@media (min-width: 834px)': {
    marginBottom: 32,
  },
});

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: isLight ? '#231536' : '#434358',
  marginBottom: 16,
}));

const UserLabel = styled.p({
  color: '#708390',
  fontSize: 20,
  lineHeight: '24px',
  fontWeight: 600,
  margin: '0 8px 0 0',
});
