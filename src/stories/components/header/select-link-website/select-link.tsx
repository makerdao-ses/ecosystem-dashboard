
import styled from '@emotion/styled';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
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

const SelectLink = ({ links, fill = '', onClick, background = '' }: Props) => {
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
            <ItemWebSite height={link.height} title={link.title || ''} logo={link.logo} background={link.background} color={link.color} fontSize={link.fontSize} fontWeight={link.fontWeight} link={link.link} fontFamily={link.fontFamily} padding={link.padding} subtract={link.subtract} description={link.description} onClick={onClick(link.link)} letterSpacing={link.letterSpacing} lineHeight={link.lineHeight}/>
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

export default SelectLink;
