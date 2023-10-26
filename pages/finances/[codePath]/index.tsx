import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import EndgameBudgetContainerSecondLevel from '@ses/containers/EndgameBudgetContainerSecondLevel/EndgameBudgetContainerSecondLevel';
import { fetchBudgetsFinances } from '@ses/containers/Finances/api/queries';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { GetServerSideProps } from 'next';

interface Props {
  budgets: Budget[];
}

const EndgameBudgetSecondLevel: React.FC<Props> = ({ budgets }) => (
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
