import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';

import FinancesContainer from './FinacesContainer';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Pages/FinancesContainer',
  component: FinancesContainer,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      pathname: '/finances',
    },

    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
    date: new Date('2023-09-24T09:08:34.123'),
  },
} as ComponentMeta<typeof FinancesContainer>;

const variantsArgs = [{}];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <FinancesContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);

LightMode.parameters = {};
