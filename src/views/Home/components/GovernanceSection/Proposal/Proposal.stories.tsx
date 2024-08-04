import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Proposal from './Proposal';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Proposal> = {
  title: 'Fusion/Views/Home/Proposal',
  component: Proposal,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    isGoverningProposal: true,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(Proposal, variantsArgs, false);

export { LightMode, DarkMode };
