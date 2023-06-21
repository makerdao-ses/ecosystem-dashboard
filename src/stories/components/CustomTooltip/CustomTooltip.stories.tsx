import { Box } from '@mui/material';
import React from 'react';
import CustomTooltip from './CustomTooltip';
import type { CustomTooltipProps } from './CustomTooltip';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CustomTooltip',
  component: CustomTooltip,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
} as ComponentMeta<typeof CustomTooltip>;

const getCustomBtnTemplate: (btnText?: string) => ComponentStory<typeof CustomTooltip> =
  (btnText = 'Hover me') =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ content, ...args }) =>
    (
      <CustomTooltip
        content={
          <Box
            sx={{
              border: 1,
              p: 1,
              bgcolor: 'background.paper',
              color: 'text.primary',
            }}
          >
            Custom content here.
          </Box>
        }
        {...args}
      >
        <button>{btnText}</button>
      </CustomTooltip>
    );

const alignments = [
  'top-start',
  'top',
  'top-end',
  'left-start',
  'left',
  'left-end',
  'right-start',
  'right',
  'right-end',
  'bottom-start',
  'bottom',
  'bottom-end',
];

const MultipleAlignmentsTemplate: ComponentStory<typeof CustomTooltip> = () => (
  <Box
    sx={{
      p: 5,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      gap: 1,
      alignItems: 'center',
      width: '100%',
      height: '100%',
    }}
  >
    {alignments.map((customPlacement) => (
      <CustomTooltip
        key={customPlacement}
        content={
          <>
            Custom content here.
            <br />
            Meant to be used as a tooltip.
          </>
        }
        placement={customPlacement as CustomTooltipProps['placement']}
        componentsProps={{
          tooltip: {
            sx: {
              p: 1,
              bgcolor: 'background.paper',
              boxShadow: 1,
            },
          },
        }}
        disableInteractive
      >
        <button
          style={{
            width: 180,
            height: 30,
          }}
        >
          {customPlacement}
        </button>
      </CustomTooltip>
    ))}
  </Box>
);

export const Default = getCustomBtnTemplate().bind({});
Default.args = {
  arrow: true,
};

export const OpenOnClick = getCustomBtnTemplate('Click me').bind({});
OpenOnClick.args = {
  enableClickListener: true,
};

export const MultipleAlignments = MultipleAlignmentsTemplate.bind({});
