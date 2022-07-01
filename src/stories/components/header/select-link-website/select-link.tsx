
import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import ArrowSelect from '../../svg/arrow-select';
import ItemWebSite from './item-select/item-website';
import { WebSiteLinks } from './menu-items';

interface Props {
  links: WebSiteLinks[] | [];
  onClick: (link: string) => () => void;
  fill?: string;
  background?: string
}

const SelectLink = ({ links, onClick, fill = '', background = '' }: Props) => {
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
      <ContainerIcon background={background}>
        <IconButton
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        ><ArrowSelect fill={fill} /></IconButton></ContainerIcon>
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
            marginTop: '20px',
            paddingLeft: '16px',
            paddingRight: '16px',
            height: '335px',
            width: '257px',
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
            onClick={onClick(link.link)}
            disableGutters={true}
            sx={{
              padding: '16px',
              '&:hover': {
                background: '#ECF1F3',
                borderRadius: '22px',
              },
              marginBottom: '9.15px',
              '&:last-child': {
                marginBottom: '0px',
              }
            }} key={link.id}>
            <ItemWebSite title={link.title || ''} logo={link.logo} background={link.background} color={link.color} fontSize={link.fontSize} fontWeight={link.fontWeight} link={link.link} fontFamily={link.fontFamily} padding={link.padding} subtract={link.subtract} />
          </MenuItem >;
        })}
      </Menu>
    </div >
  );
};

const ContainerIcon = styled.div<{ background: string }>((props) => ({
  width: 26,
  height: 26,
  marginLeft: '16px',
  borderRadius: '6px',
  background: props.background || '#ECF1F3',
}));

export default SelectLink;
