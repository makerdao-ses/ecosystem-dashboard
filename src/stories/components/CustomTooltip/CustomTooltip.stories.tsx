import { Box } from '@mui/material';
import React from 'react';
import CustomTooltip from './CustomPopper';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

export default {
  title: 'Components/CustomPopper',
  component: CustomTooltip,
  attributes: {
    chromatic: false,
  },
} as ComponentMeta<typeof CustomTooltip>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HoverTemplate: ComponentStory<typeof CustomTooltip> = ({ content, ...args }) => (
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
    <button>Hover me</button>
  </CustomTooltip>
);

export const Default = HoverTemplate.bind({});
Default.args = {
  arrow: true,
};
