import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CustomBarChart } from './CustomBarChart';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CustomBarChart> = {
  title: 'Components/CUTable/CustomBarChart',
  component: CustomBarChart,
};
export default meta;

const args = [
  {
    items: [{ value: 85 }, { value: 50 }, { value: 130 }],
    maxValues: [90, 90, 90],
    months: ['October', 'November', 'December'],
  },
  {
    items: [{ value: 0 }, { value: 0 }, { value: 0 }],
    maxValues: [0, 0, 0],
    months: ['October', 'November', 'December'],
  },
];

const [[LightMode, DarkMode], [WithoutValue, WithoutValueDarkMode]] = createThemeModeVariants(CustomBarChart, args);
export { LightMode, DarkMode, WithoutValue, WithoutValueDarkMode };

const options = {
  style: {
    top: 3,
    left: 9,
  },
};

LightMode.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2104%3A10084',
    options,
  },
};
DarkMode.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2104%3A10084',
    options,
  },
};

WithoutValue.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2344%3A12537',
    options,
  },
};
WithoutValueDarkMode.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=2344%3A12537',
    options,
  },
};
