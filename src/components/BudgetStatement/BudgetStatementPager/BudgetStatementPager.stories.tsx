import BudgetStatementPager from './BudgetStatementPager';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BudgetStatementPager> = {
  title: 'Fusion/Components/Budget Statements/Pager',
  component: BudgetStatementPager,
  parameters: {
    chromatic: {
      viewports: [375, 768],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;
