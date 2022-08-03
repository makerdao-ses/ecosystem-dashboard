import React, { CSSProperties } from 'react';
import { Popover } from '@mui/material';
import styled from '@emotion/styled';

interface CustomPopoverProps {
  title: JSX.Element | string;
  children: JSX.Element | JSX.Element[] | boolean;
  id: string;
  css?: CSSProperties;
  popupStyle?: CSSProperties;
  anchorOrigin?: {
    vertical: 'bottom' | 'center' | 'top',
    horizontal: 'left' | 'center' | 'right',
  };
}

export const CustomPopover = ({
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  }, ...props
}: CustomPopoverProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return <React.Fragment>
    <div
      style={props.css}
      aria-owns={props.id}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}>
      {props.children}
    </div>
    <Popover
      disableScrollLock
      id={props.id}
      sx={{
        pointerEvents: 'none',
        border: '1px solid #D4D9E1',
        boxShadow: 'none'
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
    >
      <Container style={props.popupStyle}>{props.title}</Container>
    </Popover>
  </React.Fragment>;
};

const Container = styled.div({
  fontSize: '14px',
  padding: '16px',
  fontFamily: 'FT Base, sans-serif',
});
