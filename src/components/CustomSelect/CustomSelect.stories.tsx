import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withThemeContext } from '@/core/utils/storybook/decorators';
import CustomSelect from './CustomSelect';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CustomSelect> = {
  title: 'Fusion/Components/CustomSelect',
  component: CustomSelect,
  decorators: [withThemeContext(true, false)],
};

export default meta;

const variantsArgs = [
  {
    label: 'Year',
    onChange: () => null,
    options: [
      {
        label: '2022',
        value: '2022',
      },
      {
        label: '2023',
        value: '2023',
      },
      {
        label: '2024',
        value: '2024',
      },
    ],
    selected: '2024',
    style: {
      width: 97,
    },
  },
  {
    label: 'Metrics',
    multiple: true,
    onChange: () => null,
    options: [
      {
        label: 'Budget',
        value: 'budget',
      },
      {
        label: 'Forecast',
        value: 'forecast',
      },
      {
        label: 'Net Protocol Outflow',
        value: 'net_protocol_outflow',
      },
      {
        label: 'Net Expenses On-Chain',
        value: 'net_expenses_on_chain',
      },
      {
        label: 'Actuals',
        value: 'actuals',
      },
    ],
    selected: ['budget', 'forecast', 'actuals'],
    style: {
      width: 200,
      menuWidth: 300,
    },
  },
];

const [[DefaultCustomSelectLightMode, DefaultCustomSelectDarkMode], [MultiSelectLightMode, MultiSelectDarkMode]] =
  createThemeModeVariants(CustomSelect, variantsArgs);

export { DefaultCustomSelectLightMode, DefaultCustomSelectDarkMode, MultiSelectLightMode, MultiSelectDarkMode };
