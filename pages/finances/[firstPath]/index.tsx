import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import EndgameBudgetContainerSecondLevel from '@ses/containers/EndgameBudgetContainerSecondLevel/EndgameBudgetContainerSecondLevel';
import { fetchBudgets } from '@ses/containers/Finances/api/queries';
import { getBudgetsAnalytics, getLevelOfBudget, getYearsRange } from '@ses/containers/Finances/utils/utils';
import { featureFlags } from 'feature-flags/feature-flags';
import { SWRConfig } from 'swr';
import type { BreakdownBudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { GetServerSidePropsContext } from 'next';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  fallback: BreakdownBudgetAnalytic;
  allBudgets: Budget[];
}

export default function EndgameBudgetSecondLevel({ budgets, yearsRange, initialYear, fallback, allBudgets }: Props) {
  return (
    <SWRConfig value={{ fallback }}>
      <EndgameBudgetContainerSecondLevel
        budgets={budgets}
        yearsRange={yearsRange}
        initialYear={initialYear}
        allBudgets={allBudgets}
      />
    </SWRConfig>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
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
  const levelPath = 'atlas/' + context.query.firstPath?.toString();

  const levelBudget = allBudgets.find((budget) => budget.codePath === levelPath);
  const budgets: Budget[] = allBudgets.filter((budget) => budget.parentId === levelBudget?.id);
  const budgetsAnalytics = await getBudgetsAnalytics(
    'annual',
    initialYear,
    levelPath,
    getLevelOfBudget(levelPath),
    budgets
  );
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
}
