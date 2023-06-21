import { Box } from '@mui/material';
import React from 'react';
import CustomTooltip from './CustomTooltip';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CustomTooltip',
  component: CustomTooltip,
  attributes: {
    chromatic: false,
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

export const Default = getCustomBtnTemplate().bind({});
Default.args = {
  arrow: true,
};

export const OpenOnClick = getCustomBtnTemplate('Click me').bind({});
OpenOnClick.args = {
  enableClickListener: true,
};
