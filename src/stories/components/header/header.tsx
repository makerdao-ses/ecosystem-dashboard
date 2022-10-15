import React, { useCallback, useMemo } from 'react';
import styled from '@emotion/styled';
import Logo from '../svg/logo';
import SelectLink from './select-link-website/select-link';
import { WebSiteLinks } from './select-link-website/menu-items';
import menuItems, { MenuType } from './menu-items';
import { useRouter } from 'next/router';
import ThemeSwitcherButton from '../button/switch-button/switch-buttom';
import { ThemeMode, useThemeContext } from '../../../core/context/ThemeContext';
import Expenses from '../svg/expenses';
import { CustomLink } from '../custom-link/custom-link';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { TopBarSelect } from '../top-bar-select/top-bar-select';

interface Props {
  links: WebSiteLinks[];
  themeMode: ThemeMode;
  toggleTheme: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const Header = ({ links, themeMode, toggleTheme }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  const router = useRouter();
  const onClick = useCallback(
    (link: string) => () => {
      window.open(link, '_blank');
    },
    [router]
  );

  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const activeMenuItem = useMemo(() => {
    for (const item of menuItems) {
      if (item.link === '/') {
        if (router.pathname === '/' || router.pathname.includes('core-unit')) {
          return item;
        }
      } else {
        if (router.pathname.includes(item.link)) {
          return item;
        }
      }
    }

    return menuItems[0];
  }, [router.query]);

  return (
    <Container isLight={isLight}>
      <LeftPart>
        <ContainerLogoSelect isLight={isLight}>
          <LogoContainer>
            <Logo fill="#211634" fillDark="#1aab9b" onClick={handleGoHome} />
          </LogoContainer>
          <LogoLinksWrapper>
            <Expenses fill={themeMode === 'dark' ? '#6EDBD0' : '#211634'} />
            <SelectLink
              links={links}
              themeMode={themeMode}
              fill={themeMode === 'dark' ? '#EDEFFF' : '#25273D'}
              onClick={onClick}
              toggleTheme={toggleTheme}
            />
          </LogoLinksWrapper>
        </ContainerLogoSelect>

        <Navigation>
          {menuItems.map((item: MenuType) => {
            return (
              <ItemMenuStyle
                isLight={isLight}
                key={item.title}
                style={{ marginRight: item.marginRight }}
                href={item.link}
                active={activeMenuItem === item}
              >
                {item.title}
              </ItemMenuStyle>
            );
          })}
          <ItemMenuResponsive>
            <TopBarSelect selectedOption={activeMenuItem.title} />
          </ItemMenuResponsive>
          <LinkWrapper>
            <CustomLink
              children="How to Submit Expenses"
              fontWeight={500}
              fontSize={16}
              href={HOW_TO_SUBMIT_EXPENSES}
              style={{
                fontFamily: 'Inter, sans serif',
                color: '#447AFB',
                fontStyle: 'normal',
                letterSpacing: '0.3px',
                marginLeft: '0px',
              }}
              marginLeft="7px"
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
        <SelectLink
          links={links}
          themeMode={themeMode}
          fill={themeMode === 'dark' ? '#EDEFFF' : '#25273D'}
          onClick={onClick}
          responsive={true}
          toggleTheme={toggleTheme}
        />
      </RightPart>
    </Container>
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
  background: isLight ? '#FFFFFF' : ' linear-gradient(180deg, #000000 0%, #001A34 100%)',
}));

const LeftPart = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
  width: '100%',
});

const ContainerLogoSelect = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  width: 'fit-content',
  marginRight: '16px',
  alignItems: 'center',
  padding: '0 16px',
  background: isLight
    ? 'linear-gradient(125.61deg, rgba(182, 237, 231, 0.5) -69.93%, rgba(182, 237, 231, 0.05) 130.99%)'
    : 'linear-gradient(125.61deg, rgba(0, 68, 61, 0.5) -69.93%, rgba(27, 45, 43, 0.05) 130.99%)',
  backdropFilter: 'blur(30px)',
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
  },
});

const Navigation = styled.div({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  '@media (min-width: 1194px)': {
    justifyContent: 'flex-start',
  },
});

const RightPart = styled.div({
  display: 'flex',
  alignItems: 'center',
  paddingRight: '10px',
  '@media (min-width: 835px)': {
    paddingRight: '26px',
  },
});

const ItemMenuStyle = styled.a<{ active: boolean; marginRight?: string; isLight: boolean }>(
  ({ active, isLight, marginRight }) => ({
    display: 'none',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '22px',
    transform: 'none',
    marginRight,
    color: isLight ? (active ? '#1AAB9B' : '#25273D') : active ? '#2DC1B1' : '#D2D4EF',
    letterSpacing: '0.4px',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      color: '#1dc1ae',
    },
    '@media (min-width: 1194px)': {
      display: 'block',
    },
  })
);

const ItemMenuResponsive = styled.div({
  '@media (min-width: 1194px)': {
    display: 'none',
  },
});

const LinkWrapper = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'flex',
    position: 'absolute',
    right: 16,
  },
  '@media (min-width: 1194px)': {
    right: 24,
  },
});

const LogoLinksWrapper = styled.div({
  display: 'none',
  '@media (min-width: 635px)': {
    display: 'flex',
  },
});

const ThemeSwitcherButtonWrapper = styled.div({
  display: 'none',
  '@media (min-width: 635px)': {
    display: 'block',
  },
});

export default Header;
