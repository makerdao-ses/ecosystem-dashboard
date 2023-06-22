import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { CuTable } from '@ses/containers/CUTable/CuTable';
import FinancesOverviewContainer from '@ses/containers/FinancesOverview/FinancesOverviewContainer';
import {
  fetchCostBreakdownExpenses,
  fetchExpenseCategories,
  fetchExpenses,
} from '@ses/containers/FinancesOverview/api/queries';
import { ModalCategoriesProvider } from '@ses/core/context/CategoryModalContext';
import { ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import React from 'react';
import { featureFlags } from '../feature-flags/feature-flags';
import type { ExtendedExpense } from '@ses/containers/FinancesOverview/financesOverviewTypes';
import type { ExpenseCategory } from '@ses/core/models/dto/expenseCategoriesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { NextPage } from 'next';

interface FinanceOverviewPageProps {
  quarterExpenses: ExpenseDto[];
  monthlyExpenses: Partial<ExpenseDto>[];
  byBudgetBreakdownExpenses: ExtendedExpense[];
  byCategoryBreakdownExpenses: ExpenseDto[];
  expenseCategories: ExpenseCategory[];
}

const FinanceOverviewPage: NextPage<FinanceOverviewPageProps> = ({
  quarterExpenses,
  monthlyExpenses,
  byBudgetBreakdownExpenses,
  byCategoryBreakdownExpenses,
  expenseCategories,
}) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    // core unit overview would be the home page if the finances overview is disabled
    return <CuTable />;
  }

  return (
    <ModalCategoriesProvider expenseCategories={expenseCategories}>
      <FinancesOverviewContainer
        quarterExpenses={quarterExpenses}
        monthlyExpenses={monthlyExpenses || []}
        byBudgetBreakdownExpenses={byBudgetBreakdownExpenses}
        byCategoryBreakdownExpenses={byCategoryBreakdownExpenses}
        expenseCategories={expenseCategories}
      />
    </ModalCategoriesProvider>
  );
};

export default FinanceOverviewPage;

export async function getServerSideProps() {
  if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    const [quarterExpenses, monthlyExpenses, breakdownExpenses, expenseCategories] = await Promise.all([
      fetchExpenses(ExpenseGranularity.quarterly),
      fetchExpenses(ExpenseGranularity.monthly),
      fetchCostBreakdownExpenses(),
      fetchExpenseCategories(),
    ]);

    return {
      props: {
        quarterExpenses,
        monthlyExpenses,
        byBudgetBreakdownExpenses: breakdownExpenses.byBudget,
        byCategoryBreakdownExpenses: breakdownExpenses.byCategory,
        expenseCategories,
      },
    };
  }

  return {
    props: {},
  };
}
