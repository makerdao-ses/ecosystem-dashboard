import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import AccountMangerSetting from '../../svg/account-manager-settings';
import LogOut from '../../svg/log-out';
import Profile from '../../svg/profile';

interface Props {
  onClickProfile?: () => void;
  onClickLogOut?: () => void;
  onClickAccountManager?: () => void;
  isAdmin?: boolean;
}

const MenuItemUser = ({
  onClickLogOut,
  onClickProfile,
  isAdmin = false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClickAccountManager = () => {},
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <ContainerItem onClick={onClickProfile} isLight={isLight}>
        <Profile fill={isLight ? '#231536' : '#FFFFFF'} />
        <Label isLight={isLight}>Profile</Label>
      </ContainerItem>
      {isAdmin && (
        <ContainerItem onClick={onClickAccountManager} isLight={isLight}>
          <AccountMangerSetting fill={isLight ? '#231536' : '#FFFFFF'} />
          <Label isLight={isLight}>Manage Accounts</Label>
        </ContainerItem>
      )}

      <ContainerItem onClick={onClickLogOut} isLight={isLight}>
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

const ContainerItem = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 22.5,
  height: 40,
  paddingLeft: 8,
  paddingBottom: 8,
  paddingTop: 8,
  cursor: 'pointer',
  ':last-child': {
    marginBottom: 0,
  },
  ':hover': {
    backgroundColor: isLight ? '#EDEFFF' : '#25273D',
    borderRadius: '6px',
    paddingLeft: 8,
    paddingBottom: 8,
    paddingTop: 8,
    height: 40,
  },
}));
export default MenuItemUser;
