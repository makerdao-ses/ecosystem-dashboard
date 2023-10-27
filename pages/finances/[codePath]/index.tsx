import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import EndgameBudgetContainerSecondLevel from '@ses/containers/EndgameBudgetContainerSecondLevel/EndgameBudgetContainerSecondLevel';
import { fetchBudgetsFinances } from '@ses/containers/Finances/api/queries';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';

const EndgameBudgetSecondLevel: NextPage = ({ budgets }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <EndgameBudgetContainerSecondLevel budgets={budgets} />
);

export default EndgameBudgetSecondLevel;

export const getServerSideProps: GetServerSideProps = async () => {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE) {
    return {
      notFound: true,
    };
  }

  const budgets = await fetchBudgetsFinances();
  return {
    props: {
      budgets,
    },
  };
};
