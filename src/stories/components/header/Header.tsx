import React from 'react';
import styled from '@emotion/styled';
import Logo from '../svg/logo';
import { MenuType } from './menu-items';
import { IconButton, Link } from '@mui/material';
import ThemeMode from '../svg/theme-mode';

interface Props {
  menuItems: MenuType[];
}

const Header = ({ menuItems }: Props) => {
  return (
    <Container >

      <LeftPart>

        <ContainerLogoSelect>
          <LogoContainer>
            <Logo fill='#211634' />
          </LogoContainer>
          <div style={{
            width: '130px',
            height: '26px',
            background: '#211634',
            marginRight: '16px',
          }} />
          <div style={{
            width: '26px',
            height: '26px',
            background: '#211634',
          }} />
        </ContainerLogoSelect>

        <Navigation>
          {menuItems.map((menu: MenuType) => {
            return (<ItemMenuStyle key={
              menu.title
            } sx={{ marginRight: menu.marginRight }} underline='none'>
              {menu.title}
            </ItemMenuStyle>);
          })}

        </Navigation>

      </LeftPart>
      <RightPart>
        <IconsContainer>
          <IconButton color="inherit">
            <ThemeMode width={22.67} height={22.67} />
          </IconButton>
        </IconsContainer>
      </RightPart>
    </Container >
  );
};

const Container = styled.div({
  height: '64px',
  position: 'fixed',
  width: window.innerWidth,
  zIndex: '2',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#C4C4C4',
});

const LeftPart = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const ContainerLogoSelect = styled.div({
  display: 'flex',
  flexDirection: 'row',
  width: '316px',
  marginRight: '32px',
  alignItems: 'center',
  paddingRight: '32px',
  paddingLeft: '32px',
});

const LogoContainer = styled.div({
  marginTop: '13px',
  marginBottom: '13px',
  marginRight: '32px',
});

const Navigation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '22px',
  marginTop: '22px',
});

const RightPart = styled.div({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  right: '32px',
  top: '16px',
});

const ItemMenuStyle = styled(Link)({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#25273D;',
  letterSpacing: '0.4px',
  cursor: 'pointer',
  '&:hover': {
    color: '#1dc1ae',
  },
});

const IconsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '32px',
});

export default Header;
