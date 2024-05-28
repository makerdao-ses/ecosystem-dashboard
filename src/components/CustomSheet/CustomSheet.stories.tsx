import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withThemeContext } from '@/core/utils/storybook/decorators';
import CustomSheet from './CustomSheet';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CustomSheet> = {
  title: 'Fusion/Components/CustomSheet',
  component: CustomSheet,
  decorators: [withThemeContext(true, false)],
};

export default meta;

const variantsArgs = [
  {
    isOpen: true,
    onClose: () => null,
    children: <div />,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(CustomSheet, variantsArgs);
export { LightMode, DarkMode };
