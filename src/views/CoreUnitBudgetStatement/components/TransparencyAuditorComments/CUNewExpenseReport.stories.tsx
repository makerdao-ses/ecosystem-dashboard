import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CUNewExpenseReport from './CUNewExpenseReport';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof CUNewExpenseReport> = {
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
};
export default meta;

const [[Light, Dark]] = createThemeModeVariants(CUNewExpenseReport, [
  {
    description: 'Core Unit XXX has published a new expense report for MONTH YEAR',
    date: '2022-11-15T15:44:41.789Z',
  },
]);
export { Light, Dark };
