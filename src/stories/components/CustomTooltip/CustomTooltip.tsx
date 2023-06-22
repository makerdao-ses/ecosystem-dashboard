import { Tooltip } from '@mui/material';
import merge from 'deepmerge';
import React, { useMemo } from 'react';
import type { TooltipProps } from '@mui/material';

export interface CustomTooltipProps extends Omit<TooltipProps, 'title'> {
  content: NonNullable<React.ReactNode>;
  enableClickListener?: boolean;
}

export default function CustomTooltip({ content, children, enableClickListener, ...props }: CustomTooltipProps) {
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
          style: tooltipCommonStyles,
        },
      },
      onClose: controlledOpen ? () => setControlledOpen(false) : undefined,
    }),
    [controlledOpen, enableClickListener]
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

const tooltipCommonStyles = {
  padding: 0,
  backgroundColor: 'transparent',
  color: 'text.primary',
};
