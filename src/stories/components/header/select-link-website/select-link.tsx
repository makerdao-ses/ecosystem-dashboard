import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { CustomButton } from '@ses/components/custom-button/custom-button';
import { CustomLink } from '@ses/components/custom-link/custom-link';
import { HOW_TO_SUBMIT_EXPENSES } from '@ses/core/utils/const';
import React, { useEffect, useMemo, useState } from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import ArrowSelect from '../../svg/arrow-select';
import ArrowSelectUp from '../../svg/arrow-select-up';
import { Close } from '../../svg/close';
import MoonMode from '../../svg/theme-mode';
import { ThreeDots } from '../../svg/three-dots';
import ToggleDarkMode from '../../svg/toggle-dark';
import ItemWebSite from './item-select/item-website';
import type { ThemeMode } from '../../../../core/context/ThemeContext';
import type { WebSiteLinks } from './menu-items';

interface Props {
  links: WebSiteLinks[] | [];
  fill?: string;
  themeMode: ThemeMode;
  responsive?: boolean;
  toggleTheme: () => void;
  popupDefault?: boolean;
}

const SelectLink: React.FC<Props> = ({
  links,
  fill = '',
  themeMode,
  responsive = false,
  toggleTheme,
  popupDefault = false,
}) => {
  const { isLight } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [popup, setPopup] = useState(popupDefault);
  const togglePopup = () => setPopup(!popup);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = popup ? 'hidden' : 'auto';
    }
  }, [popup]);

  const background = useMemo(
    () =>
      themeMode === 'light' && open
        ? '#B6EDE7'
        : themeMode === 'light' && !open
        ? '#ECF1F3'
        : themeMode === 'dark' && open
        ? '#31424E'
        : '#31424E',
    [themeMode, open]
  );

  return (
    <div>
      <ContainerIcon style={{ display: responsive ? 'none' : 'block' }} background={background}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {open ? <ArrowSelectUp fill={'#1AAB9B'} /> : <ArrowSelect fill={fill} />}
        </IconButton>
      </ContainerIcon>
      <Menu
        disableScrollLock={true}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiMenu-paper': {
            padding: '24px',
            maxHeight: 'calc(100% - 50px)',
            width: '545px',
            background: isLight ? '#FFFFFF' : '#000A13',
            position: 'absolute',
            boxShadow: isLight
              ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
              : 'none',
          },
          '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
            borderRadius: '22px',
            border: 'none',
            marginTop: '50px',
          },
          '& .MuiMenu-list': {
            paddingTop: '0px',
            paddingBottom: '0px',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        anchorReference="none"
      >
        <StyleTitle isLight={isLight}>Essential MakerDAO Governance Websites </StyleTitle>
        <StyleDescription isLight={isLight}>
          Websites to gather all relevant data and information for Maker Governance.
        </StyleDescription>
        {links?.map((link: WebSiteLinks, i: number) => (
          <MenuItem
            disableGutters={true}
            disableTouchRipple={true}
            sx={{
              paddingTop: '0px',
              '&:hover': {
                background: 'none',
                cursor: 'default',
              },
              '&:last-child': {
                paddingBottom: '0px',
              },
            }}
            key={`key-${i}`}
          >
            <ItemWebSite
              height={link.height}
              title={link.title || ''}
              logo={link.logo}
              background={link.background}
              color={link.color}
              fontSize={link.fontSize}
              fontWeight={link.fontWeight}
              link={link.link}
              fontFamily={link.fontFamily}
              padding={link.padding}
              subtract={link.subtract}
              description={link.description}
              letterSpacing={link.letterSpacing}
              lineHeight={link.lineHeight}
              colorDark={link.colorDark}
            />
          </MenuItem>
        ))}
      </Menu>
      <ThreeDotsButton isLight={isLight} onClick={togglePopup}>
        {<ThreeDots fill="#231536" fillDark="#EDEFFF" />}
      </ThreeDotsButton>
      {popup && (
        <Container isLight={isLight}>
          <ContainerInside>
            <CloseWrapper>
              <Close onClick={togglePopup} />
            </CloseWrapper>
            <CustomButton
              onClick={toggleTheme}
              style={{
                padding: '8px 18px 8px 24px',
                marginBottom: 32,
              }}
              styleText={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '18px',
                color: isLight ? '#31424E' : '#E2D8EE',

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                '& span': {
                  marginRight: 10,
                },
              }}
              label={
                <>
                  <DarkModeText isLight={isLight}>{isLight ? 'Dark Mode' : 'Light Mode'}</DarkModeText>
                  {isLight ? <MoonMode width={16} height={16} /> : <ToggleDarkMode width={16} height={16} />}
                </>
              }
            />
            <CustomButton
              onClick={toggleTheme}
              style={{
                padding: '7px 24px',
              }}
              styleText={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                fontWeight: 500,
                lineHeight: '18px',
                color: isLight ? '#31424E' : '#E2D8EE',

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                '& span': {
                  marginRight: 10,
                },
              }}
              label={
                <CustomLink
                  children="How to Submit Expenses"
                  fontWeight={500}
                  fontSize={16}
                  href={HOW_TO_SUBMIT_EXPENSES}
                  style={{
                    fontFamily: 'Inter, sans serif',
                    color: '#447AFB',
                    fontStyle: 'normal',
                    marginLeft: '0px',
                    fontSize: 16,
                    fontWeight: 500,
                    lineHeight: '18px',
                  }}
                  withArrow
                  iconHeight={10}
                  iconWidth={10}
                />
              }
            />

            <Line isLight={isLight} />
            <StyleTitle isLight={isLight}>Essential MakerDAO Governance Websites </StyleTitle>
            <StyleDescription isLight={isLight}>
              Websites to gather all relevant data and information for Maker Governance.
            </StyleDescription>
            {links.map((link: WebSiteLinks, i: number) => (
              <ItemWebSite
                key={`link-${i}`}
                height={link.height}
                title={link.title || ''}
                logo={link.logo}
                background={link.background}
                color={link.color}
                fontSize={link.fontSize}
                fontWeight={link.fontWeight}
                link={link.link}
                fontFamily={link.fontFamily}
                padding={link.padding}
                subtract={link.subtract}
                description={link.description}
                letterSpacing={link.letterSpacing}
                lineHeight={link.lineHeight}
                colorDark={link.colorDark}
              />
            ))}
          </ContainerInside>
        </Container>
      )}
    </div>
  );
};

