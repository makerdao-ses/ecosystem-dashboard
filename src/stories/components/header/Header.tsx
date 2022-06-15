import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Logo from '../svg/logo';
import { IconButton } from '@mui/material';
import ThemeMode from '../svg/theme-mode';
import SelectLink from './select-link-website/select-link';
import Dashboard from '../svg/dash-board';
import { WebSiteLinks } from './select-link-website/menu-items';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuType } from './menu-items';

interface Props {
  menuItems: MenuType[];
  links: WebSiteLinks[];
}

const Header = ({ menuItems, links }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const onClick = useCallback(
    (link: string) => () => {
      window.open(link, '_blank');
    },
    [navigate],
  );

  return (
    <Container >

      <LeftPart>

        <ContainerLogoSelect>
          <LogoContainer>
            <Logo fill='#211634' />
          </LogoContainer>
          <Dashboard />
          <SelectLink links={links} onClick={onClick} />
        </ContainerLogoSelect>

        <Navigation>
          {menuItems.map(({ marginRight, link, title }: MenuType) => {
            let isActive = false;
            if (location.pathname === '/' || location.pathname.includes('about')) {
              isActive = link === '/';
            } else {
              isActive = location.pathname.includes(link) && link !== '/';
            }

            return (<ItemMenuStyle
              key={
                title
              } style={{ marginRight }} href={link}
              active={isActive}>
              {title}
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
  zIndex: 4,
  flexDirection: 'row',
  height: '64px',
  justifyContent: 'space-between',
  background: 'url(/assets/img/bg-header.png)',
  borderBottom: '1px solid #E7FCFA',
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

const ItemMenuStyle = styled.a<{ active: boolean, marginRight?: string }>((props) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  transform: 'none',
  marginRight: props.marginRight,
  color: props.active ? '#1AAB9B' : '#231536',
  letterSpacing: '0.4px',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    color: '#1dc1ae',
  },
}));

const IconsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '32px',
});

export default Header;
