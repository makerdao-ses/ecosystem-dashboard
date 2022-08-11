import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Logo from '../svg/logo';
import SelectLink from './select-link-website/select-link';
import { WebSiteLinks } from './select-link-website/menu-items';
import { MenuType } from './menu-items';
import { useRouter } from 'next/router';
import ThemeSwitcherButton from '../button/switch-button/switch-buttom';
import { ThemeMode, useThemeContext } from '../../../core/context/ThemeContext';
import Expenses from '../svg/expenses';
import { CustomLink } from '../custom-link/custom-link';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { TopBarSelect } from '../top-bar-select/top-bar-select';

interface Props {
  menuItems: MenuType[];
  links: WebSiteLinks[];
  themeMode: ThemeMode
  toggleTheme: () => void
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Header = ({ menuItems, links, themeMode, toggleTheme }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();
  const onClick = useCallback(
    (link: string) => () => {
      window.open(link, '_blank');
    },
    [router],
  );

  const handleGoHome = useCallback(
    () => {
      router.push('/');
    },
    [router],
  );

  return (
    <Container isLight={isLight} >
      <LeftPart>
        <ContainerLogoSelect isLight={isLight}>
          <LogoContainer>
            <Logo fill='#211634' fillDark='#1aab9b' onClick={handleGoHome} />
          </LogoContainer>
          <LogoLinksWrapper>
            <Expenses fill={themeMode === 'dark' ? '#6EDBD0' : '#211634'} />
            <SelectLink links={links} themeMode={themeMode} fill={themeMode === 'dark' ? '#EDEFFF' : '#25273D'} onClick={onClick} toggleTheme={toggleTheme} />
          </LogoLinksWrapper>
        </ContainerLogoSelect>

        <Navigation>
          {menuItems.map(({ marginRight, link, title }: MenuType) => {
            let isActive = false;
            if (router.pathname === '/' || router.pathname.includes('core-unit')) {
              isActive = link === '/';
            } else {
              isActive = router.pathname.includes(link) && link !== '/';
            }

            return (<ItemMenuStyle
              isLight={isLight}
              key={title}
              style={{ marginRight }}
              href={link}
              active={isActive}>
              {title}
            </ItemMenuStyle>);
          })}
          <ItemMenuResponsive>
            <TopBarSelect
              selectedOption={'Core Units'}
            />
          </ItemMenuResponsive>
          <LinkWrapper>
            <CustomLink
              children='How to Submit Expenses'
              fontWeight={500}
              fontSize={16}
              href={HOW_TO_SUBMIT_EXPENSES}
              style={{
                fontFamily: 'SF Pro Display, sans serif',
                color: '#447AFB',
                fontStyle: 'normal',
                lineHeight: '19px',
                letterSpacing: '0.3px',
                marginLeft: '0px',
              }}
              marginLeft='7px'
              withArrow
              iconHeight={10}
              iconWidth={10}
            />
          </LinkWrapper>
        </Navigation>
      </LeftPart>
      <RightPart>
        <ThemeSwitcherButtonWrapper>
          <ThemeSwitcherButton themeMode={themeMode} toggleTheme={toggleTheme} />
        </ThemeSwitcherButtonWrapper>
        <SelectLink links={links} themeMode={themeMode} fill={themeMode === 'dark' ? '#EDEFFF' : '#25273D'} onClick={onClick} responsive={true} toggleTheme={toggleTheme} />
      </RightPart>
    </Container >
  );
};

const Container = styled.header<{ isLight: boolean }>(({ isLight }) => ({
  position: 'fixed',
  display: 'flex',
  width: '100%',
  zIndex: 4,
  flexDirection: 'row',
  height: '64px',
  justifyContent: 'space-between',
  background: isLight ? 'url(/assets/img/bg-header.png)' : 'url(/assets/img/bg-header-dark.png)',
  borderBottom: isLight ? '1px solid #E7FCFA' : 'none',
}));

const LeftPart = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
});

const ContainerLogoSelect = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  width: 'fit-content',
  marginRight: '16px',
  alignItems: 'center',
  paddingLeft: '16px',
  background: isLight ? 'url(/assets/img/bg-logo.png)' : 'url(/assets/img/bg-logo-dark.png)',
  '@media (min-width: 435px)': {
    paddingRight: '32px',
    marginRight: '32px',
    paddingLeft: '32px',
  },
  '@media (min-width: 635px)': {
    width: '316px',
  },
}));

const LogoContainer = styled.div({
  marginTop: '13px',
  marginBottom: '13px',
  marginRight: '16px',
  cursor: 'pointer',
  '@media (min-width: 435px) and (max-width: 635px)': {
    marginRight: '0px',
  },
  '@media (min-width: 635px)': {
    marginRight: '32px',
  }
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
  paddingRight: '16px',
  '@media (min-width: 435px)': {
    paddingRight: '32px',
  }
});

const ItemMenuStyle = styled.a<{ active: boolean, marginRight?: string, isLight: boolean }>(({ active, isLight, marginRight }) => ({
  display: 'none',
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  transform: 'none',
  marginRight,
  color: active && isLight ? '#1AAB9B' : (isLight && !active) ? '#25273D' : !(isLight && active) ? '#2DC1B1' : '#D2D4EF',
  letterSpacing: '0.4px',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    color: '#1dc1ae',
  },
  '@media (min-width: 834px)': {
    display: 'block'
  }
}));

const ItemMenuResponsive = styled.div({
  '@media (min-width: 834px)': {
    display: 'none'
  }
});

const LinkWrapper = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'flex',
  }
});

const LogoLinksWrapper = styled.div({
  display: 'none',
  '@media (min-width: 635px)': {
    display: 'flex',
  }
});

const ThemeSwitcherButtonWrapper = styled.div({
  display: 'none',
  '@media (min-width: 635px)': {
    display: 'block'
  }
});

export default Header;
