import styled from '@emotion/styled';
import { Divider, Skeleton } from '@mui/material';
import fill from 'lodash/fill';
import Link from 'next/link';
import React from 'react';
import lightTheme from '../../../../../styles/theme/themes';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ButtonType } from '../../../../core/enums/buttonTypeEnum';
import { capitalizeWordWithoutConvertLowerCase } from '../../../../core/utils/string';
import ControlledSwitches from '../../../../views/CUAbout/Button/ControlledSwitches/ControlledSwitches';
import CloseButton from '../../../components/CloseButton/CloseButton';
import { CustomButton } from '../../../components/CustomButton/CustomButton';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import useManagedUserProfile from './useManagedUserProfile';

const arrayPassword = new Array<string>(8);
const resultPassword = fill(arrayPassword, 'a');

const ManagedUserProfile: React.FC = () => {
  const { isLight } = useThemeContext();
  const skeletonBackground = isLight ? '#ECF1F3' : '#1E2C37';
  const {
    userProfile,
    userRoles,
    isLoading,
    errorFetchingUser,
    isChanging,
    handleChange,
    handleDeleteAccount,
    handleGoBack,
    isToLong,
  } = useManagedUserProfile();

  if (errorFetchingUser) {
    return <MessageContainer>Error fetching user</MessageContainer>;
  }

  if (!isLoading && !userProfile) {
    return <MessageContainer>No user found</MessageContainer>;
  }

  return (
    <Wrapper>
      <Container isLight={isLight}>
        <ContainerInside>
          <CloseButton
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
            }}
            onClick={handleGoBack}
          />
          <CenterWrapper>
            {isLoading ? (
              <Skeleton
                variant="circular"
                width={64}
                height={64}
                style={{
                  background: skeletonBackground,
                }}
              />
            ) : (
              <AvatarPlaceholder />
            )}
          </CenterWrapper>
          <CenterWrapper>
            <RolesWrapper>
              <RolesLabel>
                {isLoading ? (
                  <Skeleton
                    variant="rectangular"
                    width={160}
                    height={26}
                    style={{
                      borderRadius: '8px',
                      background: skeletonBackground,
                    }}
                  />
                ) : (
                  userRoles?.map((role) => <div key={role}>{role}</div>)
                )}
              </RolesLabel>
            </RolesWrapper>
          </CenterWrapper>
          <UserNameContainer isToLong={isToLong}>
            <UserNameLabel isLight={isLight}>Username:</UserNameLabel>
            <UserLabelValue isLight={isLight} isToLong={isToLong}>
              {isLoading ? (
                <Skeleton
                  variant="rectangular"
                  width={150}
                  height={32}
                  style={{
                    borderRadius: '8px',
                    background: skeletonBackground,
                  }}
                />
              ) : (
                capitalizeWordWithoutConvertLowerCase(userProfile?.username || '')
              )}
            </UserLabelValue>
          </UserNameContainer>
          <PasswordContainer>
            <UserNameLabel
              isLight={isLight}
              style={{
                marginRight: 11,
              }}
            >
              Password:
            </UserNameLabel>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width={180}
                height={32}
                style={{
                  borderRadius: '8px',
                  background: skeletonBackground,
                }}
              />
            ) : (
              <DotPasswordContainer>
                {resultPassword.map((_: unknown, index) => (
                  <div style={{ marginRight: '4px' }} key={index}>
                    <DotPassword isLight={isLight} />
                  </div>
                ))}
              </DotPasswordContainer>
            )}
          </PasswordContainer>
          <ChangePasswordContainer>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                width={140}
                height={18}
                style={{
                  borderRadius: '8px',
                  background: skeletonBackground,
                }}
              />
            ) : (
              <ContainerPasswordLink>
                <ContainerAlignedPassword />
                <Link href={`/auth/manage/user/${userProfile?.username}/change-password`} legacyBehavior>
                  <ChangePasswordLink>Change user password</ChangePasswordLink>
                </Link>
              </ContainerPasswordLink>
            )}
          </ChangePasswordContainer>
        </ContainerInside>
        <Divider
          light
          sx={{
            bgcolor: isLight ? '#D4D9E1' : '#405361',
            width: '100%',
            marginBottom: '16px',
          }}
          variant="fullWidth"
        />
        <ButtonWrapper>
          {isLoading ? (
            <>
              <Skeleton
                variant="rectangular"
                width={151}
                height={34}
                style={{
                  borderRadius: '22px',
                  background: skeletonBackground,
                }}
              />
              <Skeleton
                variant="rectangular"
                width={75}
                height={20}
                style={{
                  borderRadius: '8px',
                  background: skeletonBackground,
                }}
              />
            </>
          ) : (
            <>
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
              <ControlledSwitches
                checked={!!userProfile?.active}
                handleChange={handleChange}
                disabled={isChanging}
                label="Active"
              />
            </>
          )}
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

export default ManagedUserProfile;

const Wrapper = styled.div({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  width: '100%',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginTop: 24,
  },
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: 343,
  height: 'fit-content',
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: '6px',
  [lightTheme.breakpoints.up('table_834')]: {
    width: '484px',
  },
}));

const MessageContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 100,
});

const RolesWrapper = styled.div({
  marginTop: 16,
  marginBottom: 32,
});

const RolesLabel = styled.div({
  color: '#9FAFB9',
  fontSize: 18,
  lineHeight: '22px',
  fontWeight: 600,
  textAlign: 'center',
});

const UserNameLabel = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  color: isLight ? '#708390' : '#708390',
  marginTop: '0px',
  marginBottom: '0px',
  marginRight: '6px',
}));

const CenterWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const UserLabelValue = styled.p<{ isLight: boolean; isToLong: boolean }>(({ isLight, isToLong }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#D2D4EF',
  marginTop: '0px',
  marginBottom: '0px',
  wordBreak: isToLong ? 'break-all' : 'normal',
}));

const UserNameContainer = styled.div<{ isToLong: boolean }>(({ isToLong }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: isToLong ? 'flex-start' : 'center',
  marginBottom: '32px',
}));

const PasswordContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '8px',
});

const DotPasswordContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const DotPassword = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  width: 8,
  height: 8,
  background: isLight ? '#231536' : '#D2D4EF',
  borderRadius: '50%',
}));

const ContainerInside = styled.div({
  marginBottom: '8px',
  padding: '24px',
  [lightTheme.breakpoints.up('table_834')]: {
    padding: '40px 64px',
  },
});

const ChangePasswordContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
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

const ContainerPasswordLink = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
});

const ButtonWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingLeft: '10px',
  paddingRight: '10px',
  marginBottom: '16px',
  alignItems: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    paddingLeft: '64px',
    paddingRight: '77px',
  },
});

const ContainerAlignedPassword = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: 114,
});
