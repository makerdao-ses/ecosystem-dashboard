import React from 'react';
import { BudgetStatus } from '../../../../../core/models/dto/coreUnitDTO';
import { createThemeModeVariants } from '../../../../../core/utils/storybook/factories';
import BudgetStatusSelect from './BudgetStatusSelect';
import type { ComponentMeta } from '@storybook/react';

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

Light.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10567%3A111590',
  },
};
