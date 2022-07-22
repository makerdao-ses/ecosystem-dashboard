import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { ThemeMode } from '../../../../core/context/ThemeContext';
import ArrowSelect from '../../svg/arrow-select';
import ArrowSelectUp from '../../svg/arrow-select-up';
import ItemWebSite from './item-select/item-website';
import { WebSiteLinks } from './menu-items';
import { ThreeDots } from '../../svg/three-dots';
import { Close } from '../../svg/close';
import ThemeSwitcherButton from '../../button/switch-button/switch-buttom';
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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [popup, setPopup] = useState(false);

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
        >{open ? <ArrowSelectUp fill={'#6EDBD0'} /> : <ArrowSelect fill={fill} />}</IconButton></ContainerIcon>
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
              background: '#FFFFFF',
              position: 'absolute',
              boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
            },
            '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
              borderRadius: '22px',
            },
            '& .MuiMenu-list': {
              paddingTop: '0px',
              paddingBottom: '0px',
            },
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <StyleTitle>Essential MakerDAO Governance Websites </StyleTitle>
          <StyleDescription >Websites to gather all relevant data and information for Maker Governance.</StyleDescription>
          {links.map((link: WebSiteLinks) => {
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
              }} key={link.id}>
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
              />
            </MenuItem >;
          })}
        </Menu>
        <ThreeDotsButton
          onClick={() => setPopup(!popup)}
        >
          <ThreeDots/>
        </ThreeDotsButton>
      {popup && <Container>
        <Close
            onClick={() => setPopup(false)}
            style={{
              alignSelf: 'flex-end',
              marginBottom: '22px'
            }}
        />
        <div onClick={toggleTheme}>
            <DarkModeText>Dark Mode</DarkModeText>
            <IconButton>
              {themeMode === 'light' ? <MoonMode width={16} height={16} /> : <ToggleDarkMode width={16} height={16} />}
            </IconButton>
        </div>

        <Line />

        {links.map((link: WebSiteLinks) => <ItemWebSite
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
          />)}
      </Container>}
    </div>
  );
};

const Line = styled.div({
  fontFamily: 'SF Pro Text',
  height: '1px',
  width: '100%',
  background: '#D4D9E1',
  margin: '18px 0 32px',
});

const DarkModeText = styled.span({
  marginRight: '2px',
  fontSize: '14px',
  color: '#31424E',
});

const Container = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '22px',
  '@media (min-width: 635px)': {
    display: 'none'
  }
});

const ContainerIcon = styled.div<{ background: string }>((props) => ({
  display: 'none',
  width: 26,
  height: 26,
  marginLeft: '16px',
  borderRadius: '6px',
  background: props.background || '#ECF1F3',
  '@media (min-width: 635px)': {
    display: 'block'
  }
}));

const StyleTitle = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '24px',
  lineHeight: '29px',
  letterSpacing: '0.4px',
  color: '#231536',
  paddingBottom: '16px'
});

const StyleDescription = styled(Typography)({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19px',
  color: '#231536',
  paddingBottom: '24px',
  letterSpacing: '0px',
});

const ThreeDotsButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '35px',
  height: '35px',
  background: 'white',
  boxSizing: 'border-box',
  border: '1px solid #D4D9E1',
  borderRadius: '50%',
  '@media (min-width: 635px)': {
    display: 'none'
  }
});

export default SelectLink;
