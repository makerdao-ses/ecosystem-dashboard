import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import {
  getCurrentOrLastMonthWithData,
  getLastMonthWithActualOrForecast,
  getLastMonthWithData,
  getNumberComments,
} from '../../../core/business-logic/core-units';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { useUrlAnchor } from '../../../core/hooks/useUrlAnchor';
import { BudgetStatementDto, CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { API_MONTH_TO_FORMAT } from '../../../core/utils/date.utils';

const TRANSPARENCY_IDS = ['actuals', 'forecast', 'mkr-vesting', 'transfer-requests', 'audit-reports', 'comments'];

export const useTransparencyReportViewModel = (coreUnit: CoreUnitDto) => {
  const [isEnabled] = useFlagsActive();
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;
  const viewMonthStr = query.viewMonth;
  const anchor = useUrlAnchor();
  const transparencyTableRef = useRef<HTMLDivElement>(null);

  const [tabsIndex, setTabsIndex] = useState(0);

  const [currentMonth, setCurrentMonth] = useState(DateTime.now());

  useEffect(() => {
    if (anchor) {
      const index = TRANSPARENCY_IDS.findIndex((id) => anchor.indexOf(id) > -1);
      setTabsIndex(index);
    }
  }, [anchor]);

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (anchor === '') {
      setScrolled(true);
    }
    if (!scrolled && anchor && TRANSPARENCY_IDS.includes(anchor)) {
      setScrolled(true);
      let offset = (transparencyTableRef?.current?.offsetTop || 0) - 280;
      const windowsWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (windowsWidth < 834) {
        offset += 100;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor]);

  useEffect(() => {
    if (viewMonthStr) {
      const month = DateTime.fromFormat(viewMonthStr as string, 'LLLyyyy');
      setCurrentMonth(month);
    } else {
      const month = getCurrentOrLastMonthWithData(coreUnit?.budgetStatements);

      if (month) {
        setCurrentMonth(month);
      }
    }
  }, [router.route, router.query]);

  const replaceViewMonthRoute = (viewMonth: string) => {
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
  };

  const handlePreviousMonth = useCallback(() => {
    const month = currentMonth.minus({ month: 1 });
    replaceViewMonthRoute(month.toFormat('LLLyyyy'));
    setCurrentMonth(month);
  }, [setCurrentMonth, currentMonth]);

  const hasNextMonth = () => {
    const limit = getLastMonthWithActualOrForecast(coreUnit?.budgetStatements).plus({
      month: 1,
    });
    return currentMonth.startOf('month') < limit.startOf('month');
  };

  const handleNextMonth = useCallback(() => {
    if (hasNextMonth()) {
      const month = currentMonth.plus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [setCurrentMonth, currentMonth]);

  const currentBudgetStatement = useMemo(() => {
    return coreUnit?.budgetStatements?.find(
      (bs: BudgetStatementDto) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)
    );
  }, [coreUnit, currentMonth]);

  const numbersComments = getNumberComments(coreUnit);
  const longCode = coreUnit?.code;

  const tabItems = [
    {
      item: 'Actuals',
      id: TRANSPARENCY_IDS[0],
    },
    {
      item: 'Forecast',
      id: TRANSPARENCY_IDS[1],
    },
    {
      item: 'MKR Vesting',
      id: TRANSPARENCY_IDS[2],
    },
    {
      item: 'Transfer Requests',
      id: TRANSPARENCY_IDS[3],
    },
    {
      item: 'Audit Reports',
      id: TRANSPARENCY_IDS[4],
    },
  ];

  if (isEnabled('FEATURE_TRANSPARENCY_COMMENTS')) {
    tabItems.push({
      item: `Comments (${numbersComments})`,
      id: TRANSPARENCY_IDS[5],
    });
  }
  const lastMonthWithData = getLastMonthWithData(coreUnit?.budgetStatements);

  const differenceInDays = useMemo(() => {
    if (!lastMonthWithData) return null;

    const dayCount = DateTime.now().diff(lastMonthWithData, ['day', 'milliseconds']).days;
    return dayCount === 0 ? 'Today' : `${dayCount} ${dayCount === 1 ? 'Day' : 'Days'}`;
  }, [lastMonthWithData]);

  return {
    tabItems,
    code,
    transparencyTableRef,
    currentMonth,
    handlePreviousMonth,
    handleNextMonth,
    hasNextMonth,
    currentBudgetStatement,
    tabsIndex,
    lastMonthWithData,
    getNumberComments,
    numbersComments,
    differenceInDays,
    longCode,
  };
};
