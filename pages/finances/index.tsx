import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import FinancesContainer from '@ses/containers/Finances/FinacesContainer';
import { fetchBudgets, fetchAnalytics } from '@ses/containers/Finances/api/queries';
import { getYearsRange, getBudgetsAnalytics } from '@ses/containers/Finances/utils/utils';
import { featureFlags } from 'feature-flags/feature-flags';
// eslint-disable-next-line spellcheck/spell-checker
// import { SWRConfig } from 'swr';
import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { GetServerSidePropsContext } from 'next';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  budgetsAnalytics: BudgetAnalytic[];
}

export default function Finances({ budgets, yearsRange, initialYear, budgetsAnalytics /*, fallback */ }: Props) {
  return (
    // <SWRConfig value={{ fallback }}>
    <FinancesContainer
      budgets={budgets}
      yearsRange={yearsRange}
      initialYear={initialYear}
      budgetsAnalytics={budgetsAnalytics}
    />
    // </SWRConfig>
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

  const budgets = (await fetchBudgets()).filter((budget) => budget.parentId === null);

  const analytics = await fetchAnalytics('annual', initialYear, 'atlas', 2);
  const budgetsAnalytics = getBudgetsAnalytics(analytics);

  return {
    props: {
      budgets,
      yearsRange,
      initialYear,
      budgetsAnalytics,
      /* fallback: {
        '/finances/analytics/annual': budgetsAnalytics,
      }, */
    },
  };
}
