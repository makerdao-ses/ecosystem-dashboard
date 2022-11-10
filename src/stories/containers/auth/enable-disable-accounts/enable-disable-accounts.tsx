/* eslint-disable @typescript-eslint/no-unused-vars */
import styled from '@emotion/styled';
import request, { GraphQLClient } from 'graphql-request';
import fill from 'lodash/fill';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { useAuthContext } from '../../../../core/context/AuthContext';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { ButtonType } from '../../../../core/enums/button-type.enum';
import ControlledSwitches from '../../../components/button/switch-toogle/switch-component';
import CloseButton from '../../../components/close-button/close-button';
import { CustomButton } from '../../../components/custom-button/custom-button';
import { CustomLink } from '../../../components/custom-link/custom-link';
import AvatarPlaceholder from '../../../components/svg/avatar-placeholder';
import { Wrapper } from '../login/login';
import { ENABLE_DISABLE_USER_REQUEST } from './enable-disable.api';

const arrayPassword = new Array<string>(8);
const resultPassword = fill(arrayPassword, 'a');

export default () => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  const { user, clientRequest } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const handleChange = useCallback(async () => {
    const { query: gqlQuery, input } = ENABLE_DISABLE_USER_REQUEST(!checked, '1');
    const data = await clientRequest?.request(gqlQuery, input);
    if (data) {
      console.log('data', data.userSetActiveFlag[0].active);
      setChecked(data.userSetActiveFlag[0].active);
    }
  }, [checked, clientRequest]);

  const handleDeleteAccount = useCallback(() => {
    router.push('/auth/delete-account');
  }, [router]);

  return (
    <Wrapper isLight={isLight}>
      <Container isLight={isLight}>
        <ContainerInside>
          <CloseButton
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
            }}
          />
          <CenterWrapper>
            <AvatarPlaceholder />
          </CenterWrapper>
          <CenterWrapper>
            <UserWrapper>
              <UserLabel>User</UserLabel>
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: '8px',
            }}
          >
            <UserNameLabel isLight={isLight}>Password:</UserNameLabel>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              {resultPassword.map((item: unknown, index) => {
                return (
                  <div style={{ marginRight: '4px' }} key={index}>
                    <DotPassword isLight={isLight} />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: '20px',
            }}
          >
            <CustomLink href="/auth/change-password" withArrow={false} target="self">
              Change user password
            </CustomLink>
          </div>
        </ContainerInside>
        <Line isLight={isLight} />
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
          <ControlledSwitches checked={checked} handleChange={handleChange} label="Active" />
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

const UserWrapper = styled.div({
  marginTop: 16,
  marginBottom: 32,
});

const UserLabel = styled.p({
  color: '#9FAFB9',
  fontSize: 18,
  lineHeight: '22px',
  fontWeight: 600,
  margin: '0 8px 0 0',
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
  marginRight: '8px',
}));
const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: 104,
  width: 343,
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  borderRadius: '6px',
  '@media (min-width: 834px)': {
    width: '484px',
    top: 128,
  },
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
  fontSize: '24px',
  lineHeight: '29px',
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

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  border: isLight ? '1px solid #D4D9E1' : ' 1px solid #405361;',
  width: '100%',
  marginBottom: '16px',
}));

const ContainerInside = styled.div({
  marginBottom: '8px',
  padding: '24px',
  '@media (min-width: 834px)': {
    padding: '40px 64px',
  },
});

const ButtonWrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',

  justifyContent: 'space-between',
  paddingLeft: '10px',
  paddingRight: '10px',
  marginBottom: '16px',
  alignItems: 'center',

  '@media (min-width: 834px)': {
    paddingLeft: '64px',
    paddingRight: '77px',
  },
});
