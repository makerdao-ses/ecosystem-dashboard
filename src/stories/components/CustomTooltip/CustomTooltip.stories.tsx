import styled from '@emotion/styled';
import React from 'react';
import CustomTooltip from './CustomTooltip';
import type { ComponentMeta, ComponentStory } from '@storybook/react';

const ALIGNMENTS = [
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

export default {
  title: 'Components/CustomTooltip',
  component: CustomTooltip,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    placement: {
      control: {
        type: 'select',
        options: ALIGNMENTS,
      },
    },
  },
} as ComponentMeta<typeof CustomTooltip>;

const getCustomBtnTemplate: (btnText?: string) => ComponentStory<typeof CustomTooltip> =
  (btnText = 'Hover me') =>
  ({ ...args }) =>
    (
      <CustomTooltip {...args} content={<TooltipContent>Custom content here.</TooltipContent>}>
        <button>{btnText}</button>
      </CustomTooltip>
    );

const VariablePlacementTemplate: ComponentStory<typeof CustomTooltip> = ({ placement, ...args }) => (
  <CenteredContent>
    <CustomTooltip
      placement={placement}
      {...args}
      disableInteractive
      content={
        <TooltipContent>
          Custom content here.
          <br />
          Meant to be used as a tooltip.
        </TooltipContent>
      }
    >
      <FixedWidthButton>{placement as string}</FixedWidthButton>
    </CustomTooltip>
  </CenteredContent>
);

export const Default = getCustomBtnTemplate().bind({});
Default.args = {
  arrow: true,
};

export const OpenOnClick = getCustomBtnTemplate('Click me').bind({});
OpenOnClick.args = {
  enableClickListener: true,
};

export const VariablePlacement = VariablePlacementTemplate.bind({});
VariablePlacement.args = {
  placement: 'top',
  open: true,
};

const TooltipContent = styled.div(() => ({
  border: '2px solid #000000',
  padding: '10px',
  backgroundColor: 'white',
  color: 'black',
}));

const CenteredContent = styled.div(() => ({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: '8px',
  alignItems: 'center',
  width: '100%',
  height: 500,
}));

const FixedWidthButton = styled.button(() => ({
  width: 180,
  height: 30,
}));
