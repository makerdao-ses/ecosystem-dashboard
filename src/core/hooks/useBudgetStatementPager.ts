import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getLastMonthWithActualOrForecast } from '../businessLogic/coreUnits';
import { API_MONTH_TO_FORMAT } from '../utils/date';
import { useUrlAnchor } from './useUrlAnchor';
import type { BudgetStatement } from '../models/interfaces/budgetStatement';
import type { WithBudgetStatement } from '../models/interfaces/generics';

export interface SnapshotLimitPeriods {
  earliest: DateTime;
  latest: DateTime;
}

export interface BudgetStatementPagerOptions {
  onPrevious?: () => void;
  onNext?: () => void;
  latestSnapshotPeriod?: SnapshotLimitPeriods;
}

const useBudgetStatementPager = (element: WithBudgetStatement, options?: BudgetStatementPagerOptions) => {
  const router = useRouter();
  const viewMonthStr = router.query.viewMonth;
  const anchor = useUrlAnchor();
  const [currentMonth, setCurrentMonth] = useState(DateTime.utc());

  const prepareWalletsName = (budgetStatement?: BudgetStatement) => {
    const walletNames = new Map<string, number>();
    budgetStatement?.budgetStatementWallet?.forEach((wallet) => {
      const amount = walletNames.get(wallet.name.toLowerCase().trim()) ?? 0;

      if (amount) {
        wallet.name = `${wallet.name} ${amount + 1}`;
        walletNames.set(wallet.name.toLowerCase().trim(), amount + 1);
      } else {
        walletNames.set(wallet.name.toLowerCase().trim(), 1);
      }
    });
    return budgetStatement;
  };

  const currentBudgetStatement = useMemo(
    () =>
      prepareWalletsName(
        element?.budgetStatements?.find(
          (bs: BudgetStatement) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)
        )
      ),
    [element, currentMonth]
  );

  useEffect(() => {
    const snapshotLimit = options?.latestSnapshotPeriod?.latest?.startOf('month');
    const limit = getLastMonthWithActualOrForecast(element.budgetStatements)
      .plus({
        month: 1,
      })
      .startOf('month');
    const actualMonth = DateTime.utc().startOf('month');

    const mostRecentMonth = snapshotLimit ? (snapshotLimit > limit ? snapshotLimit : limit) : limit;

    if (viewMonthStr) {
      const month = DateTime.fromFormat(viewMonthStr as string, 'LLLyyyy', { zone: 'utc' });

      if (month && month.isValid && month <= mostRecentMonth) {
        setCurrentMonth(month);
      } else {
        setCurrentMonth(mostRecentMonth);
      }
    } else {
      const month = getLastMonthWithActualOrForecast(element.budgetStatements);
      if (snapshotLimit?.isValid && month < snapshotLimit && snapshotLimit <= actualMonth) {
        setCurrentMonth(snapshotLimit);
      } else if (month) {
        setCurrentMonth(month);
      }
    }
  }, [router.route, router.query, viewMonthStr, element.budgetStatements, options?.latestSnapshotPeriod]);

  const replaceViewMonthRoute = useCallback(
    (viewMonth: string) => {
      router.replace(
        {
          hash: anchor,
          query: {
            ...router.query,
            viewMonth,
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    },
    [anchor, router]
  );

  const hasPreviousMonth = useCallback(() => {
    const limit = getLastMonthWithActualOrForecast(element.budgetStatements, true).minus({
      month: 1,
    });
    const snapshotLimit = options?.latestSnapshotPeriod?.earliest;

    return (
      currentMonth.startOf('month') > limit.startOf('month') ||
      (!!snapshotLimit && currentMonth.startOf('month') > snapshotLimit.startOf('month'))
    );
  }, [element.budgetStatements, options?.latestSnapshotPeriod?.earliest, currentMonth]);

  const handlePreviousMonth = useCallback(() => {
    if (hasPreviousMonth()) {
      options?.onPrevious?.();
      const month = currentMonth.minus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [hasPreviousMonth, options, currentMonth, replaceViewMonthRoute]);

  const hasNextMonth = useCallback(() => {
    const limit = getLastMonthWithActualOrForecast(element.budgetStatements);
    const snapshotLimit = options?.latestSnapshotPeriod?.latest;
    const actualMonth = DateTime.utc().startOf('month');
    return (
      currentMonth.startOf('month') < actualMonth &&
      (currentMonth.startOf('month') < limit.startOf('month') ||
        (!!snapshotLimit && currentMonth.startOf('month') < snapshotLimit.startOf('month')))
    );
  }, [element.budgetStatements, options?.latestSnapshotPeriod, currentMonth]);

  const handleNextMonth = useCallback(() => {
    if (hasNextMonth()) {
      options?.onNext?.();
      const month = currentMonth.plus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [hasNextMonth, options, currentMonth, replaceViewMonthRoute]);

  return {
    currentMonth,
    currentBudgetStatement,
    hasPreviousMonth,
    handlePreviousMonth,
    hasNextMonth,
    handleNextMonth,
  };
};

export default useBudgetStatementPager;
