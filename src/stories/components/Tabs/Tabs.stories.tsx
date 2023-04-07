import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Tabs from './Tabs';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const args = [
  {
    tabs: [
      {
        item: 'Actuals',
        id: 'one',
      },
      {
        item: 'Forecast',
        id: 'two',
      },
      {
        item: 'Transfer Requests',
        id: 'three',
      },
      {
        item: 'Comments(3)',
        id: 'four',
      },
    ],
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(Tabs, args);

LightMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13254%3A134803&t=YpYjL4dy7ofDUVc2-4',
  },
};
DarkMode.parameters = {
  figma: {
    component:
      'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=13254%3A134803&t=YpYjL4dy7ofDUVc2-4',
  },
};
