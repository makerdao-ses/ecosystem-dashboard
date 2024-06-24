import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '@/core/context/ThemeContext';
import AccountMangerSetting from '@/stories/components/svg/account-manager-settings';
import LogOut from '@/stories/components/svg/log-out';
import Profile from '@/stories/components/svg/profile';

interface Props {
  onClickLogOut?: () => void;
  isAdmin?: boolean;
  hrefAccountManager: string;
  hrefProfile: string;
}

const MenuItemUser = ({ onClickLogOut, isAdmin = false, hrefProfile, hrefAccountManager }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Link href={hrefProfile} passHref legacyBehavior>
        <ContainerItem isLight={isLight}>
          <Profile fill={isLight ? '#231536' : '#FFFFFF'} />
          <Label isLight={isLight}>Profile</Label>
        </ContainerItem>
      </Link>
      {isAdmin && (
        <Link href={hrefAccountManager} passHref legacyBehavior>
          <ContainerItem isLight={isLight}>
            <AccountMangerSetting fill={isLight ? '#231536' : '#FFFFFF'} />
            <Label isLight={isLight}>Manage Accounts</Label>
          </ContainerItem>
        </Link>
      )}

      <ContainerItem onClick={onClickLogOut} isLight={isLight} as="div">
        <LogOut fill={isLight ? '#231536' : '#FFFFFF'} />
        <Label isLight={isLight}>Log out</Label>
      </ContainerItem>
    </Container>
  );
};

const Container = styled.div({
  padding: 16,
  width: 'fit-content',
});

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'center',
  letterSpacing: '0.3px',
  color: isLight ? '#231536' : '#EDEFFF',
  marginLeft: 13.64,
}));

const ContainerItem = styled.a<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 22.5,
  height: 40,
  padding: 8,
  cursor: 'pointer',
  ':last-child': {
    marginBottom: 0,
  },
  ':hover': {
    backgroundColor: isLight ? '#EDEFFF' : '#25273D',
    borderRadius: '6px',
    padding: 8,
    height: 40,
  },
  textDecoration: 'none',
}));
export default MenuItemUser;
