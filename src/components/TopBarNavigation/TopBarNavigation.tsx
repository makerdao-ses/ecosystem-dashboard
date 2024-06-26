import { styled, useTheme } from '@mui/material';
import Link from 'next/link';
import Activity from 'public/assets/svg/activity.svg';
import ThemeLight from 'public/assets/svg/light_mode.svg';
import Login from 'public/assets/svg/login.svg';
import Makerdao from 'public/assets/svg/makerdao.svg';
import LogoText from 'public/assets/svg/makerdao_text.svg';
import ThemeDark from 'public/assets/svg/theme.svg';
import React from 'react';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import PrimaryButton from '@/components/PrimaryButton/PrimaryButton';
import { siteRoutes } from '@/config/routes';
import { zIndexEnum } from '@/core/enums/zIndexEnum';
import LinkNavBar from './LinkNavBar';
import MenuUserOptions from './MenuUser/MenuUserOptions';
import { useTopBarNavigation } from './useTopBarNavigation';
import type { Theme } from '@mui/material';
import type { FC } from 'react';

interface Props {
  className?: string;
}

const TopBarNavigation: FC<Props> = ({ className }) => {
  const {
    filter,
    isLight,
    toggleTheme,
    activeItem,
    menuItems,
    handleGoLogin,
    handleChangeRoute,
    handleOnClickLogOut,
    permissionManager,
  } = useTopBarNavigation();
  const theme = useTheme();

  return (
    <ContainerWrapper>
      <Container>
        <NavContainer aria-label="Primary Navigation" className={className}>
          <LeftSection>
            <LogoContainerMobile>
              <Makerdao />
            </LogoContainerMobile>
            <LogoContainerDesk>
              <LogoText />
            </LogoContainerDesk>
            <SelectContainer>
              <StyledCustomSelect
                multiple={false}
                notShowDescription={false}
                label={activeItem}
                onChange={(value: string | string[]) => handleChangeRoute(value)}
                options={filter}
                selected={activeItem}
                className="custom-select"
                style={{
                  menuWidth: 263,
                  width: 'fit-content',
                }}
                menuProps={{ ...StyledMenuProps(theme) }}
              />
            </SelectContainer>
          </LeftSection>
          <CenterLinks>
            {Object.values(menuItems).map((link) => (
              <LinkNavBar href={link.link} label={link.title} selected={activeItem} />
            ))}
          </CenterLinks>
          <RightSection>
            {permissionManager.isAuthenticated() ? (
              <MenuUserOptions
                isAdmin={permissionManager.isAdmin()}
                onClickLogOut={handleOnClickLogOut}
                username={permissionManager.loggedUser?.username ?? ''}
                hrefAccountManager={siteRoutes.manageAccounts}
                hrefProfile={permissionManager.isAdmin() ? siteRoutes.adminProfile : siteRoutes.userProfile}
              />
            ) : (
              <>
                <LoginContainer>
                  <StyledButton title="Log in" onClick={handleGoLogin} />
                </LoginContainer>
                <ContainerLogin width={16} height={20}>
                  <ContainerIconLogin href={siteRoutes.login}>
                    <Login />
                  </ContainerIconLogin>
                </ContainerLogin>
              </>
            )}

            <ContainerActivity width={20} height={20}>
              <Link href={siteRoutes.globalActivityFeed}>
                <Activity />
              </Link>
            </ContainerActivity>
            <IconContainer width={20} height={20} onClick={toggleTheme}>
              {isLight ? <ThemeDark /> : <ThemeLight />}
            </IconContainer>
          </RightSection>
        </NavContainer>
      </Container>
    </ContainerWrapper>
  );
};

export default TopBarNavigation;

const ContainerWrapper = styled('div')(({ theme }) => ({
  position: 'fixed',
  display: 'flex',
  flex: 1,
  top: 0,
  width: '100%',

  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.background.dm,

  [theme.breakpoints.up('tablet_768')]: {
    paddingTop: 6,
    paddingBottom: 8,
  },

  zIndex: zIndexEnum.HEADER_PAGE,
}));
const Container = styled('nav')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.isLight ? 'rgba(243, 245, 247, 0.5)' : 'rgba(32, 39, 47, 0.5)',
  borderRadius: 24,
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    padding: 10,
    marginLeft: 22,
    marginRight: 22,
    width: 724,
    flex: 1,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    minWidth: 980,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 30,
    marginRight: 30,
    minWidth: 1220,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: 54,
    marginRight: 54,
    minWidth: 1332,
  },
  [theme.breakpoints.up('desktop_1920')]: {
    minWidth: 1876,
    maxWidth: 1876,

    margin: '0 auto',
  },
}));
const NavContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  backgroundColor: theme.palette.isLight ? '#FFFFFF' : '#1B1E24',
  boxShadow: theme.palette.isLight ? '1px 4px 15px 0px rgba(74, 88, 115, 0.15)' : '1px rgba(74, 88, 115, 0.15)',
  padding: 16,

  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  [theme.breakpoints.up('tablet_768')]: {
    borderRadius: 16,
    minHeight: 72,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    padding: '24px 32px',
    height: 72,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '24px 40px',
  },
}));

