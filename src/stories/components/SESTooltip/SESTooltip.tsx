import { useMediaQuery } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import useMobileDetector from '@ses/core/hooks/useMobileDetector';
import lightTheme from '@ses/styles/theme/light';
import classNames from 'classnames';
import merge from 'deepmerge';
import React, { useMemo } from 'react';
import ModalBottomSheet from './ModalBottomSheet';
import type { TooltipProps } from '@mui/material';

export interface SESTooltipProps extends Omit<TooltipProps, 'title' | 'content'> {
  content: TooltipProps['title'];
  enableClickListener?: boolean;
  borderColor?: React.CSSProperties['color'];
  fallbackPlacements?: TooltipProps['placement'][];
  showAsModalBottomSheet?: boolean;
}

const SESTooltip: React.FC<SESTooltipProps> = ({
  content,
  children,
  enableClickListener,
  borderColor: borderColorProp,
  className,
  fallbackPlacements,
  showAsModalBottomSheet = false,
  ...props
}) => {
  const { isLight } = useThemeContext();
  const isMobileResolution = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const isMobileDevice = !!useMobileDetector()?.mobile();
  const borderColor = borderColorProp || (isLight === false ? '#231536' : '#D4D9E1');

  const [controlledOpen, setControlledOpen] = React.useState(props.open ?? enableClickListener ? false : undefined);

  const defaultProps = useMemo<Partial<SESTooltipProps>>(
    () => ({
      placement: 'bottom-end',
      open: controlledOpen,
      disableHoverListener: enableClickListener,
      classes: {
        tooltip: classNames(className, props.classes?.tooltip),
      },
      PopperProps: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: props.arrow ? [0, -1] : [0, -5],
            },
          },
          {
            name: 'flip',
            ...(fallbackPlacements && { options: { fallbackPlacements } }),
          },
        ],
      },
      componentsProps: {
        tooltip: tooltipProps(borderColor, isLight),
        arrow: arrowProps(borderColor, isLight),
      },
      onClose: controlledOpen ? () => setControlledOpen(false) : undefined,
    }),
    [
      controlledOpen,
      enableClickListener,
      borderColor,
      props.arrow,
      isLight,
      className,
      props.classes?.tooltip,
      fallbackPlacements,
    ]
  );

  if (showAsModalBottomSheet && isMobileResolution && isMobileDevice) {
    // show modal bottom sheet instead of tooltip
    return (
      <ModalBottomSheet
        content={content}
        open={!!controlledOpen}
        handleOpen={() => setControlledOpen(true)}
        handleClose={() => setControlledOpen(false)}
      >
        {React.cloneElement(children as React.ReactElement, {
          onClick: () => setControlledOpen((prev) => !prev),
        })}
      </ModalBottomSheet>
    );
  }

  const finalProps = merge(defaultProps, props) as unknown as Omit<TooltipProps, 'title'>;
  return (
    <Tooltip title={content} {...finalProps}>
      {enableClickListener
        ? React.cloneElement(children as React.ReactElement, {
            onClick: () => setControlledOpen((prev) => !prev),
          })
        : children}
    </Tooltip>
  );
};

export default SESTooltip;

const arrowProps = (borderColor: React.CSSProperties['color'], isLight = true) => ({
  // using sx to access pseudo-elements
  sx: {
    '&:before': {
      boxSizing: 'border-box',
      border: `1px solid ${borderColor}`,
      background: isLight ? 'white' : '#000A13',
    },
    color: isLight ? 'white' : '#000A13',
    fontSize: 16,
  },
});

const tooltipProps = (borderColor: React.CSSProperties['color'], isLight = true) => ({
  sx: {
    display: 'flex',
    padding: '16px',
    alignItems: 'center',
    gap: 8,

    maxWidth: 330,
    color: isLight ? '#231536' : '#D2D4EF',
    borderRadius: '6px',
    border: `1px solid ${borderColor}`,

    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',

    background: isLight ? 'white' : '#000A13',
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',

    '&.MuiTooltip-tooltipPlacementRight .MuiTooltip-arrow': {
      margin: '0 -0.95em',
      scale: '1.81 1',
    },
    '&.MuiTooltip-tooltipPlacementLeft .MuiTooltip-arrow': {
      margin: '0 -0.95em',
      scale: '1.81 1',
    },
    '&.MuiTooltip-tooltipPlacementTop .MuiTooltip-arrow': {
      margin: '-0.95em 0',
      scale: '1 1.81',
    },
    '&.MuiTooltip-tooltipPlacementBottom .MuiTooltip-arrow': {
      margin: '-0.95em 0',
      scale: '1 1.81',
    },
  },
});
