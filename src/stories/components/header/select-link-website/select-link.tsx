
import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import ArrowSelect from '../../svg/arrow-select';
import ItemWebSite from './item-select/item-website';
import { WebSiteLinks } from './menu-items';

interface Props {
  links: WebSiteLinks[] | [];
}

const SelectLink = ({ links }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <ContainerIcon>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        ><ArrowSelect /></IconButton></ContainerIcon>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiMenu-paper': {
            marginTop: '20px',
            paddingLeft: '16px',
            paddingRight: '16px',
            background: '#FFFFFF',
            position: 'absolute',
          },
          '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
            borderRadius: '22px',
          },
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {links.map((link: WebSiteLinks) => {
          return <MenuItem
            disableGutters={true}
            sx={{
              padding: '16px',
              '&:hover': {
                background: '#ECF1F3',
                borderRadius: '22px',
              }
            }} key={link.title}>
            <ItemWebSite title={link.title} logo={link.logo} background={link.background} color={link.color} fontSize={link.fontSize} fontWeight={link.fontWeight} link={link.link} fontFamily={link.fontFamily} />
          </MenuItem >;
        })}
      </Menu>
    </div >
  );
};

const ContainerIcon = styled.div({
  width: 26,
  height: 26,
  marginLeft: '16px',
  borderRadius: '6px',
  background: '#ECF1F3',
});

export default SelectLink;
