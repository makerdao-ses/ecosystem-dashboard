import styled from '@emotion/styled';
import CloseButton from '../../../components/close-button/close-button';
import React, { useCallback } from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CustomButton } from '../../../components/custom-button/custom-button';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import TextInput from '../../../components/text-input/text-input';
import { Spacer, Username, UserWrapper } from '../../auth/change-password/change-password';
import { ButtonWrapper, Container, Wrapper } from '../../auth/login/login';
import { useRouter } from 'next/router';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { ContainerNotification } from '../../../components/notification/notification';
import { useIsAdmin } from '../../../../core/hooks/useIsAdmin';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import { useDeleteAccountMvvm } from './delete-account.mvvm';

export default () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { userName } = router.query;

  const { isLight } = useThemeContext();
  const { form: formLogic } = useDeleteAccountMvvm();

  const isAdmin = useIsAdmin(user || ({} as UserDTO));

  const handleGoBack = useCallback(() => {
    if (window?.history?.state?.idx > 0) {
      router.back();
    } else {
      router.push(`/auth/manage#${isAdmin ? 'manage' : 'profile'}`);
    }
  }, [isAdmin, router]);

  return (
    <Wrapper isLight={isLight}>
      <Container isLight={isLight}>
        <CloseButton
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
          }}
          onClick={handleGoBack}
        />
        <AvatarPlaceholder />
        <UserWrapper>
          <UserLabel>Username</UserLabel>
          <Spacer />
          <Username isLight={isLight}>{userName}</Username>
        </UserWrapper>

        <DeleteLabel>Delete Account</DeleteLabel>
        <WarningLabel>ATTENTION: this action cannot be undone</WarningLabel>

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            formLogic.handleSubmit();
          }}
        >
          <Label isLight={isLight}>Enter password to delete the account</Label>
          <InputsWrapper>
            <TextInput
              onBlur={formLogic.handleBlur}
              type="password"
              placeholder="Password"
              name="password"
              style={{ marginBottom: 32 }}
              value={formLogic.values.password}
              onChange={(e) => {
                formLogic.handleChange(e);
              }}
            />
          </InputsWrapper>

          <ButtonWrapper>
            <CustomButton
              type="submit"
              allowsHover={false}
              label="Delete Account"
              style={{
                width: 151,
                height: 34,
                borderRadius: 22,
                borderColor: isLight
                  ? formLogic.values.password !== ''
                    ? '#F75524'
                    : 'none'
                  : formLogic.values.password !== ''
                  ? '#F75524'
                  : '#343442',
              }}
              styleText={{
                color: isLight
                  ? formLogic.values.password !== ''
                    ? '#F75524'
                    : 'unset'
                  : formLogic.values.password !== ''
                  ? '#F75524'
                  : '#343442',
              }}
              disabled={!(formLogic.values.password !== '')}
            />
          </ButtonWrapper>
        </Form>
      </Container>
      <ContainerNotification />
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

const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
