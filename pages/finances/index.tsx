import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import FinancesContainer from '@ses/containers/Finances/FinancesContainer';
import { fetchBudgets } from '@ses/containers/Finances/api/queries';
import { getYearsRange, getBudgetsAnalytics } from '@ses/containers/Finances/utils/utils';
import { BudgetContext } from '@ses/core/context/BudgetContext';
import { featureFlags } from 'feature-flags/feature-flags';
import { useEffect, useState } from 'react';
import { SWRConfig } from 'swr';
import type { BudgetAnalytic } from '@ses/core/models/interfaces/analytic';
import type { Budget } from '@ses/core/models/interfaces/budget';
import type { GetServerSidePropsContext } from 'next';

interface Props {
  budgets: Budget[];
  yearsRange: string[];
  initialYear: string;
  fallback: BudgetAnalytic;
  allBudget: Budget[];
}

export default function Finances({ budgets, yearsRange, initialYear, fallback, allBudget }: Props) {
  const [allBudgets, setAllBudgets] = useState<Budget[]>(allBudget);
  useEffect(() => {
    setAllBudgets(allBudgets);
  }, [allBudgets]);
  return (
    <BudgetContext.Provider
      value={{
        allBudgets,
        setCurrentBudget: setAllBudgets,
      }}
    >
      <SWRConfig value={{ fallback }}>
        <FinancesContainer budgets={budgets} yearsRange={yearsRange} initialYear={initialYear} />
      </SWRConfig>
    </BudgetContext.Provider>
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
  const allBudget = await fetchBudgets();
  const budgets = allBudget
    .filter((budget) => budget.parentId === null)
    .map((item) =>
      item.codePath === '142'
        ? {
            ...item,
            codePath: 'atlas/legacy',
          }
        : item
    );

  const budgetsAnalytics = await getBudgetsAnalytics('annual', initialYear, 'atlas', 1, budgets);
  return {
    props: {
      budgets,
      yearsRange,
      initialYear,
      allBudget,
      fallback: {
        'analytics/annual': budgetsAnalytics,
      },
    },
  };
}
