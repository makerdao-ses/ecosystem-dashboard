import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import { getPageWrapper } from '@ses/core/utils/dom';

import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { PopoverOrigin } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import type { PopoverPaperType, WithIsLight } from '@ses/core/utils/typesHelpers';

import type { CSSProperties } from 'react';

type ArrowPosition = 'up' | 'down';
interface CustomPopoverProps {
  title?: JSX.Element | string;
  children: JSX.Element | JSX.Element[] | boolean;
  id: string;
  css?: CSSProperties;
  popupStyle?: CSSProperties;
  anchorOrigin?: {
    vertical: 'bottom' | 'center' | 'top';
    horizontal: 'left' | 'center' | 'right';
  };
  leaveOnChildrenMouseOut?: boolean;
  popoverStyle?: PopoverPaperType;
  sxProps?: SxProps;
  widthArrow?: boolean;
  alignArrow?: 'center' | 'right';
  className?: string;
  transformOrigin?: PopoverOrigin;
  arrowPosition?: ArrowPosition;
  handleShowPopoverWhenNotSpace?: () => void;
}

export const PopoverPaperStyle = (isLight: boolean) => ({
  background: isLight ? 'white' : '#000A13',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #231536',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
});

export const CustomPopover = ({
  leaveOnChildrenMouseOut = false,
  popoverStyle,
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  },
  widthArrow,
  alignArrow,
  className,
  transformOrigin = {
    vertical: 'top',
    horizontal: 'left',
  },
  arrowPosition = 'up',
  ...props
}: CustomPopoverProps) => {
  const { isLight } = useThemeContext();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [leaveTimeout, setLeaveTimeout] = React.useState<NodeJS.Timeout>();
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    const wrapper = getPageWrapper();
    if (wrapper) {
      wrapper.onscroll = handlePopoverClose;
    }
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);

    const wrapper = getPageWrapper();
    if (wrapper) {
      wrapper.removeEventListener('onscroll', handlePopoverClose);
    }
  };

  return (
    <React.Fragment>
      <div
        style={props.css}
        aria-owns={props.id}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onClick={handlePopoverClose}
        onMouseLeave={() => {
          if (leaveOnChildrenMouseOut) {
            clearTimeout(leaveTimeout);
            setLeaveTimeout(setTimeout(() => handlePopoverClose(), 400));
          } else {
            handlePopoverClose();
          }
        }}
      >
        {props.children}
      </div>
      <Popover
        className={className}
        disableScrollLock
        id={props.id}
        sx={{
          pointerEvents: 'none',
          ...props.sxProps,
        }}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={handlePopoverClose}
        disableRestoreFocus
        PaperProps={{
          style: popoverStyle || PopoverPaperStyle(isLight),
        }}
      >
        <Container
          onMouseOver={() => leaveOnChildrenMouseOut && clearTimeout(leaveTimeout)}
          onMouseLeave={() => leaveOnChildrenMouseOut && handlePopoverClose()}
          style={{
            borderRadius: '6px',
            pointerEvents: 'all',
            ...props.popupStyle,
          }}
        >
          {props.title}
        </Container>

        {widthArrow && <ContainerTriangle alignArrow={alignArrow} isLight={isLight} arrowPosition={arrowPosition} />}
      </Popover>
    </React.Fragment>
  );
};

const Container = styled.div({
  fontSize: '14px',
  padding: '16px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
});

const ContainerTriangle = styled.div<WithIsLight & { alignArrow?: 'center' | 'right'; arrowPosition: ArrowPosition }>(
  ({ alignArrow = undefined, isLight, arrowPosition }) => ({
    backgroundColor: isLight ? 'white' : '#000A13',
    borderRadius: '6px',
    '&:after , &:before': {
      content: '""',
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      left: alignArrow === 'center' ? 135 : alignArrow === 'right' ? 257 : 35,
      borderColor: 'transparent',
      borderWidth: arrowPosition === 'up' ? '0px 8px  16px  8px' : '16px 8px  0px  8px',
      borderBottomColor: arrowPosition === 'down' ? (isLight ? 'white' : '#000A13') : 'white',
      borderTopColor: arrowPosition === 'up' ? (isLight ? 'white' : '#000A13') : 'white',
      top: arrowPosition === 'up' ? -14 : undefined,
      bottom: arrowPosition === 'down' ? -14 : undefined,
    },
    ':before': {
      top: arrowPosition === 'up' ? -16 : undefined,
      bottom: arrowPosition === 'down' ? -16 : undefined,
      borderBottomColor: arrowPosition === 'up' ? (isLight ? '#D4D9E1' : '#231536') : 'white',

      borderTopColor: arrowPosition === 'down' ? (isLight ? '#D4D9E1' : '#231536') : 'white',
    },
  })
);
