import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getCurrentOrLastMonthWithData, getLastMonthWithActualOrForecast } from '../business-logic/core-units';
import { API_MONTH_TO_FORMAT } from '../utils/date.utils';
import { useUrlAnchor } from './useUrlAnchor';
import type { BudgetStatementDto } from '../models/dto/core-unit.dto';

type WithBudget = {
  budgetStatements: BudgetStatementDto[];
};

type BudgetStatementPagerOptions = {
  onPrevious?: () => void;
  onNext?: () => void;
};

const useBudgetStatementPager = (element: WithBudget, options?: BudgetStatementPagerOptions) => {
  const router = useRouter();
  const viewMonthStr = router.query.viewMonth;
  const anchor = useUrlAnchor();
  const [currentMonth, setCurrentMonth] = useState(DateTime.local());

  const prepareWalletsName = (budgetStatement?: BudgetStatementDto) => {
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
          (bs: BudgetStatementDto) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)
        )
      ),
    [element, currentMonth]
  );

  useEffect(() => {
    if (viewMonthStr) {
      const month = DateTime.fromFormat(viewMonthStr as string, 'LLLyyyy');
      setCurrentMonth(month);
    } else {
      const month = getCurrentOrLastMonthWithData(element.budgetStatements);
      if (month) {
        setCurrentMonth(month);
      }
    }
  }, [router.route, router.query, viewMonthStr, element.budgetStatements]);

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
    return currentMonth.startOf('month') > limit.startOf('month');
  }, [element.budgetStatements, currentMonth]);

  const handlePreviousMonth = useCallback(() => {
    if (hasPreviousMonth()) {
      options?.onPrevious?.();
      const month = currentMonth.minus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [hasPreviousMonth, options, currentMonth, replaceViewMonthRoute]);

  const hasNextMonth = useCallback(() => {
    const limit = getLastMonthWithActualOrForecast(element.budgetStatements).plus({
      month: 1,
    });
    return currentMonth.startOf('month') < limit.startOf('month');
  }, [element.budgetStatements, currentMonth]);

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
