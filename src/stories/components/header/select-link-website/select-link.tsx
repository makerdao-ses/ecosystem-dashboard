import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { ThemeMode, useThemeContext } from '../../../../core/context/ThemeContext';
import ArrowSelect from '../../svg/arrow-select';
import ArrowSelectUp from '../../svg/arrow-select-up';
import ItemWebSite from './item-select/item-website';
import { WebSiteLinks } from './menu-items';
import { ThreeDots } from '../../svg/three-dots';
import { Close } from '../../svg/close';
import MoonMode from '../../svg/theme-mode';
import ToggleDarkMode from '../../svg/toggle-dark';

interface Props {
  links: WebSiteLinks[] | [];
  onClick: (link: string) => () => void;
  fill?: string;
  themeMode: ThemeMode;
  responsive?: boolean;
  toggleTheme: () => void;
}

const SelectLink = ({ links, fill = '', themeMode, onClick, responsive = false, toggleTheme }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [popup, setPopup] = useState(false);
  const togglePopup = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('body').style.overflow = popup ? 'auto' : 'hidden';
    setPopup(!popup);
  };

  const background = useMemo(() => {
    return themeMode === 'light' && open ? '#B6EDE7' : themeMode === 'light' && !open ? '#ECF1F3' : themeMode === 'dark' && open ? '#31424E' : '#31424E';
  }, [themeMode, open]);

  return (
    <div>
      <ContainerIcon style={{ display: responsive ? 'none' : 'block' }} background={background}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >{open ? <ArrowSelectUp fill={'#1AAB9B'} /> : <ArrowSelect fill={fill} />}</IconButton></ContainerIcon>
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
            minHeight: '711px',
            width: '545px',
            background: isLight ? '#FFFFFF' : '#000A13',
            position: 'absolute',
            boxShadow: isLight ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : 'none',
          },
          '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
            borderRadius: '22px',
            border: 'none',
            marginTop: '50px'
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
        anchorReference='none'
      >
        <StyleTitle isLight={isLight}>Essential MakerDAO Governance Websites </StyleTitle>
        <StyleDescription isLight={isLight}>Websites to gather all relevant data and information for Maker Governance.</StyleDescription>
        {links.map((link: WebSiteLinks, i: number) => {
          return <MenuItem
            disableGutters={true}
            disableTouchRipple={true}
            sx={{
              paddingBottom: '16px',
              paddingTop: '0px',
              '&:hover': {
                background: 'none',
                cursor: 'default'
              },
              '&:last-child': {
                paddingBottom: '0px',
              },
            }}
            key={`key-${i}`}>
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
              onClick={onClick(link.link)}
              letterSpacing={link.letterSpacing}
              lineHeight={link.lineHeight}
              colorDark={link.colorDark}
            />
          </MenuItem >;
        })}
      </Menu>
      <ThreeDotsButton isLight={isLight}
        onClick={togglePopup}
      >
        {<ThreeDots fill='#231536' fillDark='#EDEFFF' />}
      </ThreeDotsButton>
      {popup && <Container isLight={isLight}>
        <CloseWrapper>
          <Close
            onClick={togglePopup}
          />
        </CloseWrapper>
        <div onClick={toggleTheme}>
          <DarkModeText isLight={isLight}>{isLight ? 'Dark Mode' : 'Light Mode'}</DarkModeText>
          <IconButton>
            {isLight ? <MoonMode width={16} height={16} /> : <ToggleDarkMode width={16} height={16} />}
          </IconButton>
        </div>

        <Line isLight={isLight} />
        <StyleTitle isLight={isLight}>Essential MakerDAO Governance Websites </StyleTitle>
        <StyleDescription isLight={isLight}>Websites to gather all relevant data and information for Maker Governance.</StyleDescription>
        {links.map((link: WebSiteLinks, i: number) => <ItemWebSite
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
          onClick={onClick(link.link)}
          letterSpacing={link.letterSpacing}
          lineHeight={link.lineHeight}
          colorDark={link.colorDark}
        />)}
      </Container>}
    </div>
  );
};

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'SF Pro Text',
  width: '100%',
  margin: '18px 0 32px',
  border: isLight ? ' 1px solid #D4D9E1' : '1px solid #405361',
}));

const DarkModeText = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  marginRight: '2px',
  fontSize: '14px',
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
  padding: '22px',
  overflowY: 'auto',
  '@media (min-width: 635px)': {
    display: 'none'
  }
}));

const ContainerIcon = styled.div<{ background: string }>(({ background }) => ({
  display: 'none',
  width: 26,
  height: 26,
  marginLeft: '16px',
  borderRadius: '6px',
  background: background || '#ECF1F3',
  '@media (min-width: 635px)': {
    display: 'block'
  }
}));

const StyleTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  color: isLight ? '#231536' : '#EDEFFF',
  paddingBottom: '16px'
}));

const StyleDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#EDEFFF',
  paddingBottom: '24px',
  letterSpacing: '0px',
}));

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
  '@media (min-width: 635px)': {
    display: 'none'
  }
}));

const CloseWrapper = styled.div({
  alignSelf: 'flex-end',
  marginBottom: '22px',
  cursor: 'pointer',
});

export default SelectLink;
