import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { CuTable } from '@ses/containers/CUTable/CuTable';
import FinancesOverviewContainer from '@ses/containers/FinancesOverview/FinancesOverviewContainer';
import { fetchExpenses } from '@ses/containers/FinancesOverview/api/queries';
import { ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import React from 'react';
import { featureFlags } from '../feature-flags/feature-flags';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { NextPage } from 'next';

type FinanceOverviewPageProps = {
  quarterExpenses: ExpenseDto[];
  monthlyExpenses: Partial<ExpenseDto>[];
};

const FinanceOverviewPage: NextPage<FinanceOverviewPageProps> = ({ quarterExpenses, monthlyExpenses }) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    // core unit overview would be the home page if the finances overview is disabled
    return <CuTable />;
  }

  return <FinancesOverviewContainer quarterExpenses={quarterExpenses} monthlyExpenses={monthlyExpenses || []} />;
};

export default FinanceOverviewPage;

export async function getServerSideProps() {
  if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
    const quarterExpenses = await fetchExpenses(ExpenseGranularity.quarterly);
    const monthlyExpenses = await fetchExpenses(ExpenseGranularity.monthly);

    return {
      props: {
        quarterExpenses,
        monthlyExpenses,
      },
    };
  }

  return {
    props: {},
  };
}
