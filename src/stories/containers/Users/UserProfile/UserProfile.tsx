import styled from '@emotion/styled';
import fill from 'lodash/fill';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import lightTheme from '../../../../../styles/theme/light';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ButtonType } from '../../../../core/enums/buttonTypeEnum';
import { capitalizeWordWithoutConvertLowerCase, getCorrectRoleApi } from '../../../../core/utils/string';
import { CustomButton } from '../../../components/CustomButton/CustomButton';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import type { UserDTO } from '../../../../core/models/dto/authDTO';

const arrayPassword = new Array<string>(8);
const resultPassword = fill(arrayPassword, 'a');

const UserProfile = () => {
  const router = useRouter();
  const isAdminProfile = router.pathname.includes('/auth/manage/my-profile');
  const { isLight } = useThemeContext();
  const { user, clearCredentials, isAdmin } = useAuthContext();
  const { allRoles } = getCorrectRoleApi(user || ({} as UserDTO));

  const handleDeleteAccount = useCallback(() => {
    if (isAdminProfile) {
      router.push('/auth/manage/delete-my-account');
      return;
    }
    router.push('/auth/delete-account');
  }, [router, isAdminProfile]);

  const handleLogOut = () => {
    clearCredentials?.();
    router.push('/login');
  };

  return (
    <Wrapper>
      <Container isLight={isLight}>
        <ContainerInformation>
          <CenterWrapper>
            <AvatarPlaceholder />
          </CenterWrapper>
          <CenterWrapper>
            <UserWrapper>
              <LabelUser isLight={isLight}>{capitalizeWordWithoutConvertLowerCase(user?.username || '')}</LabelUser>
              {isAdmin && (
                <ContainerRoles>
                  {allRoles.map((role, index) => (
                    <UserRole key={index}>{role}</UserRole>
                  ))}
                </ContainerRoles>
              )}
            </UserWrapper>
          </CenterWrapper>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '32px',
            }}
          >
            <UserNameLabel>Username:</UserNameLabel>
            <UserLabelValue isLight={isLight}>
              {capitalizeWordWithoutConvertLowerCase(user?.username || '')}
            </UserLabelValue>
          </div>
          <ContainerPassword>
            <UserNameLabel
              style={{
                marginRight: 11,
              }}
            >
              Password:
            </UserNameLabel>
            <ContainerDots>
              {resultPassword.map((_: unknown, index) => (
                <div style={{ marginRight: '4px' }} key={index}>
                  <DotPassword isLight={isLight} />
                </div>
              ))}
            </ContainerDots>
          </ContainerPassword>
          <ContainerPasswordLink>
            <Link href={isAdmin ? '/auth/manage/change-my-password' : '/auth/change-password'} legacyBehavior>
              <ChangePasswordLink>
                {isAdmin && isAdminProfile
                  ? 'Change your password'
                  : isAdmin && !isAdminProfile
                  ? 'Change user password'
                  : 'Change your password'}
              </ChangePasswordLink>
            </Link>
          </ContainerPasswordLink>
        </ContainerInformation>
        <ButtonWrapper>
          <CustomButton
            onClick={handleDeleteAccount}
            label="Delete Account"
            buttonType={ButtonType.Danger}
            style={{
              width: 151,
              height: 34,
              borderRadius: 22,
            }}
          />
          <ContainerWrapper
            onClick={handleLogOut}
            buttonType={ButtonType.Default}
            label="Log Out"
            style={{
              width: 102,
              height: 34,
              borderRadius: 22,
            }}
          />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

export default UserProfile;

const Wrapper = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  height: 'fit-content',
  paddingBottom: 128,
}));

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px 24px 32px 24px',
  width: 343,
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: '6px',
  '@media (min-width: 834px)': {
    width: '484px',
    padding: '40px 64px 40px 64px',
  },
}));

const UserWrapper = styled.div({
  marginTop: 16,
  marginBottom: 64,
});

const UserRole = styled.p({
  color: '#9FAFB9',
  fontSize: 18,
  lineHeight: '22px',
  fontWeight: 600,
  textAlign: 'center',
  marginTop: 0,
  marginBottom: 4,
  ':last-child': {
    marginBottom: 0,
  },
});

const UserNameLabel = styled.p({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: '#9FAFB9',
  marginTop: 0,
  marginBottom: 0,
  marginRight: '8px',
});

const CenterWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const UserLabelValue = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: '0px',
  marginBottom: '0px',
}));

const DotPassword = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  width: 8,
  height: 8,
  background: isLight ? '#231536' : '#D2D4EF',
  borderRadius: '50%',
}));

const ButtonWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginTop: 64,
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ContainerPassword = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '8px',
});

const ContainerPasswordLink = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: '93px',
});

const ChangePasswordLink = styled.a({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#2C99E9',
  cursor: 'pointer',
});

const ContainerInformation = styled.div({
  paddingLeft: 28,
  paddingRight: 28,
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    paddingLeft: 58.5,
    paddingRight: 58.5,
  },
});

const LabelUser = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 24,
  lineHeight: '29px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginBottom: 8,
  marginTop: 0,
}));

const ContainerDots = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const ContainerRoles = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ContainerWrapper = styled(CustomButton)({
  '@media (max-width: 1194px)': {
    border: '1px solid #25273D',
  },
});
