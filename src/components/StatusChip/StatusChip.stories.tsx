import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { StatusChip } from './StatusChip';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof StatusChip> = {
  title: 'Fusion/Components/StatusChip',
  component: StatusChip,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    status: 'Final',
  },
  {
    status: 'Draft',
  },
  {
    status: 'Review',
  },
  {
    status: 'Escalated',
  },

  {
    status: 'Obsolete',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(StatusChip, variantsArgs);
export { LightMode, DarkMode };
