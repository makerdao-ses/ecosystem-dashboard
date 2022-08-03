import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import Logo from '../svg/logo';
import SelectLink from './select-link-website/select-link';
import { WebSiteLinks } from './select-link-website/menu-items';
import { MenuType } from './menu-items';
import { useRouter } from 'next/router';
import ThemeSwitcherButton from '../button/switch-button/switch-buttom';
import { ThemeMode } from '../../../core/context/ThemeContext';
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
    <Container themeMode={themeMode}>
      <LeftPart>
        <ContainerLogoSelect themeMode={themeMode}>
          <LogoContainer>
            <Logo fill={themeMode === 'dark' ? '#6EDBD0' : '#211634'} onClick={handleGoHome} />
          </LogoContainer>
          <LogoLinksWrapper>
            <Expenses fill={themeMode === 'dark' ? '#6EDBD0' : '#211634'} />
            <SelectLink links={links} themeMode={themeMode} fill={themeMode === 'dark' ? '#EDEFFF' : '#25273D'} onClick={onClick} toggleTheme={toggleTheme}/>
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
              themeMode={themeMode}
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
                marginLeft: '0px'
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

const Container = styled.header<{ themeMode: string }>((props) => ({
  position: 'fixed',
  display: 'flex',
  width: '100%',
  zIndex: 4,
  flexDirection: 'row',
  height: '64px',
  justifyContent: 'space-between',
  background: props.themeMode === 'light' ? 'url(/assets/img/bg-header.png)' : 'url(/assets/img/bg-header-dark.png)',
}));

const LeftPart = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  height: '100%',
});

const ContainerLogoSelect = styled.div<{ themeMode: string }>((props) => ({
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
  width: 'fit-content',
  marginRight: '16px',
  alignItems: 'center',
  paddingLeft: '16px',
  background: props.themeMode === 'light' ? 'url(/assets/img/bg-logo.png)' : 'url(/assets/img/bg-logo-dark.png)',
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

const ItemMenuStyle = styled.a<{ active: boolean, marginRight?: string, themeMode: string }>((props) => ({
  display: 'none',
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  transform: 'none',
  marginRight: props.marginRight,
  color: props.active ? '#1AAB9B' : (props.themeMode === 'light' && !props.active) ? '#25273D' : '#D2D4EF',
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
