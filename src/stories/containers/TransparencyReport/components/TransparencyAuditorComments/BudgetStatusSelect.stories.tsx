import { BudgetStatus } from '@ses/core/models/interfaces/types';
import React from 'react';
import { createThemeModeVariants } from '../../../../../core/utils/storybook/factories';
import BudgetStatusSelect from './BudgetStatusSelect';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BudgetStatusSelect> = {
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
};
export default meta;

const [[Light, Dark]] = createThemeModeVariants(BudgetStatusSelect);
export { Light, Dark };

Light.parameters = {
  figma: {
    component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10567%3A111590',
  },
};
