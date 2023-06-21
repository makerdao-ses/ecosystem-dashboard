import { Tooltip } from '@mui/material';
import merge from 'deepmerge';
import React from 'react';
import type { TooltipProps } from '@mui/material';

export interface CustomTooltipProps extends Omit<TooltipProps, 'title'> {
  content: NonNullable<React.ReactNode>;
  enableClickListener?: boolean;
}

export default function CustomTooltip({ content, children, enableClickListener, ...props }: CustomTooltipProps) {
  const [controlledOpen, setControlledOpen] = React.useState(props.open ?? enableClickListener ? false : undefined);

  const defaultProps: Partial<CustomTooltipProps> = {
    placement: 'bottom-end',
    open: controlledOpen,
    disableHoverListener: enableClickListener, // disable hover listener if click listener is enabled by default
    PopperProps: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, -5],
          },
        },
        {
          name: 'flip',
        },
      ],
    },
    componentsProps: {
      tooltip: {
        sx: {
          p: 0,
          bgcolor: 'transparent',
          boxShadow: 'none',
        },
      },
    },
  };

  if (enableClickListener) {
    defaultProps.onClose = () => setControlledOpen(false);
  }

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
