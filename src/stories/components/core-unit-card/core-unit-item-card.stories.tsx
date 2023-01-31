import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { CoreUnit } from '@ses/core/utils/test.utils';
import CoreUnitCard from './core-unit-card';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUTable/ItemCoreUnitCard',
  component: CoreUnitCard,
  parameters: {
    fullscreen: 'centered',
    chromatic: {
      viewports: [375, 834],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CoreUnitCard>;

const variantsArgs = [
  {
    isLoading: false,
    coreUnit: CoreUnit,
  },
];
export const [[Summary, SummaryDark]] = createThemeModeVariants(CoreUnitCard, variantsArgs);

Summary.parameters = {
  figma: {
    component: {
      375: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A143329&t=Hc8aw66dT23Z4EPe-4',
      834: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8946%3A138834&t=Hc8aw66dT23Z4EPe-4',
    },
    options: {
      style: {
        top: -10,
        left: -40,
      },
    },
  },
};
SummaryDark.parameters = {
  figma: {
    component: {
      375: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8868%3A143329&t=Hc8aw66dT23Z4EPe-4',
      834: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8946%3A138834&t=Hc8aw66dT23Z4EPe-4',
    },
    options: {
      style: {
        top: -10,
        left: -40,
      },
    },
  },
};
