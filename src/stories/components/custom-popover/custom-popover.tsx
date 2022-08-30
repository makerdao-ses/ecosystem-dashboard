import React, { CSSProperties, useEffect, useState } from 'react';
import { Popover } from '@mui/material';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { getPopoverOpen, openPopover } from './custom-popover.slice';
import { store } from '../../../core/store/store';

interface CustomPopoverProps {
  title?: JSX.Element | string;
  children: JSX.Element | JSX.Element[] | boolean;
  id: string;
  css?: CSSProperties;
  popupStyle?: CSSProperties;
  anchorOrigin?: {
    vertical: 'bottom' | 'center' | 'top',
    horizontal: 'left' | 'center' | 'right',
  };
  leaveOnChildrenMouseOut?: boolean;
}

export const PopoverPaperStyle = (isLight: boolean) => ({
  background: isLight ? 'white' : '#000A13',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #231536',
  boxShadow: isLight ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)' : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
});

export const CustomPopover = ({
  leaveOnChildrenMouseOut = false,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  }, ...props
}: CustomPopoverProps) => {
  const dispatch = useAppDispatch();
  const state = store.getState();
  const idPopoverOpenState = getPopoverOpen(state);
  const isLight = useThemeContext().themeMode === 'light';
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [leaveTimeout, setLeaveTimeout] = React.useState<NodeJS.Timeout>();
  const [openIdPopover, setOpenIdPopover] = useState('');

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setOpenIdPopover(id);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('body').onscroll = () => handlePopoverClose;
    setAnchorEl(event.currentTarget);
    document.addEventListener('visibilitychange', handleLoseFocus);
    dispatch(openPopover(props.id));
  };

  useEffect(() => {
    if (idPopoverOpenState !== props.id) {
      handlePopoverClose();
    }
  }, [idPopoverOpenState, props.id]);
  const handlePopoverClose = () => {
    setAnchorEl(null);
    setOpenIdPopover('');
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return () => document.querySelector('body').removeEventListener('onscroll', handlePopoverClose);
  }, []);
  const handleLoseFocus = () => {
    setAnchorEl(null);
    setOpenIdPopover('');
  };
  useEffect(() => {
    return () => document.removeEventListener('visibilitychange', handleLoseFocus);
  }, []);

  return <React.Fragment>
    <div
      style={props.css}
      aria-owns={props.id}
      aria-haspopup="true"
      onMouseEnter={(e) => handlePopoverOpen(e, props.id)}
      onClick={handlePopoverClose}
      onMouseLeave={() => {
        if (leaveOnChildrenMouseOut) {
          clearTimeout(leaveTimeout);
          setLeaveTimeout(setTimeout(() => handlePopoverClose(), 400));
        } else {
          handlePopoverClose();
        }
      }}>
      {props.children}
    </div>
    <Popover
      disableScrollLock
      id={props.id}
      sx={{
        pointerEvents: 'none',
      }}
      open={openIdPopover === props.id}
      anchorEl={anchorEl}
      anchorOrigin={anchorOrigin}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
      PaperProps={{
        style: PopoverPaperStyle(isLight),
      }}
    >
      <Container
        onMouseOver={() => leaveOnChildrenMouseOut && clearTimeout(leaveTimeout)}
        onMouseLeave={() => leaveOnChildrenMouseOut && handlePopoverClose()}
        style={{
          borderRadius: '6px',
          pointerEvents: 'all',
          ...props.popupStyle
        }}
      >{props.title}</Container>
    </Popover>
  </React.Fragment>;
};

const Container = styled.div({
  fontSize: '14px',
  padding: '16px',
  fontFamily: 'FT Base, sans-serif',
});
