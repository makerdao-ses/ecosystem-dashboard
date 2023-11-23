import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import EndgameBudgetContainerSecondLevel from '@ses/containers/EndgameBudgetContainerSecondLevel/EndgameBudgetContainerSecondLevel';
import { fetchBudgets } from '@ses/containers/Finances/api/queries';
import { getYearsRange } from '@ses/containers/Finances/utils/utils';
import { featureFlags } from 'feature-flags/feature-flags';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { GetServerSidePropsContext } from 'next';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
}

export default function EndgameBudgetSecondLevel({ budgets, yearsRange, initialYear }: Props) {
  return <EndgameBudgetContainerSecondLevel budgets={budgets} yearsRange={yearsRange} initialYear={initialYear} />;
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

  const budgets = await fetchBudgets();

  return {
    props: {
      budgets,
      yearsRange,
      initialYear,
    },
  };
}
