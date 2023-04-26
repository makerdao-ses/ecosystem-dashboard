import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { fetchExpenses } from '@ses/containers/FinancesOverview/api/queries';
import { fetchRecognizedDelegates } from '@ses/containers/RecognizedDelegates/RecognizedDelegatesAPI';
import RecognizedDelegatesContainer from '@ses/containers/RecognizedDelegates/RecognizedDelegatesContainer';
import { ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  delegates: RecognizedDelegatesDto[];
  totalDaiDelegates: number;
}

const RecognizedDelegates: NextPage<Props> = ({ delegates, totalDaiDelegates }) => (
  <RecognizedDelegatesContainer delegates={delegates} totalDaiDelegates={totalDaiDelegates} />
);

export default RecognizedDelegates;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
    return {
      notFound: true,
    };
  }

  const [delegates, totalDaiDelegates] = await Promise.all([
    fetchRecognizedDelegates(),
    fetchExpenses(ExpenseGranularity.total, 'makerdao/delegates'),
  ]);

  return {
    props: {
      delegates,
      totalDaiDelegates: totalDaiDelegates[0].prediction || 0,
    },
  };
};
