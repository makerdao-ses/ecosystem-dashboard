import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { featureFlags } from 'feature-flags/feature-flags';
import { DateTime } from 'luxon';
// eslint-disable-next-line camelcase
import { SWRConfig, unstable_serialize } from 'swr';
import FinancesContainer from '@/views/Finances/FinancesView';
import { fetchBudgets } from '@/views/Finances/api/queries';
import { getYearsRange, getBudgetsAnalytics } from '@/views/Finances/utils/utils';
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

export default function Finances({ budgets, yearsRange, initialYear, fallback, allBudgets }: Props) {
  return (
    <SWRConfig value={{ fallback }}>
      <FinancesContainer budgets={budgets} allBudgets={allBudgets} yearsRange={yearsRange} initialYear={initialYear} />
    </SWRConfig>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE) {
    return {
      notFound: true,
    };
  }

  // get the allowed year range and validate the initial year
  const yearsRange = getYearsRange();

  const now = DateTime.utc();
  const initialYear = context.query.year?.toString() ?? (now.month / 3 >= 2 ? now.year : now.year - 1).toString();
  if (initialYear !== yearsRange[0] && !yearsRange.includes(initialYear)) {
    return {
      notFound: true,
    };
  }

  // path of the budget
  const urlPath = Array.isArray(context.query.path) ? context.query.path.join('/') : context.query.path;
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas';

  // all the budgets for all the levels
  const allBudgets = await fetchBudgets();
  let budgets;
  if (codePath === 'atlas') {
    // it is the first level so we need to get the budgets that have no parent
    budgets = allBudgets.filter((budget) => budget.parentId === null);
  } else {
    // we're on a deeper level so we need to get the budgets that have the parent id of the current level
    const levelBudget = allBudgets.find((budget) => budget.codePath === codePath);
    budgets = allBudgets.filter((budget) => budget.parentId === levelBudget?.id);
  }

  // level of detail for the analytics query need to get 1 level deeper to get the correct values
  const levelOfDetail = codePath.split('/').length + 1;
  // get the analytics
  const budgetsAnalytics = await getBudgetsAnalytics('annual', initialYear, codePath, levelOfDetail, budgets);

  return {
    props: {
      budgets,
      yearsRange,
      initialYear,
      allBudgets,
      fallback: {
        [unstable_serialize(['annual', initialYear, codePath, levelOfDetail, budgets])]: budgetsAnalytics,
      },
    },
  };
}
