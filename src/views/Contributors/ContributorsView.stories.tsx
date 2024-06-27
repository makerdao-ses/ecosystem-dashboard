import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../../stories/containers/AppLayout/AppLayout';
import ContributorsView from './ContributorsView';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ContributorsView> = {
  title: 'Fusion/Pages/Contributors',
  component: ContributorsView,
  decorators: [withoutSBPadding],
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
    teamTypes: [
      {
        name: 'Protocol Engineering',
        type: 'CoreUnit',
      },
      {
        name: 'Sustainable Ecosystem Scaling',
        type: 'CoreUnit',
      },
      {
        name: 'Collateral Engineering Services',
        type: 'CoreUnit',
      },
      {
        name: 'Risk',
        type: 'CoreUnit',
      },
      {
        name: 'Governance Alpha',
        type: 'CoreUnit',
      },
      {
        name: 'Events',
        type: 'CoreUnit',
      },
      {
        name: 'L2BEAT',
        type: 'EcosystemActor',
      },
      {
        name: 'BALabs',
        type: 'EcosystemActor',
      },
      {
        name: 'Powerhouse',
        type: 'EcosystemActor',
      },
      {
        name: 'Chronicle Labs',
        type: 'EcosystemActor',
      },
      {
        name: 'DevPool',
        type: 'EcosystemActor',
      },
      {
        name: 'PullUp Labs',
        type: 'EcosystemActor',
      },
      {
        name: 'Phoenix Labs',
        type: 'EcosystemActor',
      },
      {
        name: 'Viridian Protector Advisory Company',
        type: 'EcosystemActor',
      },
      {
        name: 'Steakhouse',
        type: 'EcosystemActor',
      },
      {
        name: 'Aligned Delegates',
        type: 'AlignedDelegates',
      },
      {
        name: 'Governance Alpha',
        type: 'EcosystemActor',
      },
      {
        name: 'Growth',
        type: 'EcosystemActor',
      },
      {
        name: 'TechOps',
        type: 'EcosystemActor',
      },
      {
        name: 'StableLab',
        type: 'EcosystemActor',
      },
      {
        name: 'Content Production',
        type: 'CoreUnit',
      },
      {
        name: 'Support',
        type: 'Scopes',
      },
      {
        name: 'Stability',
        type: 'Scopes',
      },
      {
        name: 'Protocol',
        type: 'Scopes',
      },
      {
        name: 'Accessibility',
        type: 'Scopes',
      },
      {
        name: 'Governance',
        type: 'Scopes',
      },
      {
        name: 'Ecosystem',
        type: 'EcosystemActor',
      },
      {
        name: 'Endgame Edge',
        type: 'EcosystemActor',
      },
      {
        name: 'JanSky',
        type: 'EcosystemActor',
      },
      {
        name: 'AAVE',
        type: 'EcosystemActor',
      },
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <ContributorsView {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
