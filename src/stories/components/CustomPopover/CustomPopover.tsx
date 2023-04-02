import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import { getPageWrapper } from '@ses/core/utils/dom';

import isEqual from 'lodash/isEqual';
import React, { useCallback, useReducer, useRef } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { PopoverOrigin } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import type { PopoverPaperType, WithIsLight } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';
type ArrowPosition = 'up' | 'down';
type PopoverActions = {
  type: ArrowPosition;
  payload: HTMLElement | null;
};

interface PopoverPositionState {
  anchorEl: HTMLElement | null;
  popoverPosition: PopoverOrigin;
}

const InitialState = {
  anchorEl: null,
  popoverPosition: {
    vertical: 'bottom',
    horizontal: 'left',
  },
} as PopoverPositionState;

const updateStatePositionPopoverReducer = (
  state: PopoverPositionState,
  action: PopoverActions
): PopoverPositionState => {
  const { type, payload } = action;
  switch (type) {
    case 'up':
      return {
        ...state,
        anchorEl: payload,
        popoverPosition: {
          vertical: 'top',
          horizontal: 'left',
        },
      };
    case 'down':
      return {
        ...state,
        anchorEl: payload,

        popoverPosition: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      };
    default:
      return state;
  }
};

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
  const [state, dispatch] = useReducer(updateStatePositionPopoverReducer, InitialState);
  const { isLight } = useThemeContext();
  const refPopoverComponent = useRef<HTMLDivElement>(null);
  const [leaveTimeout, setLeaveTimeout] = React.useState<NodeJS.Timeout>();
  const isArrowPositionUp = isEqual(state.popoverPosition, ArrowUp);
  const handlePopoverClose = useCallback(() => {
    dispatch({
      type: 'down',
      payload: null,
    });

    const wrapper = getPageWrapper();
    if (wrapper) {
      wrapper.removeEventListener('onscroll', handlePopoverClose);
    }
  }, []);

  const handlePopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      clearTimeout(leaveTimeout);

      let arrowPosition = 'up' as ArrowPosition;
      if (refElementShowPopover) {
        const elementPosition = refElementShowPopover?.current?.getBoundingClientRect().top;
        const windowPosition = window.innerHeight;
        console.log('heightComponentPopover', windowPosition - (elementPosition || 0));
        const distance = windowPosition - (elementPosition || 0);
        if (distance < 350) {
          arrowPosition = 'down';
        }
      }
      const wrapper = getPageWrapper();
      if (wrapper) {
        wrapper.onscroll = handlePopoverClose;
      }
      dispatch({
        type: arrowPosition,
        payload: event.currentTarget,
      });
      handleShowPopoverWhenNotSpace?.(arrowPosition === 'up');
    },
    [leaveTimeout, handleShowPopoverWhenNotSpace, refElementShowPopover, handlePopoverClose]
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
        open={Boolean(state.anchorEl)}
        anchorEl={state.anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={state.popoverPosition}
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
          <ContainerTriangle
            alignArrow={alignArrow}
            isLight={isLight}
            arrowPosition={isArrowPositionUp ? 'up' : 'down'}
          />
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
