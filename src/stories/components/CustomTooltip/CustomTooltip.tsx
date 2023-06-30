import Tooltip from '@mui/material/Tooltip';
import merge from 'deepmerge';
import React, { useMemo } from 'react';
import type { TooltipProps } from '@mui/material';

export interface CustomTooltipProps extends Omit<TooltipProps, 'title'> {
  content: NonNullable<React.ReactNode>;
  enableClickListener?: boolean;
  borderColor?: React.CSSProperties['color'];
}

export default function CustomTooltip({
  content,
  children,
  enableClickListener,
  borderColor = '#D4D9E1',
  ...props
}: CustomTooltipProps) {
  const [controlledOpen, setControlledOpen] = React.useState(props.open ?? enableClickListener ? false : undefined);

  const defaultProps = useMemo<Partial<CustomTooltipProps>>(
    () => ({
      placement: 'bottom-end',
      open: controlledOpen,
      disableHoverListener: enableClickListener,
      PopperProps: {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: props.arrow ? [0, 0] : [0, -5],
            },
          },
        ],
      },
      componentsProps: {
        tooltip: tooltipProps(borderColor),
        arrow: arrowProps(borderColor),
      },
      onClose: controlledOpen ? () => setControlledOpen(false) : undefined,
    }),
    [controlledOpen, enableClickListener, borderColor, props.arrow]
  );

  const finalProps = merge(defaultProps, props);
  return (
    <Tooltip title={content} {...finalProps}>
      {enableClickListener
        ? React.cloneElement(children as React.ReactElement, {
            onClick: () => setControlledOpen((prev) => !prev),
          })
        : children}
    </Tooltip>
  );
}

const arrowProps = (borderColor: React.CSSProperties['color']) => ({
  // using sx to access pseudo-elements
  sx: {
    '&:before': {
      border: `1px solid ${borderColor}`,
      background: '#FFF',
      boxSizing: 'border-box',
    },
    color: '#FFF',
    fontSize: 16,
  },
});

const tooltipProps = (borderColor: React.CSSProperties['color']) => ({
  sx: {
    display: 'flex',
    padding: '8px 16px',
    alignItems: 'center',
    gap: 8,

    maxWidth: 330,
    color: 'inherit',
    borderRadius: '6px',
    border: `1px solid ${borderColor}`,
    background: '#FFF',

    '&.MuiTooltip-tooltipPlacementRight .MuiTooltip-arrow': {
      margin: '0 -1em',
      scale: '1.81 1',
    },
    '&.MuiTooltip-tooltipPlacementLeft .MuiTooltip-arrow': {
      margin: '0 -1em',
      scale: '1.81 1',
    },
    '&.MuiTooltip-tooltipPlacementTop .MuiTooltip-arrow': {
      margin: '-1em 0',
      scale: '1 1.81',
    },
    '&.MuiTooltip-tooltipPlacementBottom .MuiTooltip-arrow': {
      margin: '-1em 0',
      scale: '1 1.81',
    },
  },
});
