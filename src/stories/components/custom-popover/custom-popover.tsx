import React, { CSSProperties } from 'react';
import { Popover } from '@mui/material';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';

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
  leaveOnChildrenMouseOut?: boolean;
}

export const CustomPopover = ({
  leaveOnChildrenMouseOut = false,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  }, ...props
}: CustomPopoverProps) => {
  const isLight = useThemeContext().themeMode === 'light';
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
      onClick={handlePopoverClose}
      onMouseLeave={() => !leaveOnChildrenMouseOut && handlePopoverClose()}>
      {props.children}
    </div>
    <Popover
      disableScrollLock
      id={props.id}
      sx={{
        pointerEvents: leaveOnChildrenMouseOut ? 'auto' : 'none',
        boxShadow: 'none',
        '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-rounded': {
          background: isLight ? 'white' : '#000A13',
          border: isLight ? '1px solid #D4D9E1' : '1px solid #231536',
          boxShadow: isLight ? 'none' : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
          borderRadius: '6px',
        }
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
      <Container
        style={{
          borderRadius: '6px',
          ...props.popupStyle
        }

        }
        onMouseLeave={() => leaveOnChildrenMouseOut && handlePopoverClose()}
      >{props.title}</Container>
    </Popover>
  </React.Fragment>;
};

const Container = styled.div({
  fontSize: '14px',
  padding: '16px',
  fontFamily: 'FT Base, sans-serif',
});