export default SelectLink;

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  width: '100%',
  margin: '32px 0 24px',
  borderBottom: isLight ? ' 1px solid #D4D9E1' : '1px solid #405361',
}));

const DarkModeText = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  marginRight: '2px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#31424E' : '#D2D4EF',
}));

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: isLight ? 'white' : '#000A13',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflowY: 'auto',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

const ContainerInside = styled.div({
  paddingTop: '22px',
  paddingBottom: '16px',
  paddingLeft: '22px',
  paddingRight: '22px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const ContainerIcon = styled.div<{ background: string }>(({ background }) => ({
  display: 'none',
  width: 26,
  height: 26,
  marginLeft: '16px',
  borderRadius: '6px',
  background: background || '#ECF1F3',
  '@media (min-width: 834px)': {
    display: 'block',
  },
}));

const StyleTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '24px',
    lineHeight: '29px',
    letterSpacing: '0.4px',
    color: isLight ? '#231536' : '#EDEFFF',
    paddingBottom: '16px',
  })
);

const StyleDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '17px',
    color: isLight ? '#231536' : '#EDEFFF',
    paddingBottom: '24px',
    letterSpacing: '0px',
  })
);

const ThreeDotsButton = styled.button<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  background: isLight ? 'white' : 'transparent',
  boxSizing: 'border-box',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #31424E;',
  borderRadius: '50%',
  cursor: 'pointer',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

const CloseWrapper = styled.div({
  alignSelf: 'flex-end',
  marginBottom: '22px',
  cursor: 'pointer',
});
