import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';

import FinancesContainer from './FinacesContainer';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Pages/FinancesContainer',
  component: FinancesContainer,
  parameters: {
    date: new Date('2022-09-22T12:23:00Z'),
    layout: 'fullscreen',
    nextRouter: {
      pathname: '/finances',
    },

    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
      delay: 5000,
    },
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
