import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BreadcrumbYearNavigation from './BreadcrumbYearNavigation';
import type { NavigationBreadCrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/NewFinances/BreadcrumbYearNavigation',
  component: BreadcrumbYearNavigation,

  parameters: {
    chromatic: {
      viewports: [1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof BreadcrumbYearNavigation>;

const args = [
  {
    years: ['2022', '2023'],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleChange: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onOpen: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClose: () => {},
    selectedValue: '2023',
    isOpen: false,
    trailingAddress: [
      {
        label: 'MakerDAO Finances',
        url: '#',
      },
    ] as NavigationBreadCrumb[],
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(BreadcrumbYearNavigation, args);
LightMode.parameters = {
  figma: {
    component: {
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22069:258713&mode=dev',
        options: {
          componentStyle: {
            width: 1376,
          },
          style: {
            top: -1,
            left: -32,
          },
        },
      },
    },
  } as FigmaParams,
};
