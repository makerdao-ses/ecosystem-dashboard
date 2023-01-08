import React from 'react';
import { ComponentMeta } from '@storybook/react';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import BudgetStatusSelect from './budget-status-select';
import { createThemeModeVariants } from '../../../../core/utils/storybook';

export default {
  title: 'Components/AuditorComments/BudgetStatusSelect',
  component: BudgetStatusSelect,
  decorators: [
    (Story) => (
      <div style={{ display: 'inline-block' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    availableStatuses: {
      control: {
        type: 'inline-check',
        options: Object.values(BudgetStatus),
      },
    },
  },
} as ComponentMeta<typeof BudgetStatusSelect>;

export const [[Light, Dark]] = createThemeModeVariants(BudgetStatusSelect);
