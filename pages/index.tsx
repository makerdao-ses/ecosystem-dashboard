import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { CuTable } from '@ses/containers/CUTable/CuTable';
import FinancesOverviewContainer from '@ses/containers/FinancesOverview/FinancesOverviewContainer';
import { fetchCostBreakdownExpenses, fetchExpenses } from '@ses/containers/FinancesOverview/api/queries';
import { ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import React from 'react';
import { featureFlags } from '../feature-flags/feature-flags';
import type { ExtendedExpense } from '@ses/containers/FinancesOverview/financesOverviewTypes';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { NextPage } from 'next';

interface FinanceOverviewPageProps {
  quarterExpenses: ExpenseDto[];
  monthlyExpenses: Partial<ExpenseDto>[];
  breakdownExpenses: ExtendedExpense[];
}

const FinanceOverviewPage: NextPage<FinanceOverviewPageProps> = ({
  quarterExpenses,
  monthlyExpenses,
  breakdownExpenses,
}) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    // core unit overview would be the home page if the finances overview is disabled
    return <CuTable />;
  }

  return (
    <FinancesOverviewContainer
      quarterExpenses={quarterExpenses}
      monthlyExpenses={monthlyExpenses || []}
      breakdownExpenses={breakdownExpenses}
    />
  );
};

export default FinanceOverviewPage;

export async function getServerSideProps() {
  if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    const [quarterExpenses, monthlyExpenses, breakdownExpenses] = await Promise.all([
      fetchExpenses(ExpenseGranularity.quarterly),
      fetchExpenses(ExpenseGranularity.monthly),
      // fetchExpenses(ExpenseGranularity.annual, 'makerdao/*:*/*:*'),
      fetchCostBreakdownExpenses(),
    ]);

    return {
      props: {
        quarterExpenses,
        monthlyExpenses,
        breakdownExpenses,
      },
    };
  }

  return {
    props: {},
  };
}
