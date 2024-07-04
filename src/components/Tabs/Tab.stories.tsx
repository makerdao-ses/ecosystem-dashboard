import { createThemeModeVariants } from '@/core/utils/storybook/factories';
import { SESCoreUnitMocked } from '@/core/utils/storybook/mocks/coreUnitsMocks';

import Tab from './Tab';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Tab> = {
  title: 'Fusion/Components/Budget Statements/Tabs',
  component: Tab,
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    coreUnit: SESCoreUnitMocked,
  },
];

const [[Tabs, TabsDarkMode]] = createThemeModeVariants(Tab, variantsArgs);
export { Tabs, TabsDarkMode };
