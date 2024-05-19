import { withThemeContext } from '@/core/utils/storybook/decorators';
import FiltersBundle from './FiltersBundle';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof FiltersBundle> = {
  title: 'Fusion/Components/FiltersBundle',
  component: FiltersBundle,
  decorators: [withThemeContext(true, false)],
};

export default meta;

type Story = StoryObj<typeof FiltersBundle>;

export const FiltersBundleDefault: Story = {
  args: {
    resetFilters: {
      canReset: false,
      onReset: () => null,
    },
    filters: [
      {
        type: 'search',
        id: 'search',
        value: '',
        onChange: (value: string) => console.log(value),
      },
      {
        type: 'select',
        id: 'select',
        label: 'Select',
        options: [
          {
            value: '1',
            label: 'Option 1',
            selected: true,
          },
          {
            value: '2',
            label: 'Option 2',
          },
          {
            value: '3',
            label: 'Option 3',
          },
        ],
      },
    ],
  },
};

export const SimpleFiltersYears: Story = {
  args: {
    resetFilters: {
      canReset: false,
      onReset: () => null,
    },
    filters: [
      {
        type: 'select',
        id: 'year',
        label: 'Year',
        options: [
          {
            value: '2020',
            label: '2020',
            selected: true,
          },
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
        ],
      },
    ],
  },
};
