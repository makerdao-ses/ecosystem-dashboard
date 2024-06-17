import styled from '@emotion/styled';
import { tooltipClasses } from '@mui/material/Tooltip';
import { withThemeContext } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import React from 'react';
import SESTooltip from './SESTooltip';
import type { ComponentStory, Meta } from '@storybook/react';

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

const meta: Meta<typeof SESTooltip> = {
  title: 'Fusion/Components/SESTooltip',
  component: SESTooltip,
  decorators: [withThemeContext(true, false)],
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
    arrow: {
      type: 'boolean',
      defaultValue: false,
    },
  },
};
export default meta;

const getCustomBtnTemplate: (btnText?: string) => ComponentStory<typeof SESTooltip> =
  (btnText = 'Hover me') =>
  ({ ...args }) =>
    (
      <WideContainer>
        <SESTooltip {...args} content={<>Custom content here.</>}>
          <button>{btnText}</button>
        </SESTooltip>
      </WideContainer>
    );

const VariablePlacementTemplate: ComponentStory<typeof SESTooltip> = ({ placement, ...args }) => (
  <CenteredContent>
    <SESTooltip
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
    </SESTooltip>
  </CenteredContent>
);

const BoundariesTemplate: ComponentStory<typeof SESTooltip> = ({ placement, ...args }) => (
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
    <SESTooltip
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
    </SESTooltip>
  </OverflownContainer>
);

const CustomStyledTemplate: ComponentStory<typeof SESTooltip> = ({ placement, ...args }) => (
  <CenteredContent>
    <StyledTooltip
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
    </StyledTooltip>
  </CenteredContent>
);

export const Default = getCustomBtnTemplate().bind({});

/** This variant will set the tooltip to be triggered by click and by default disables the hover trigger,
 *  which in principle can be enabled back by setting disableHoverListener to false
 * see: https://mui.com/material-ui/react-tooltip/#triggers
 */
export const OpenOnClick = getCustomBtnTemplate('Click me').bind({});
OpenOnClick.args = {
  enableClickListener: true,
};

export const VariablePlacement = VariablePlacementTemplate.bind({});
VariablePlacement.args = {
  placement: 'top',
  open: true,
};

/** Provides a playground to test the tooltip behavior when reaching the borders of it's container */
export const Boundaries = BoundariesTemplate.bind({});
Boundaries.args = {
  placement: 'bottom-start',
  arrow: true,
};

/* Waits an specified amount of time before closing the tooltip */
export const DelayedClose = getCustomBtnTemplate('Closes in 2s').bind({});
DelayedClose.args = {
  leaveDelay: 2000,
};

/** The tooltip is interactive by default which means that it will not close when the mouse
 * is over it's content. This behavior can be disabled by setting the disableInteractive prop to true
 * see: https://mui.com/material-ui/react-tooltip/#interactive
 */
export const NonInteractive = getCustomBtnTemplate('Non-interactive').bind({});
NonInteractive.args = {
  disableInteractive: true,
};

/**
 * The tooltip can be set to be opened as a modal bottom sheet on mobile devices by setting the
 * showAsModalBottomSheet prop to true. This prop is ignored on tablet or desktop devices even if it
 * has mobile resolutions.
 */
export const ModalBottomSheet = getCustomBtnTemplate('Open as Modal Bottom (real mobile only)').bind({});
ModalBottomSheet.args = {
  showAsModalBottomSheet: true,
};

const [[withArrowLight, withArrowDark]] = createThemeModeVariants(getCustomBtnTemplate('With Arrow'), [
  { arrow: true },
]);
export { withArrowLight, withArrowDark };

/** Styling is made throw regular styled components though in this case as the arrow is also
 * styled, the approach used is similar to the one suggested in the MUI docs:
 * https://mui.com/material-ui/react-tooltip/#variable-width for reference about this approach
 */
export const ColorfullyStyled = CustomStyledTemplate.bind({});
ColorfullyStyled.args = {
  placement: 'bottom-start',
  arrow: true,
};

/** For this case the fallback placement overrides the default behavior of the flip effect
 * and the tooltip is placed at the first available placement from the list. Changing to 'bottom'
 * when overflown on the right instead of 'bottom-end' which would be it's default behavior
 */
export const WithFallbackPlacements = BoundariesTemplate.bind({});
WithFallbackPlacements.args = {
  placement: 'bottom-start',
  arrow: true,
  fallbackPlacements: ['bottom', 'bottom-end', 'top'],
};

const StyledTooltip = styled(SESTooltip)(() => ({
  backgroundColor: 'red',
  color: 'white',

  [`& .${tooltipClasses.arrow}:before`]: {
    backgroundColor: 'red',
    color: 'white',
  },
}));

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
