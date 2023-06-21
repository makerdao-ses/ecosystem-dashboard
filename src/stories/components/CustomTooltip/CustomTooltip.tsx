import { Tooltip } from '@mui/material';
import merge from 'deepmerge';
import React from 'react';
import type { TooltipProps } from '@mui/material';

export interface CustomTooltipProps extends Omit<TooltipProps, 'title'> {
  content: NonNullable<React.ReactNode>;
}

export default function CustomTooltip({ content, children, ...props }: CustomTooltipProps) {
  const defaultProps: Partial<CustomTooltipProps> = {
    placement: 'bottom-end',
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

  const finalProps = merge(defaultProps, props);
  console.log('.');
  return (
    <Tooltip title={content} {...finalProps}>
      {children}
    </Tooltip>
  );
}
