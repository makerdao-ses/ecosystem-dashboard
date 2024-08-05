import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import type { ExtendedExecutiveProposal } from '@/core/models/interfaces/makervote';
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
    proposal: {
      proposalBlurb:
        'Increase GSM Pause Delay, Increase Spark MetaMorpho Vault Maximum Debt Ceiling, Add Native Vaults to Debt Ceiling Breaker, SparkLend Proxy Spell, and TACO Resolutions - April 4, 2024',
      key: 'template-executive-vote-lite-psm-usdc-a-phase-1-setup-spark-proxy-spell-july-25-2024',
      address: '0x8c7F12C7cE07916f631B25ce148e419FeFf19d46',
      date: 'Thu Jul 25 2024 00:00:00 GMT+0000 (Coordinated Universal Time)',
      active: true,
      spellData: {
        datePassed: '2024-07-29T14:29:59.000Z',
        dateExecuted: '2024-07-30T20:30:11.000Z',
        mkrSupport: '117129779559442077335595',
      },
      supporters: 41,
    } as ExtendedExecutiveProposal,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(Proposal, variantsArgs, false);

export { LightMode, DarkMode };