const LogoContainerMobile = styled('div')(({ theme }) => ({
  display: 'flex',
  width: 56,
  height: 29,

  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[700] : theme.palette.colors.charcoal[100],
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));
const LogoContainerDesk = styled('div')(({ theme }) => ({
  display: 'none',
  width: 172,
  height: 24,
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.slate[700] : theme.palette.colors.charcoal[100],
  },
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
  },
}));

const SelectContainer = styled('div')(({ theme }) => ({
  display: 'flex',

  [theme.breakpoints.up('desktop_1024')]: {
    display: 'none',
  },
}));

const LeftSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  [theme.breakpoints.up('tablet_768')]: {
    gap: 32,
  },
}));

const RightSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  height: 32,
  marginTop: -4,
  marginRight: 2,
  [theme.breakpoints.up('tablet_768')]: {
    marginTop: 0,
    marginRight: 'revert',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    marginTop: -4,
    marginRight: 'revert',
  },
  [theme.breakpoints.up('desktop_1920')]: {
    marginTop: 0,
    marginRight: 'revert',
  },
}));

const IconContainer = styled('div')<{ width: number; height: number }>(({ theme, width, height }) => ({
  width: 32,
  height: 32,
  borderRadius: 8,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[400],
  '& svg': {
    width,
    height,
  },
  ':hover': {
    background: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.slate[300],
  },
}));

const LoginContainer = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
  },
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'none',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'flex',
  },
}));

const StyledButton = styled(PrimaryButton)({
  padding: '4px 24px',
  lineHeight: '0px',
});

const CenterLinks = styled('ul')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('desktop_1024')]: {
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
    gap: 24,
    height: 24,
    marginTop: -8,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    gap: 48,
  },
  [theme.breakpoints.up('desktop_1920')]: {
    marginTop: -2,
  },
}));

const ContainerLogin = styled(IconContainer)(({ theme }) => ({
  '& path': {
    fill: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[400],
  },
  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },

  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    display: 'flex',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    display: 'none',
  },
}));

const ContainerActivity = styled(IconContainer)(({ theme }) => ({
  display: 'none',
  '& a': {
    display: 'flex',
    flexDirection: 'row',
    alignItem: 'center',
  },
  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    '& path': {
      fill: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[400],
    },
  },
  ':hover': {
    background: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.slate[300],
  },
}));

const StyledCustomSelect = styled(CustomSelect)(() => ({
  '& .MuiPaper-root': {
    backgroundColor: 'red !important',
    padding: '16px !important',
  },
  '& .MuiMenuItem-root': {
    backgroundColor: 'yellow !important',
    color: 'blue !important',
  },
  '& .MuiMenuItem-root:hover': {
    backgroundColor: 'green !important',
  },
}));

const ContainerIconLogin = styled(Link)({
  display: 'flex',
});

const StyledMenuProps = (theme: Theme) => ({
  PaperProps: {
    sx: {
      backgroundImage: 'none',
      bgcolor: theme.palette.isLight ? '#FFF' : theme.palette.colors.charcoal[900],

      boxShadow: theme.palette.isLight ? theme.fusionShadows.chartsShadows : theme.fusionShadows.darkMode,
      '&.MuiPaper-elevation.MuiPaper-rounded': {
        borderRadius: '12px',
      },

      '& .MuiMenu-list': {
        position: 'relative',
        borderRadius: '12px',
        bgcolor: 'none',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0px 32px 32px',
        margin: 0,
        gap: '24px',
        '.MuiTypography-root': {
          fontSize: 18,
          fontFamily: 'Inter, sans-serif',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '120%',
          color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600],
        },
      },

      '& .MuiMenuItem-root': {
        minHeight: 22,
        display: 'flex',
        margin: 0,
        paddingTop: 0,
        paddingBottom: 0,
        height: '22px!important',

        marginLeft: '-6px!important',
        '&:hover': {
          bgcolor: 'none !important',
          '.MuiTypography-root': {
            fontWeight: '700 !important',
            fontSize: '18px !important',
            color: `${
              theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[600]
            } !important`,
          },
        },

        '&.Mui-selected': {
          bgcolor: 'none!important',

          '&:hover': {
            bgcolor: 'none!important',
            '.MuiTypography-root': {
              color: `${
                theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[50]
              } !important`,
              fontSize: '18px!important',
              fontWeight: '700 !important',
            },
          },
          '.MuiTypography-root': {
            color: `${
              theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.gray[50]
            } !important`,
            fontSize: '18px!important',
            fontWeight: '700 !important',
          },
        },
      },
    },
  },
});
