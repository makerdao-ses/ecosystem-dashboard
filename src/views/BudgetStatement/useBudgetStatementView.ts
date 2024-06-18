import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useMemo, useRef, useState } from 'react';
import type { SnapshotLimitPeriods } from '@/core/hooks/useBudgetStatementPager';
import { useUrlAnchor } from '@/core/hooks/useUrlAnchor';
import { AllowedOwnerType } from './types';
import { allowedOwnerTypeToResourceType } from './utils';

// TODO: initialize the currentMonth from the url if it is present due a refresh or direct access
const useBudgetStatementView = (snapshotLimitPeriods: SnapshotLimitPeriods | undefined) => {
  const router = useRouter();
  const ownerTypeQuery = router.query.ownerType as AllowedOwnerType;
  const [snapshotCreated, setSnapshotCreated] = useState<DateTime | undefined>();
  const [currentMonth, setCurrentMonth] = useState(DateTime.utc());
  const anchor = useUrlAnchor();

  const ownerType = useMemo(() => allowedOwnerTypeToResourceType(ownerTypeQuery), [ownerTypeQuery]);

  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, 'code');

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

  const { code, name } = useMemo(() => {
    // map the AllowedOwnerType to required data to show in the UI
    switch (ownerTypeQuery) {
      case AllowedOwnerType.KEEPERS:
        return {
          code: 'KEEPERS',
          name: 'Keepers',
        };
      case AllowedOwnerType.SPFS:
        return {
          code: 'SFPs',
          name: 'Special Purpose Funds',
        };
      case AllowedOwnerType.RECOGNIZED_DELEGATES:
        return {
          code: 'DEL',
          name: 'Recognized Delegates',
        };
    }
  }, [ownerTypeQuery]);

  // pager
  const hasPreviousMonth = useCallback(() => {
    const snapshotLimit = snapshotLimitPeriods?.earliest;

    return !!snapshotLimit && currentMonth.startOf('month') > snapshotLimit?.startOf('month');
  }, [currentMonth, snapshotLimitPeriods?.earliest]);

  const handlePreviousMonth = useCallback(() => {
    if (hasPreviousMonth()) {
      const month = currentMonth.minus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [currentMonth, hasPreviousMonth, replaceViewMonthRoute]);

  const hasNextMonth = useCallback(() => {
    const snapshotLimit = snapshotLimitPeriods?.latest;
    const actualMonth = DateTime.utc().startOf('month');
    return (
      currentMonth.startOf('month') < actualMonth &&
      !!snapshotLimit &&
      currentMonth.startOf('month') < snapshotLimit?.startOf('month')
    );
  }, [currentMonth, snapshotLimitPeriods?.latest]);

  const handleNextMonth = useCallback(() => {
    if (hasNextMonth()) {
      const month = currentMonth.plus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [currentMonth, hasNextMonth, replaceViewMonthRoute]);

  return {
    ownerTypeQuery,
    ownerType,
    ref,
    height,
    showHeader,
    code,
    name,
    snapshotCreated,
    setSnapshotCreated,
    currentMonth,
    hasPreviousMonth,
    hasNextMonth,
    handlePreviousMonth,
    handleNextMonth,
  };
};

export default useBudgetStatementView;
