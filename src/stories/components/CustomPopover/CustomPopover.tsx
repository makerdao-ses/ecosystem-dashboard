import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import { getPageWrapper } from '@ses/core/utils/dom';

import isEqual from 'lodash/isEqual';
import React, { useCallback, useEffect, useReducer, useRef } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { PopoverOrigin } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import type { PopoverPaperType, WithIsLight } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';
export type PositionPopoverWithArrow = 'upRight' | 'downRight' | 'downLeft' | 'upLeft' | 'none';
type ArrowPosition = 'up' | 'down';
type PopoverActions = {
  type: PositionPopoverWithArrow;
  payload: HTMLElement | null;
};

interface PopoverPositionState {
  anchorEl: HTMLElement | null;
  popoverPosition: PopoverOrigin;
  positionPopoverArrow: PositionPopoverWithArrow;
  arrowPosition: ArrowPosition;
}

const InitialState = {
  anchorEl: null,
  popoverPosition: {
    vertical: 'bottom',
    horizontal: 'left',
  },
  positionPopoverArrow: 'upRight',
} as PopoverPositionState;

const updateStatePositionPopoverReducer = (
  state: PopoverPositionState,
  action: PopoverActions
): PopoverPositionState => {
  const { type, payload } = action;
  switch (type) {
    case 'downRight':
      return {
        ...state,
        anchorEl: payload,
        popoverPosition: {
          vertical: 'top',
          horizontal: 'left',
        },
        arrowPosition: 'up',
      };
    case 'upRight':
      return {
        ...state,
        anchorEl: payload,
        popoverPosition: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        arrowPosition: 'down',
      };
    case 'downLeft':
      return {
        ...state,
        anchorEl: payload,
        popoverPosition: {
          vertical: 'top',
          horizontal: 'right',
        },
        arrowPosition: 'up',
      };
    case 'upLeft':
      return {
        ...state,
        anchorEl: payload,
        popoverPosition: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        arrowPosition: 'down',
      };
    case 'none': {
      return {
        ...state,
        anchorEl: null,
      };
    }
    default:
      return state;
  }
};

interface CustomPopoverProps extends React.PropsWithChildren {
  title?: JSX.Element | string;
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
  closeOnClick?: boolean;
  onClose?: () => void;
  handleNotSpaceRight?: (value: PositionPopoverWithArrow) => void;
  distanceBottom?: number;
  distanceRight?: number;
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

/**
 * @deprecated use `SESTooltip` instead
 */
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
  handleNotSpaceRight,
  closeOnClick = true,
  distanceBottom = 285,
  distanceRight = 305,
  onClose,
  ...props
}: CustomPopoverProps) => {
  const [state, dispatch] = useReducer(updateStatePositionPopoverReducer, InitialState);
  const { isLight } = useThemeContext();
  const refPopoverComponent = useRef<HTMLDivElement>(null);

  const [leaveTimeout, setLeaveTimeout] = React.useState<NodeJS.Timeout>();
  const isArrowPositionUp =
    isEqual(state.popoverPosition, ArrowUp) ||
    isEqual(state.popoverPosition, {
      vertical: 'top',
      horizontal: 'right',
    });
  const handlePopoverClose = useCallback(() => {
    dispatch({
      type: 'none',
      payload: null,
    });

    const wrapper = getPageWrapper();
    if (wrapper) {
      wrapper.removeEventListener('onscroll', handlePopoverClose);
    }

    onClose?.();
  }, [onClose]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        dispatch({
          type: 'none',
          payload: null,
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  const handlePopoverOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      clearTimeout(leaveTimeout);
      let positionPopoverArrow = 'downRight' as PositionPopoverWithArrow;
      let elementPositionRight;
      if (refElementShowPopover) {
        const elementPosition = refElementShowPopover?.current?.getBoundingClientRect().top;

        const position = refElementShowPopover?.current?.getBoundingClientRect().right;

        elementPositionRight = window.innerWidth - (position || 0);
        const distance = window.innerHeight - (elementPosition || 0);

        // TODO: Change hard code to real height of Popover
        if (distance < distanceBottom && elementPositionRight > distanceRight) {
          positionPopoverArrow = 'upRight';
        }
        if (distance < distanceBottom && elementPositionRight < distanceRight) {
          positionPopoverArrow = 'upLeft';
        }
        if (distance > distanceBottom && elementPositionRight < distanceRight) {
          positionPopoverArrow = 'downLeft';
        }
      }
      const wrapper = getPageWrapper();
      if (wrapper) {
        wrapper.onscroll = handlePopoverClose;
      }

      dispatch({
        type: positionPopoverArrow,
        payload: event.currentTarget,
      });
      handleShowPopoverWhenNotSpace?.(positionPopoverArrow === 'downRight' || positionPopoverArrow === 'downLeft');
      handleNotSpaceRight?.(positionPopoverArrow);
    },
    [
      leaveTimeout,
      refElementShowPopover,
      handleShowPopoverWhenNotSpace,
      handleNotSpaceRight,
      distanceBottom,
      distanceRight,
      handlePopoverClose,
    ]
  );

  return (
    <React.Fragment>
      <div
        ref={refElementShowPopover}
        style={props.css}
        aria-owns={props.id}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onClick={() => closeOnClick && handlePopoverClose()}
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
      left: alignArrow === 'center' ? 135 : alignArrow === 'right' ? 275 : 35,
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
