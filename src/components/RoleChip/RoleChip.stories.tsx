import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import RoleChip from './RoleChip';
import type { Meta } from '@storybook/react';

const meta: Meta = {
  title: 'Fusion/Components/RoleChip/RoleChip',
  component: RoleChip,

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
    status: 'ActiveEcosystemActor',
  },
  {
    status: 'ScopeFacilitator',
  },
  {
    status: 'AdvisoryCouncilMember',
  },
  {
    status: 'Facilitator',
  },
  {
    status: 'ResearchExpert',
  },
  {
    status: 'ProjectLead',
  },
  {
    status: 'DataExpert',
  },
  {
    status: 'TechExpert',
  },
  {
    status: 'TeamLead',
  },
  {
    status: 'All',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(RoleChip, variantsArgs);
export { LightMode, DarkMode };
