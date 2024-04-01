import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import RecognizedDelegatesContainer from '@ses/containers/RecognizedDelegates/RecognizedDelegatesContainer';
import {
  fetchDelegatesAnalytics,
  fetchRecognizedDelegates,
  fetchTotalExpenses,
} from '@ses/containers/RecognizedDelegates/api/RecognizedDelegatesAPI';
import { ExpenseGranularity } from '@ses/core/models/dto/expensesDTO';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { Analytic } from '@ses/core/models/interfaces/analytic';
import type { GetServerSideProps, NextPage } from 'next';

interface Props {
  delegates: RecognizedDelegatesDto[];
  totalMakerDAOExpenses: number;
  monthlyAnalytics: Analytic;
  totalAnalytics: Analytic;
}

const RecognizedDelegates: NextPage<Props> = ({
  delegates,
  totalMakerDAOExpenses,
  monthlyAnalytics,
  totalAnalytics,
}) => (
  <RecognizedDelegatesContainer
    delegates={delegates}
    totalMakerDAOExpenses={totalMakerDAOExpenses}
    monthlyAnalytics={monthlyAnalytics}
    totalAnalytics={totalAnalytics}
  />
);

export default RecognizedDelegates;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
    return {
      notFound: true,
    };
  }

  const [delegates, totalMakerDAOExpenses, monthlyAnalytics, totalAnalytics] = await Promise.all([
    fetchRecognizedDelegates(),
    fetchTotalExpenses(),
    fetchDelegatesAnalytics(ExpenseGranularity.monthly),
    fetchDelegatesAnalytics(ExpenseGranularity.total),
  ]);

  // there are "delegates" on the Analytics query that are not present in the recognized delegates query
  // so we need to filter them out
  const delegateNames = delegates.map((delegate) => delegate.name);
  const monthlyAnalyticsFiltered = {
    ...monthlyAnalytics,
    series: monthlyAnalytics.series.map((series) => ({
      ...series,
      rows: series.rows.filter((row) =>
        row.dimensions.some((dimension) => delegateNames.includes(dimension.path.replace('atlas/', '')))
      ),
    })),
  };

  return {
    props: {
      delegates,
      totalMakerDAOExpenses,
      monthlyAnalytics: monthlyAnalyticsFiltered,
      totalAnalytics,
    },
  };
};
