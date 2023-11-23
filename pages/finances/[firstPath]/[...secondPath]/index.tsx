import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { fetchCoreUnits } from '@ses/containers/CUTable/cuTableAPI';
import EndgameBudgetContainerThirdLevel from '@ses/containers/EndgameBudgetContainerThirdLevel/EndgameBudgetContainerThirdLevel';
import { fetchBudgets } from '@ses/containers/Finances/api/queries';
import { getYearsRange } from '@ses/containers/Finances/utils/utils';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const EndgameBudgetThirdLevel: NextPage = ({
  budgets,
  yearsRange,
  initialYear,
  coreUnits,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <EndgameBudgetContainerThirdLevel
    budgets={budgets}
    yearsRange={yearsRange}
    initialYear={initialYear}
    coreUnits={coreUnits}
  />
);

export default EndgameBudgetThirdLevel;

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE) {
    return {
      notFound: true,
    };
  }

  const yearsRange = getYearsRange();
  const initialYear = context.query.year?.toString() ?? yearsRange[0];
  if (initialYear !== yearsRange[0] && !yearsRange.includes(initialYear)) {
    return {
      notFound: true,
    };
  }

  const [budgets, coreUnits] = await Promise.all([fetchBudgets(), fetchCoreUnits()]);

  return {
    props: {
      budgets,
      yearsRange,
      initialYear,
      coreUnits,
    },
  };
};
