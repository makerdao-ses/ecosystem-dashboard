import { useHeaderSummary } from '@ses/core/hooks/useHeaderSummary';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { siteRoutes } from '@/config/routes';
import type { SnapshotLimitPeriods } from '@/core/hooks/useBudgetStatementPager';
import { useUrlAnchor } from '@/core/hooks/useUrlAnchor';
import { AllowedOwnerType } from './types';
import { allowedOwnerTypeToResourceType } from './utils';

const useBudgetStatementView = (snapshotLimitPeriods: SnapshotLimitPeriods | undefined) => {
  const router = useRouter();
  const viewMonthStr = router.query.viewMonth;
  const ownerTypeQuery = router.query.ownerType as AllowedOwnerType;
  const [snapshotCreated, setSnapshotCreated] = useState<DateTime | undefined>();
  const [currentMonth, setCurrentMonth] = useState(DateTime.utc());
  const anchor = useUrlAnchor();

  const ownerType = useMemo(() => allowedOwnerTypeToResourceType(ownerTypeQuery), [ownerTypeQuery]);

  const ref = useRef<HTMLDivElement>(null);
  const { height, showHeader } = useHeaderSummary(ref, 'code');

  useEffect(() => {
    // initialize the currentMonth from the url if it is present due a refresh or direct access
    const snapshotLimit = snapshotLimitPeriods?.latest?.startOf('month');
    const actualMonth = DateTime.utc().startOf('month');

    const mostRecentMonth = snapshotLimit ?? actualMonth;

    if (viewMonthStr) {
      const month = DateTime.fromFormat(viewMonthStr as string, 'LLLyyyy', { zone: 'utc' });

      if (month && month.isValid && month <= mostRecentMonth) {
        setCurrentMonth(month);
      } else {
        setCurrentMonth(mostRecentMonth);
      }
    } else {
      setCurrentMonth(snapshotLimit ?? actualMonth);
    }
  }, [router.route, router.query, viewMonthStr, snapshotLimitPeriods]);

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

  const { code, name, seo, breadcrumbItems } = useMemo(() => {
    // map the AllowedOwnerType to required data to show in the UI
    switch (ownerTypeQuery) {
      case AllowedOwnerType.KEEPERS:
        return {
          code: 'KEEPERS',
          name: 'Keepers',
          seo: {
            title: 'MakerDAO Teams | Keepers',
            description:
              'MakerDAO Ecosystem Actors Keepers page provides a comprehensive overview of Keepers on-chain activity with monthly account snapshot.',
          },
          breadcrumbItems: [
            {
              label: 'Finances',
              url: siteRoutes.finances(),
            },
            {
              label: 'Scope Framework Budget',
              url: siteRoutes.finances('scopes'),
            },
            {
              label: 'Protocol Scope',
              url: siteRoutes.finances('scopes/PRO'),
            },
            {
              label: 'Keepers',
              url: siteRoutes.budgetStatements(ownerTypeQuery),
            },
          ],
        };
      case AllowedOwnerType.SPFS:
        return {
          code: 'SFPs',
          name: 'Special Purpose Funds',
          seo: {
            title: 'MakerDAO Teams | Special Purpose Funds',
            description:
              'MakerDAO Ecosystem Actors Special Purpose Funds page provides a comprehensive overview of Special Purpose Funds on-chain activity with monthly account snapshot.',
          },
          breadcrumbItems: [
            {
              label: 'Finances',
              url: siteRoutes.finances(),
            },
            {
              label: 'MakerDAO Legacy Budget',
              url: siteRoutes.finances('legacy'),
            },
            {
              label: 'Special Purpose Funds',
              url: siteRoutes.budgetStatements(ownerTypeQuery),
            },
          ],
        };
      case AllowedOwnerType.ALIGNED_DELEGATES:
        return {
          code: 'DEL',
          name: 'Aligned Delegates',
          seo: {
            title: 'MakerDAO Teams | Aligned Delegates',
            description:
              'MakerDAO Ecosystem Actors Aligned Delegates page provides a comprehensive overview of Aligned Delegates financial activity through monthly budget statements.',
          },
          breadcrumbItems: [
            {
              label: 'Finances',
              url: siteRoutes.finances(),
            },
            {
              label: 'Atlas Immutable Budget',
              url: siteRoutes.finances('immutable'),
            },
            {
              label: 'Aligned Delegates',
              url: siteRoutes.budgetStatements(ownerTypeQuery),
            },
          ],
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
    seo,
    breadcrumbItems,
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
