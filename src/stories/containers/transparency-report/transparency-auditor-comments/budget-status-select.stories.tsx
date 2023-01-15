import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { figmaComparatorCommonPaddingOptions } from '@ses/core/utils/storybook/utils';
import React from 'react';
import { BudgetStatus } from '../../../../core/models/dto/core-unit.dto';
import { createThemeModeVariants } from '../../../../core/utils/storybook/factories';
import BudgetStatusSelect from './budget-status-select';
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

Light.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10567%3A111590&t=MOBBpTiml2e9jNRV-4',
    figmaComparatorCommonPaddingOptions
  ),
];
