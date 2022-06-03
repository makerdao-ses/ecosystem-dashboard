import React from 'react';
import styled from '@emotion/styled';
import Logo from '../svg/logo';
import { MenuType } from './menu-items';
import { Button, IconButton, Link } from '@mui/material';
import { Chat, Language } from '@mui/icons-material';
import ThemeMode from '../svg/theme-mode';

interface Props {
  menuItems: MenuType[];
}

const Header = ({ menuItems }: Props) => {
  return (
    <Container>

      <LeftPart>
        <LogoContainer>
          <Logo width={38} height={38} fill='#211634' />
        </LogoContainer>
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
        <OtherIcons>
          <ButtonStyle href="/" variant="outlined" sx={{
            marginRight: '16px',
            padding: '0px',
            textTransform: 'none',
            border: 'none'
          }}>
            Lorem Ipsum link
          </ButtonStyle>

          <ButtonStyle href="/" variant="outlined" sx={{
            padding: '0px',
            textTransform: 'none',
            border: 'none'
          }}>
            Lorem Ipsum link
          </ButtonStyle>
        </OtherIcons>
        <IconsContainer>
          <IconButton color="inherit" sx={{ marginRight: '24px' }}>
            <Chat sx={{
              fill: '#898989',
              width: '22px',
              height: '22px'
            }} />
          </IconButton>
          <IconButton color="inherit" sx={{ marginRight: '24px' }}>
            <Language sx={{
              fill: '#898989',
              width: '26.67px',
              height: '26.67px'
            }} />
          </IconButton>
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
  width: '100%',
  zIndex: '2',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#C4C4C4',
  paddingRight: '32px',
  paddingLeft: '32px',
});

const LeftPart = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const LogoContainer = styled.div({
  marginTop: '13px',
  marginBottom: '13px',
  marginRight: '64px',
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
  color: '#25273D',
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

const OtherIcons = styled.div({
  display: 'flex',
  flexDirection: 'row',
  paddingRight: '20px',
});

const ButtonStyle = styled(Button)({
  width: '151px',
  height: '27px',
  display: 'flex',
  borderRadius: '5px',
  backgroundColor: '#EDEDED',
  color: '#000000',
  borderColor: 'none',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
});

export default Header;
