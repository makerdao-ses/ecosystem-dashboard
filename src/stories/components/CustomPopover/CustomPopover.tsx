import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import { getPageWrapper } from '@ses/core/utils/dom';

import isEqual from 'lodash/isEqual';
import React, { useCallback, useMemo, useRef, useState } from 'react';
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
  handleShowPopoverWhenNotSpace?: (arrowPosition: boolean) => void;
  refElementShowPopover?: React.RefObject<HTMLDivElement>;
}

export const PopoverPaperStyle = (isLight: boolean) => ({
  background: isLight ? 'white' : '#000A13',
  border: isLight ? '1px solid #D4D9E1' : '1px solid #231536',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
});

const ArrowUp = {
  vertical: 'top',
  horizontal: 'left',
};

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
  refElementShowPopover,
  handleShowPopoverWhenNotSpace,
  ...props
}: CustomPopoverProps) => {
  const { isLight } = useThemeContext();
  const refPopoverComponent = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [leaveTimeout, setLeaveTimeout] = React.useState<NodeJS.Timeout>();
  const [popoverPosition, setPopoverPosition] = useState<PopoverOrigin>({
    vertical: 'top',
    horizontal: 'left',
  });

  const arrowPosition = useMemo(() => isEqual(popoverPosition, ArrowUp), [popoverPosition]);
  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);

    const wrapper = getPageWrapper();
    if (wrapper) {
      wrapper.removeEventListener('onscroll', handlePopoverClose);
    }
  }, []);

  const handlePopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      clearTimeout(leaveTimeout);
      handleShowPopoverWhenNotSpace && handleShowPopoverWhenNotSpace(arrowPosition);
      if (refElementShowPopover) {
        const heightComponentPopover = refPopoverComponent.current?.offsetHeight || 0;
        const elementPosition = refElementShowPopover?.current?.getBoundingClientRect();
        const windowPosition = window.innerHeight;
        console.log('heightComponentPopover', heightComponentPopover);
        const distance = windowPosition - (elementPosition?.top || 0);
        if (distance < 350) {
          setPopoverPosition({
            vertical: 'bottom',
            horizontal: 'left',
          });

          setAnchorEl(event.currentTarget);
        } else {
          setPopoverPosition({
            vertical: 'top',
            horizontal: 'left',
          });
          setAnchorEl(event.currentTarget);
        }
      }
      const wrapper = getPageWrapper();
      if (wrapper) {
        wrapper.onscroll = handlePopoverClose;
      }
      setAnchorEl(event.currentTarget);
    },
    [arrowPosition, handlePopoverClose, handleShowPopoverWhenNotSpace, leaveTimeout, refElementShowPopover]
  );

  return (
    <React.Fragment>
      <div
        ref={refElementShowPopover}
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
        ref={refPopoverComponent}
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
        transformOrigin={popoverPosition}
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

        {widthArrow && (
          <ContainerTriangle alignArrow={alignArrow} isLight={isLight} arrowPosition={arrowPosition ? 'up' : 'down'} />
        )}
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
      borderBottomColor: isLight ? 'white' : '#000A13',
      borderTopColor: isLight ? 'white' : '#000A13',
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
