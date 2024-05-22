import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { StatusChip } from './StatusChip';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof StatusChip> = {
  title: 'Fusion/Components/StatusChip',
  component: StatusChip,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    status: 'RFC',
  },
  {
    status: 'Formal Submission',
  },
  {
    status: 'Accepted',
  },
  {
    status: 'Obsolete',
  },

  {
    status: 'Withdrawn',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(StatusChip, variantsArgs);
export { LightMode, DarkMode };
