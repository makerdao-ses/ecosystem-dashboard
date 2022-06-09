import React, { CSSProperties } from 'react';
import { Popover, Theme } from '@mui/material';
import './custom-popover.scss';
import styled from '@emotion/styled';

interface CustomPopoverProps {
  title: JSX.Element | string,
  children: JSX.Element | JSX.Element[] | boolean,
  id: string,
  css?: CSSProperties
}

export const CustomPopover = (props: CustomPopoverProps) => {
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
    id={props.id}
    sx={{
      pointerEvents: 'none',
    }}
    open={open}
    anchorEl={anchorEl}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    onClose={handlePopoverClose}
    disableRestoreFocus
  >
    <Container>{props.title}</Container>
    </Popover>
  </React.Fragment>;
};

const Container = styled.div(({ theme }) => ({
  fontSize: '10px',
  padding: '8px',
  fontFamily: (theme as Theme).typography.fontFamily
}));
