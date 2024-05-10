import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import InternalLinkButton from './InternalLinkButton';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof InternalLinkButton> = {
  title: 'fusion/components/InternalLinkButton/InternalLinkButton',
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    label: 'Phase 1  Progress',
    icon: true,
    href: '/roadmaps/endgame-phase-1',
  },
];

const [[LightMode, DeskDarkMode]] = createThemeModeVariants(InternalLinkButton, variantsArgs);
export { LightMode, DeskDarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=208-28377&t=5RvUCO874XXf5SYr-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
DeskDarkMode.parameters = {};
