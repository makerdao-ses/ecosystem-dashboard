/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import { useMediaQuery } from '@mui/material';
import request, { GraphQLClient } from 'graphql-request';
import fill from 'lodash/fill';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import lightTheme from '../../../../../styles/theme/light';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ButtonType } from '../../../../core/enums/button-type.enum';
import ControlledSwitches from '../../../components/button/switch-toogle/switch-component';
import CloseButton from '../../../components/close-button/close-button';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { CustomLink } from '../../../components/custom-link/custom-link';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import { ENABLE_DISABLE_USER_REQUEST } from '../../auth/enable-disable-accounts/enable-disable.api';

const arrayPassword = new Array<string>(8);
const resultPassword = fill(arrayPassword, 'a');

const UserProfile = () => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  const { user, clientRequest, clearCredentials, isAdmin } = useAuthContext();
  const [checked, setChecked] = useState(false);
  const isMobileOrTable = useMediaQuery(lightTheme.breakpoints.between('table_375', 'desktop_1194'));

  const handleChange = useCallback(async () => {
    const { query: gqlQuery, input } = ENABLE_DISABLE_USER_REQUEST(!checked, '1');
    const data = await clientRequest?.request(gqlQuery, input);
    if (data) {
      setChecked(data.userSetActiveFlag[0].active);
    }
  }, [checked, clientRequest]);

  const handleDeleteAccount = useCallback(() => {
    router.push({
      pathname: '/auth/delete-account/',
      query: {
        userName: user?.username,
        id: user?.id,
      },
    });
    router.push('/auth/delete-account');
  }, [router]);

  const handleLogOut = () => {
    clearCredentials && clearCredentials();
  };

  return (
    <Container isLight={isLight}>
      <ContainerInformation>
        <CenterWrapper>
          <AvatarPlaceholder />
        </CenterWrapper>
        <CenterWrapper>
          <UserWrapper>
            <LabelUser isLight={isLight}>{user?.username || ''}</LabelUser>
            {isAdmin && <UserRole>Site Admin</UserRole>}
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
          <UserNameLabel isLight={isLight}>Username:</UserNameLabel>
          <UserLabelValue isLight={isLight}>{user?.username}</UserLabelValue>
        </div>
        <ContainerPassword>
          <UserNameLabel isLight={isLight}>Password:</UserNameLabel>
          <ContainerDots>
            {resultPassword.map((item: unknown, index) => {
              return (
                <div style={{ marginRight: '4px' }} key={index}>
                  <DotPassword isLight={isLight} />
                </div>
              );
            })}
          </ContainerDots>
        </ContainerPassword>
        <ContainerPasswordLink>
          <CustomLink
            href="/auth/change-password"
            withArrow={false}
            target="_self"
            style={{
              marginLeft: '0px',
            }}
          >
            Change user password
          </CustomLink>
        </ContainerPasswordLink>
      </ContainerInformation>
      <ButtonWrapper>
        <CustomButton
          onClick={handleDeleteAccount}
          label="Delete Account"
          style={{
            width: 151,
            height: 34,
            borderRadius: 22,
            borderColor: '#F75524',
          }}
          styleText={{
            color: '#F75524',
          }}
        />
        <CustomButton
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
  );
};

export default UserProfile;

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
  marginBottom: 0,
});

const UserNameLabel = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  color: '#708390',
  marginTop: 0,
  marginBottom: 0,
  marginRight: '8px',
}));

const CenterWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

const UserLabelValue = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
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
