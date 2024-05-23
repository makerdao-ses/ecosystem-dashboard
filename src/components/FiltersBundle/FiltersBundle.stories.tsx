import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withThemeContext } from '@/core/utils/storybook/decorators';
import FiltersBundle from './FiltersBundle';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof FiltersBundle> = {
  title: 'Fusion/Components/FiltersBundle',
  component: FiltersBundle,
  decorators: [withThemeContext(true, false)],
};

export default meta;

const variantsArgs = [
  {
    filters: [
      {
        type: 'select',
        id: 'year',
        label: 'Year',
        selected: '2021',
        onChange: () => null,
        options: [
          {
            value: '2021',
            label: '2021',
          },
          {
            value: '2022',
            label: '2022',
          },
          {
            value: '2023',
            label: '2023',
          },
          {
            value: '2024',
            label: '2024',
          },
        ],
      },
    ],
  },
];

const [[FiltersYearsLightMode, FiltersYearsDarkMode]] = createThemeModeVariants(FiltersBundle, variantsArgs);
export { FiltersYearsLightMode, FiltersYearsDarkMode };
