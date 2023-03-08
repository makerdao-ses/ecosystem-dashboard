import { createThemeModeVariants } from '../../../../../core/utils/storybook/factories';
import CUNewExpenseReport from './CUNewExpenseReport';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/AuditorComments/CUNewExpenseReport',
  component: CUNewExpenseReport,
  argTypes: {
    description: {
      control: {
        type: 'text',
      },
    },
    date: {
      control: {
        type: 'date',
      },
    },
  },
} as ComponentMeta<typeof CUNewExpenseReport>;

export const [[Light, Dark]] = createThemeModeVariants(CUNewExpenseReport, [
  {
    description: 'Core Unit XXX has published a new expense report for MONTH YEAR',
    date: '2022-11-15T15:44:41.789Z',
  },
]);
