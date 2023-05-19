import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import RecognizedDelegatesContainer from '@ses/containers/RecognizedDelegates/RecognizedDelegatesContainer';
import {
  fetchDelegatesNumbers,
  fetchRecognizedDelegateDoughnutChart,
  fetchRecognizedDelegates,
} from '@ses/containers/RecognizedDelegates/api/RecognizedDelegatesAPI';

import { ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { RecognizedDelegatesDto, TotalDelegateDto } from '@ses/core/models/dto/delegatesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  delegates: RecognizedDelegatesDto[];
  delegatesNumbers: ExpenseDto[];
  totalQuarterlyExpenses: TotalDelegateDto;
  totalMonthlyExpenses: ExpenseDto[];
}

const RecognizedDelegates: NextPage<Props> = ({
  delegates,
  delegatesNumbers,
  totalQuarterlyExpenses,
  totalMonthlyExpenses,
}) => (
  <RecognizedDelegatesContainer
    delegates={delegates}
    delegatesNumbers={delegatesNumbers}
    totalQuarterlyExpenses={totalQuarterlyExpenses}
    totalMonthlyExpenses={totalMonthlyExpenses}
  />
);

export default RecognizedDelegates;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
    return {
      notFound: true,
    };
  }

  const [delegates, delegatesNumbers, totalMonthlyExpenses, totalQuarterlyExpenses] = await Promise.all([
    fetchRecognizedDelegates(),
    fetchDelegatesNumbers(ExpenseGranularity.total),
    fetchDelegatesNumbers(ExpenseGranularity.monthly),
    fetchRecognizedDelegateDoughnutChart(),
  ]);
  return {
    props: {
      delegates,
      delegatesNumbers,
      totalMonthlyExpenses,
      totalQuarterlyExpenses,
    },
  };
};
