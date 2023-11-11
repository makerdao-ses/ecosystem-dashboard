import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { fetchCoreUnits } from '@ses/containers/CUTable/cuTableAPI';
import EndgameBudgetContainerThirdLevel from '@ses/containers/EndgameBudgetContainerThirdLevel/EndgameBudgetContainerThirdLevel';
import { fetchBudgetsFinances } from '@ses/containers/Finances/api/queries';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

const EndgameBudgetThirdLevel: NextPage = ({
  budgets,
  coreUnits,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <EndgameBudgetContainerThirdLevel budgets={budgets} coreUnits={coreUnits} />
);

export default EndgameBudgetThirdLevel;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE) {
    return {
      notFound: true,
    };
  }

  const [budgets, coreUnits] = await Promise.all([fetchBudgetsFinances(), fetchCoreUnits()]);
  return {
    props: {
      budgets,
      coreUnits,
    },
  };
};
