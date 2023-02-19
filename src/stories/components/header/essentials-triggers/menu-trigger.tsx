import styled from '@emotion/styled';
import { IconButton, Menu } from '@mui/material';
import ArrowSelect from '@ses/components/svg/arrow-select';
import ArrowSelectUp from '@ses/components/svg/arrow-select-up';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React, { useState } from 'react';
import EssentialWebsites from '../essential-websites/essential-websites';

const EssentialWebsitesMenuTrigger: React.FC = () => {
  const { isLight } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const background = isLight ? (open ? '#B6EDE7' : '#ECF1F3') : '#31424E';

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <ContainerIcon background={background}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleOpen}
        >
          {open ? <ArrowSelectUp fill={'#1AAB9B'} /> : <ArrowSelect fill={isLight ? '#25273D' : '#EDEFFF'} />}
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
        <EssentialWebsites wrapItemsWithMenu={true} />
      </Menu>
    </div>
  );
};

export default EssentialWebsitesMenuTrigger;

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
