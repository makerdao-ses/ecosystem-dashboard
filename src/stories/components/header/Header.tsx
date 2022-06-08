import React from 'react';
import styled from '@emotion/styled';
import Logo from '../svg/logo';
import { MenuType } from './menu-items';
import { IconButton, Link } from '@mui/material';
import ThemeMode from '../svg/theme-mode';
import SelectLink from './select-link-website/select-link';
import Dashboard from '../svg/dash-board';
import { WebSiteLinks } from './select-link-website/menu-items';

interface Props {
  menuItems: MenuType[];
  links: WebSiteLinks[]
}

const Header = ({ menuItems, links }: Props) => {
  return (
    <Container >

      <LeftPart>

        <ContainerLogoSelect>
          <LogoContainer>
            <Logo fill='#211634' />
          </LogoContainer>
          <Dashboard />
          <SelectLink links={links} />
        </ContainerLogoSelect>

        <Navigation>
          {menuItems.map((menu: MenuType) => {
            return (<ItemMenuStyle key={
              menu.title
            } sx={{ marginRight: menu.marginRight }} underline='none' href={menu.link}>
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

const Container = styled.header({
  position: 'fixed',
  display: 'flex',
  width: '100%',
  zIndex: '4',
  flexDirection: 'row',
  height: '64px',
  justifyContent: 'space-between',
  background: 'url(/assets/img/bg-header.png)',
  borderBottom: '1px solid #E7FCFA',
  backdropFilter: 'blur(30px)',
});

const LeftPart = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
});

const ContainerLogoSelect = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  width: '316px',
  marginRight: '32px',
  alignItems: 'center',
  paddingRight: '32px',
  paddingLeft: '32px',
  background: 'url(/assets/img/bg-logo.png)',
});

const LogoContainer = styled.div({
  marginTop: '13px',
  marginBottom: '13px',
  marginRight: '32px',
});

const Navigation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  alignItems: 'center',
});

const RightPart = styled.div({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '32px',
});

const ItemMenuStyle = styled(Link)({
  fontFamily: 'FT Base, sans-serif',
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
