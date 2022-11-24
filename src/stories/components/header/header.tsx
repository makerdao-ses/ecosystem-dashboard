import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useAuthContext } from '../../../core/context/AuthContext';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { HOW_TO_SUBMIT_EXPENSES } from '../../../core/utils/const';
import { CustomLink } from '../custom-link/custom-link';
import Expenses from '../svg/expenses';
import Logo from '../svg/logo';

import { TopBarSelect } from '../top-bar-select/top-bar-select';

import menuItems, { MenuType } from './menu-items';
import { WebSiteLinks } from './select-link-website/menu-items';
import SelectLink from './select-link-website/select-link';
import MenuTheme from '../menu-navigation/menu-theme/menu-theme';
import MenuUserOptions from '../menu-navigation/menu-user/menu-user';
import ThemeSwitcherButton from '../button/switch-button/switch-buttom';
import lightTheme from '../../../../styles/theme/light';
import { useIsAdmin } from '../../../core/hooks/useIsAdmin';
import { UserDTO } from '../../../core/models/dto/auth.dto';

interface Props {
  links: WebSiteLinks[];
}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const Header = ({ links }: Props) => {
  const router = useRouter();

  const { themeMode, toggleTheme, isLight } = useThemeContext();
  const { authToken, user, clearCredentials } = useAuthContext();

  const isAdmin = useIsAdmin(user || ({} as UserDTO));

  const handleOnClickLogOut = () => {
    clearCredentials && clearCredentials();
  };

  const onClick = useCallback(
    (link: string) => () => {
      window.open(link, '_blank');
    },
    []
  );

  const handleGoHome = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleOnClick = useCallback(
    (link: string) => () => {
      router.push(link);
    },
    [router]
  );

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
  }, [router.pathname]);

  const onClickAccountManager = () => {
    router.push('/auth/manage#manage');
  };
  const onClickProfile = () => {
    router.push(`/auth/${isAdmin ? 'manage#profile' : 'user-profile'}/`);
  };

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
                onClick={handleOnClick(item.link)}
                active={activeMenuItem === item}
              >
                {item.title}
              </ItemMenuStyle>
            );
          })}
          <ItemMenuResponsive>
            <TopBarSelect selectedOption={activeMenuItem.title} />
          </ItemMenuResponsive>
          <RightElementsWrapper>
            {authToken ? (
              <MenuUserOptions
                isAdmin={isAdmin}
                onClickAccountManager={onClickAccountManager}
                onClickLogOut={handleOnClickLogOut}
                onClickProfile={onClickProfile}
                username={user?.username || ''}
              />
            ) : (
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
            )}
          </RightElementsWrapper>
        </Navigation>
      </LeftPart>
      <RightPart>
        {authToken ? (
          <MenuTheme themeMode={themeMode} toggleTheme={toggleTheme} />
        ) : (
          <div>
            <SelectLink
              links={links}
              themeMode={themeMode}
              fill={themeMode === 'dark' ? '#EDEFFF' : '#25273D'}
              onClick={onClick}
              responsive={true}
              toggleTheme={toggleTheme}
            />
            <WrapperIcon>
              <ThemeSwitcherButton themeMode={themeMode} toggleTheme={toggleTheme} />
            </WrapperIcon>
          </div>
        )}
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
  cursor: 'pointer',
  '@media (min-width: 834px)': {
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

const ItemMenuStyle = styled.div<{ active: boolean; marginRight?: string; isLight: boolean }>(
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
  },
});

const RightElementsWrapper = styled.div({
  display: 'flex',
  '@media (min-width: 834px)': {
    position: 'absolute',
    right: 16,
  },
  '@media (min-width: 1194px)': {
    right: 24,
  },
});

const LogoLinksWrapper = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
});

const WrapperIcon = styled.div({
  display: 'flex',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    display: 'none',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    display: 'none',
  },
});

export default Header;
