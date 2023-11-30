import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import EndgameBudgetContainerThirdLevel from '@ses/containers/EndgameBudgetContainerThirdLevel/EndgameBudgetContainerThirdLevel';
import { fetchBudgets } from '@ses/containers/Finances/api/queries';
import { getBudgetsAnalytics, getLevelOfBudget, getYearsRange } from '@ses/containers/Finances/utils/utils';
import { featureFlags } from 'feature-flags/feature-flags';
import React from 'react';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { GetServerSideProps, GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from 'next';

const EndgameBudgetThirdLevel: NextPage = ({
  budgets,
  yearsRange,
  initialYear,
  allBudgets,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <EndgameBudgetContainerThirdLevel
    budgets={budgets}
    yearsRange={yearsRange}
    initialYear={initialYear}
    allBudgets={allBudgets}
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

  const allBudgets = await fetchBudgets();

  const levelPath = 'atlas/' + context.query.firstPath?.toString() + '/' + context.query.secondPath?.toString();

  const levelBudget = allBudgets.find((budget) => budget.codePath === levelPath);

  const budgets: Budget[] = allBudgets.filter((budget) => budget.parentId === levelBudget?.id);

  const budgetsAnalytics = await getBudgetsAnalytics('annual', initialYear, levelPath, getLevelOfBudget(levelPath));

  return {
    props: {
      budgets,
      yearsRange,
      initialYear,
      allBudgets,
      fallback: {
        'analytics/annual': budgetsAnalytics,
      },
    },
  };
};
