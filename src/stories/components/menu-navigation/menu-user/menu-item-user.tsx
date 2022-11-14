import styled from '@emotion/styled';
import React from 'react';
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
  return (
    <Container>
      <ContainerItem onClick={onClickProfile}>
        <Profile />
        <Label>Profile</Label>
      </ContainerItem>
      {isAdmin && (
        <ContainerItem onClick={onClickAccountManager}>
          <AccountMangerSetting />
          <Label>Manage Accounts</Label>
        </ContainerItem>
      )}

      <ContainerItem onClick={onClickLogOut}>
        <LogOut />
        <Label>Log out</Label>
      </ContainerItem>
    </Container>
  );
};

const Container = styled.div({
  background: '#FFFFFF',
  boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '6px',
  padding: 16,
  width: 'fit-content',
});

const Label = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  textAlign: 'center',
  letterSpacing: '0.3px',
  color: '#231536',
  marginLeft: 13.64,
});

const ContainerItem = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 42.5,
  cursor: 'pointer',
  ':last-child': {
    marginBottom: 0,
  },
});
export default MenuItemUser;
