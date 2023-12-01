import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import FinancesContainer from '@ses/containers/Finances/FinancesContainer';
import { fetchBudgets } from '@ses/containers/Finances/api/queries';
import { getYearsRange, getBudgetsAnalytics } from '@ses/containers/Finances/utils/utils';
import { featureFlags } from 'feature-flags/feature-flags';
import { SWRConfig } from 'swr';
import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { GetServerSidePropsContext } from 'next';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  fallback: BudgetAnalytic;
}

export default function Finances({ budgets, yearsRange, initialYear, fallback }: Props) {
  return (
    <SWRConfig value={{ fallback }}>
      <FinancesContainer budgets={budgets} yearsRange={yearsRange} initialYear={initialYear} />
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

  const budgets = (await fetchBudgets()).filter((budget) => budget.parentId === null);

  const budgetsAnalytics = await getBudgetsAnalytics('annual', initialYear, 'atlas', 2, budgets);

  return {
    props: {
      budgets,
      yearsRange,
      initialYear,
      fallback: {
        'analytics/annual': budgetsAnalytics,
      },
    },
  };
}
