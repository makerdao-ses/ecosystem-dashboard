import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import {
  getAllCommentsBudgetStatementLine,
  getCurrentOrLastMonthWithData,
  getLastMonthWithActualOrForecast,
  getLastUpdateForBudgetStatement,
} from '../../../core/business-logic/core-units';
import { useAuthContext } from '../../../core/context/AuthContext';
import { useLastVisit } from '../../../core/hooks/last-visit-hook';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { useUrlAnchor } from '../../../core/hooks/useUrlAnchor';
import {
  ActivityFeedDto,
  BudgetStatementDto,
  BudgetStatus,
  CommentsBudgetStatementDto,
  CoreUnitDto,
} from '../../../core/models/dto/core-unit.dto';
import { API_MONTH_TO_FORMAT } from '../../../core/utils/date.utils';
import { WithDate } from '../../../core/utils/types-helpers';
import { TableItems } from './transparency-report';

export enum TRANSPARENCY_IDS_ENUM {
  ACTUALS = 'actuals',
  FORECAST = 'forecast',
  MKR_VESTING = 'mkr-vesting',
  TRANSFER_REQUESTS = 'transfer-requests',
  AUDIT_REPORTS = 'audit-reports',
  COMMENTS = 'comments',
}
const DISABLED_ID = [TRANSPARENCY_IDS_ENUM.MKR_VESTING, TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS];

