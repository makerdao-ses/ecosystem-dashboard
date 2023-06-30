import styled from '@emotion/styled';
import React from 'react';
import CustomTooltip from './CustomTooltip';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

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
      <WideContainer>
        <CustomTooltip {...args} content={<>Custom content here.</>}>
          <button>{btnText}</button>
        </CustomTooltip>
      </WideContainer>
    );

const VariablePlacementTemplate: ComponentStory<typeof CustomTooltip> = ({ placement, ...args }) => (
  <CenteredContent>
    <CustomTooltip
      placement={placement}
      {...args}
      disableInteractive
      content={
        <>
          Custom content here.
          <br />
          Tooltip placed at {placement}.
        </>
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
        <>
          Custom content here.
          <br />
          Tooltip placed at {placement}.
        </>
      }
    >
      <button>{placement}</button>
    </CustomTooltip>
  </OverflownContainer>
);

const OnlyTooltipTemplate: ComponentStory<typeof CustomTooltip> = ({ placement, ...args }) => (
  <CenteredContent>
    {' '}
    <CustomTooltip
      placement={placement}
      {...args}
      // eslint-disable-next-line spellcheck/spell-checker
      content="Loren ipsum dolor sit amet, consectetur adipiscing elit. Nullam id purus ac nunc ultricies. Nullam id purus ac nunc ultricies."
    >
      <div
        style={{
          border: '2px solid blue',
          width: '24px',
          height: '24px',
        }}
      />
    </CustomTooltip>
  </CenteredContent>
);

export const Default = getCustomBtnTemplate().bind({});

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
Boundaries.args = {
  placement: 'bottom-start',
  arrow: true,
};

export const DelayedClose = getCustomBtnTemplate('Closes in 2s').bind({});
DelayedClose.args = {
  leaveDelay: 2000,
};

export const NonInteractive = getCustomBtnTemplate('Non-interactive').bind({});
NonInteractive.args = {
  disableInteractive: true,
};

export const WithArrow = getCustomBtnTemplate('With arrow').bind({});
WithArrow.args = {
  arrow: true,
  open: true,
};

export const OnlyTooltip = OnlyTooltipTemplate.bind({});
OnlyTooltip.args = {
  open: true,
  arrow: true,
  placement: 'bottom',
};
OnlyTooltip.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19369:217386&mode=dev',
  } as FigmaParams,
};

const WideContainer = styled.div(() => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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
