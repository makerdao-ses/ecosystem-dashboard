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
      defaultValue: 'bottom-start',
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
          Tooltip placed at {placement}.
        </TooltipContent>
      }
    >
      <FixedWidthButton>{placement as string}</FixedWidthButton>
    </CustomTooltip>
  </CenteredContent>
);

const BoundariesTemplate: ComponentStory<typeof CustomTooltip> = ({ placement, ...args }) => (
  <OverflownContainer
    ref={(node: HTMLElement | null) => {
      if (node) {
        node.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }}
  >
    <CustomTooltip
      open
      placement={placement}
      {...args}
      content={
        <TooltipContent>
          Custom content here.
          <br />
          Tooltip placed at {placement}.
        </TooltipContent>
      }
    >
      <button>{placement}</button>
    </CustomTooltip>
  </OverflownContainer>
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

export const Boundaries = BoundariesTemplate.bind({});
BoundariesTemplate.args = {
  placement: 'bottom-start',
};

export const DelayedClose = getCustomBtnTemplate('Closes in 2s').bind({});
DelayedClose.args = {
  leaveDelay: 2000,
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

const OverflownContainer = styled.div(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '200vw',
  minHeight: '200vh',
}));

const FixedWidthButton = styled.button(() => ({
  width: 180,
  height: 30,
}));
