import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import RecognizedDelegatesContainer from '@ses/containers/RecognizedDelegates/RecognizedDelegatesContainer';
import {
  fetchDelegatesNumbers,
  fetchRecognizedDelegateDoughnutChart,
  fetchRecognizedDelegates,
} from '@ses/containers/RecognizedDelegates/api/RecognizedDelegatesAPI';

import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { RecognizedDelegatesDto, TotalDelegateDto } from '@ses/core/models/dto/delegatesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  delegates: RecognizedDelegatesDto[];
  delegatesNumbers: ExpenseDto[];
  totalQuarterlyExpenses: TotalDelegateDto;
}

const RecognizedDelegates: NextPage<Props> = ({ delegates, delegatesNumbers, totalQuarterlyExpenses }) => (
  <RecognizedDelegatesContainer
    delegates={delegates}
    delegatesNumbers={delegatesNumbers}
    totalQuarterlyExpenses={totalQuarterlyExpenses}
  />
);

export default RecognizedDelegates;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
    return {
      notFound: true,
    };
  }

  const [delegates, delegatesNumbers, totalQuarterlyExpenses] = await Promise.all([
    fetchRecognizedDelegates(),
    fetchDelegatesNumbers(),
    fetchRecognizedDelegateDoughnutChart(),
  ]);
  return {
    props: {
      delegates,
      delegatesNumbers,
      totalQuarterlyExpenses,
    },
  };
};
