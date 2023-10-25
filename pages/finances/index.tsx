import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import FinancesContainer from '@ses/containers/Finances/FinacesContainer';
import { fetchBudgetsFinances } from '@ses/containers/Finances/api/queries';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { BudgetsFinances } from '@ses/containers/Finances/utils/types';
import type { GetServerSideProps } from 'next';

interface Props {
  budgets: BudgetsFinances[];
}

const Finances: React.FC<Props> = ({ budgets }) => <FinancesContainer budgets={budgets} />;

export default Finances;

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
