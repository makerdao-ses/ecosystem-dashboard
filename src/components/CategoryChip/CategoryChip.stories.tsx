import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import CategoryChip from './CategoryChip';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CategoryChip> = {
  title: 'Fusion/Components/CategoryChip',
  component: CategoryChip,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    category: 'Technical',
  },
  {
    category: 'Support',
  },
  {
    category: 'Operational',
  },
  {
    category: 'Business',
  },

  {
    category: 'RWAs',
  },

  {
    category: 'Growth',
  },

  {
    category: 'Finance',
  },
  {
    category: 'Legal',
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(CategoryChip, variantsArgs);
export { LightMode, DarkMode };
