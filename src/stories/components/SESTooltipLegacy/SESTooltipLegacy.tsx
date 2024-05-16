import { useMediaQuery, useTheme } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import useMobileDetector from '@ses/core/hooks/useMobileDetector';
import lightTheme from '@ses/styles/theme/themes';
import classNames from 'classnames';
import merge from 'deepmerge';
import React, { useMemo } from 'react';
import ModalBottomSheet from './ModalBottomSheet';
import TooltipModalVariant from './TooltipModalVariant';
import type { Theme, TooltipProps } from '@mui/material';

export interface SESTooltipProps extends Omit<TooltipProps, 'title' | 'content'> {
  content: TooltipProps['title'];
  enableClickListener?: boolean;
  borderColor?: React.CSSProperties['color'];
  fallbackPlacements?: TooltipProps['placement'][];
  showAsModalBottomSheet?: boolean;
  showAsModal?: boolean;
}

const SESTooltipLegacy: React.FC<SESTooltipProps> = ({
  content,
  children,
  enableClickListener,
  borderColor: borderColorProp,
  className,
  fallbackPlacements,
  showAsModalBottomSheet = false,
  showAsModal = false,
  ...props
}) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const isMobileResolution = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
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
        tooltip: tooltipProps(borderColor, theme),
        arrow: arrowProps(borderColor, isLight),
      },
      onClose: controlledOpen ? () => setControlledOpen(false) : undefined,
    }),
    [
      controlledOpen,
      enableClickListener,
      className,
      props.classes?.tooltip,
      props.arrow,
      fallbackPlacements,
      borderColor,
      theme,
      isLight,
    ]
  );

  if (showAsModalBottomSheet && isMobileResolution && isMobileDevice) {
    // show modal bottom sheet instead of tooltip
    return (
      <ModalBottomSheet
        content={content}
        open={!!controlledOpen}
        handleOpen={() => setControlledOpen(true)}
        handleClose={() => setControlledOpen(undefined)}
      >
        {React.cloneElement(children as React.ReactElement, {
          onClick: () => setControlledOpen((prev) => !prev),
        })}
      </ModalBottomSheet>
    );
  }

  if (!showAsModalBottomSheet && isMobileResolution && (showAsModal || typeof content === 'string')) {
    return (
      <>
        {React.cloneElement(children as React.ReactElement, {
          onClick: () => setControlledOpen((prev) => !prev),
        })}
        <TooltipModalVariant openModal={!!controlledOpen} handleCloseModal={() => setControlledOpen(undefined)}>
          {content}
        </TooltipModalVariant>
      </>
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

export default SESTooltipLegacy;

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

const tooltipProps = (borderColor: React.CSSProperties['color'], theme: Theme) => ({
  sx: {
    display: 'flex',
    padding: '16px',
    alignItems: 'center',
    gap: 8,

    maxWidth: 362,
    color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
    borderRadius: '12px',

    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',

    background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
    boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,

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