export const useTransparencyReportViewModel = (coreUnit: CoreUnitDto) => {
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;
  const viewMonthStr = query.viewMonth;
  const anchor = useUrlAnchor();
  const transparencyTableRef = useRef<HTMLDivElement>(null);
  const { permissionManager } = useAuthContext();

  const [tabsIndex, setTabsIndex] = useState<TRANSPARENCY_IDS_ENUM>(TRANSPARENCY_IDS_ENUM.ACTUALS);
  const [tabsIndexNumber, setTabsIndexNumber] = useState<number>(0);

  const [currentMonth, setCurrentMonth] = useState(DateTime.now());
  const [hasNewComments, setHasNewComments] = useState(false);
  // TDOD: Delete this before merge
  console.log({ hasNewComments });
  const lastVisited = useLastVisit('new-comments', false);

  useEffect(() => {
    if (anchor) {
      const index = Object.values(TRANSPARENCY_IDS_ENUM).findIndex(
        (id) => anchor.indexOf(id) > -1 && !DISABLED_ID.includes(id)
      );
      if (index !== -1) {
        const indexKey = Object.keys(TRANSPARENCY_IDS_ENUM)[index];
        setTabsIndex(TRANSPARENCY_IDS_ENUM[indexKey as keyof typeof TRANSPARENCY_IDS_ENUM]);
      }
    }
  }, [anchor]);

  useEffect(() => {
    const values = Object.values(TRANSPARENCY_IDS_ENUM);
    const index = values.indexOf(tabsIndex);
    let difference = 0;
    values.forEach((value, i) => (DISABLED_ID.includes(value) && i < index ? difference++ : null));

    setTabsIndexNumber(index - difference);
  }, [tabsIndex]);

  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (anchor === '') {
      setScrolled(true);
    }
    if (!scrolled && anchor && Object.values(TRANSPARENCY_IDS_ENUM).includes(anchor as TRANSPARENCY_IDS_ENUM)) {
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
      if (currentMonth) return;
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

  const hasPreviousMonth = () => {
    const limit = getLastMonthWithActualOrForecast(coreUnit?.budgetStatements, true).minus({
      month: 1,
    });
    return currentMonth.startOf('month') > limit.startOf('month');
  };

  const handlePreviousMonth = useCallback(() => {
    if (hasPreviousMonth()) {
      const month = currentMonth.minus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
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

  const currentBudgetStatement = useMemo(() => {
    return prepareWalletsName(
      coreUnit?.budgetStatements?.find(
        (bs: BudgetStatementDto) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)
      )
    );
  }, [coreUnit, currentMonth]);

  const comments = useMemo(() => {
    const comments = getAllCommentsBudgetStatementLine(currentBudgetStatement) as (CommentsBudgetStatementDto &
      WithDate)[];
    let activities = currentBudgetStatement?.activityFeed.filter(
      (activity) => activity.event === 'CU_BUDGET_STATEMENT_CREATED'
    ) as (ActivityFeedDto & WithDate)[];
    activities =
      activities?.map((activity) => {
        activity.date = DateTime.fromISO(activity.created_at);
        return activity;
      }) || [];
    const result = (comments as unknown[]).concat(activities) as WithDate[];
    result.sort((a, b) => a.date.toMillis() - b.date.toMillis());

    return result as unknown as (CommentsBudgetStatementDto | ActivityFeedDto)[];
  }, [currentBudgetStatement, coreUnit]);

  const numbersComments = useMemo(() => comments.length, [comments]);
  const longCode = coreUnit?.code;
  useEffect(() => {
    comments.forEach((comment: ActivityFeedDto | CommentsBudgetStatementDto) => {
      if (Object.keys(comment).includes('timestamp')) {
        if (lastVisited < (comment as CommentsBudgetStatementDto).timestamp) {
          const timestamp = DateTime.fromISO((comment as CommentsBudgetStatementDto).timestamp).toMillis();
          console.log('timestamp', timestamp);
          setHasNewComments(true);
          return '';
        }
      }
      if (Object.keys(comment).includes('created_at')) {
        if (lastVisited < (comment as ActivityFeedDto).created_at) {
          setHasNewComments(true);
          return '';
        }
      }
    });
  }, [comments, lastVisited]);

  const [isEnabled] = useFlagsActive();

  const tabItems: TableItems[] = [
    {
      item: 'Actuals',
      id: TRANSPARENCY_IDS_ENUM.ACTUALS,
    },
    {
      item: 'Forecast',
      id: TRANSPARENCY_IDS_ENUM.FORECAST,
    },
  ];
  if (isEnabled('FEATURE_MKR_VESTING')) {
    tabItems.push({
      item: 'MKR Vesting',
      id: TRANSPARENCY_IDS_ENUM.MKR_VESTING,
    });
  }
  tabItems.push({
    item: 'Transfer Requests',
    id: TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS,
  });
  if (isEnabled('FEATURE_AUDIT_REPORTS')) {
    tabItems.push({
      item: 'Audit Reports',
      id: TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS,
    });
  }

  const lastUpdateForBudgetStatement = useMemo(
    () => getLastUpdateForBudgetStatement(coreUnit, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement, coreUnit]
  );

  const differenceInDays = useMemo(() => {
    if (!lastUpdateForBudgetStatement) return null;

    const dayCount = DateTime.now().diff(lastUpdateForBudgetStatement, ['day', 'milliseconds']).days;
    return dayCount === 0 ? 'Today' : `${dayCount} ${dayCount === 1 ? 'Day' : 'Days'}`;
  }, [lastUpdateForBudgetStatement]);

  const [showExpenseReportStatusCTA, setShowExpenseReportStatusCTA] = useState<boolean>(false);
  useEffect(() => {
    switch (currentBudgetStatement?.status) {
      case BudgetStatus.Draft:
        if (!coreUnit.auditors?.length) {
          setShowExpenseReportStatusCTA(false);
          break;
        }
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isCoreUnitAdmin(coreUnit));
        break;
      case BudgetStatus.Review:
      case BudgetStatus.Escalated:
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isAuditor(coreUnit));
        break;
      default:
        setShowExpenseReportStatusCTA(false);
    }
  }, [coreUnit, currentBudgetStatement, permissionManager]);

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
    tabsIndexNumber,
    showExpenseReportStatusCTA,
    lastUpdateForBudgetStatement,
    numbersComments,
    differenceInDays,
    longCode,
    hasPreviousMonth,
    comments,
  };
};
