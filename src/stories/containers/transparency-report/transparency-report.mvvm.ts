import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import {
  getAllCommentsBudgetStatementLine,
  getCurrentOrLastMonthWithData,
  getLastMonthWithActualOrForecast,
  getLastUpdateForBudgetStatement,
} from '@ses/core/business-logic/core-units';
import { useAuthContext } from '@ses/core/context/AuthContext';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import { useFlagsActive } from '@ses/core/hooks/useFlagsActive';
import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';
import { BudgetStatus } from '@ses/core/models/dto/core-unit.dto';
import { budgetStatementCommentsCollectionId } from '@ses/core/utils/collections-ids';
import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date.utils';
import { LastVisitHandler } from '@ses/core/utils/last-visit-handler';
import { isActivity } from '@ses/core/utils/types-helpers';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import { featureFlags } from '../../../../feature-flags/feature-flags';
import type { TableItems } from './transparency-report';
import type {
  ActivityFeedDto,
  BudgetStatementDto,
  CommentsBudgetStatementDto,
  CoreUnitDto,
} from '@ses/core/models/dto/core-unit.dto';
import type { WithDate } from '@ses/core/utils/types-helpers';

export enum TRANSPARENCY_IDS_ENUM {
  ACTUALS = 'actuals',
  FORECAST = 'forecast',
  MKR_VESTING = 'mkr-vesting',
  TRANSFER_REQUESTS = 'transfer-requests',
  AUDIT_REPORTS = 'audit-reports',
  COMMENTS = 'comments',
}
const DISABLED_ID = [
  featureFlags[CURRENT_ENVIRONMENT].FEATURE_MKR_VESTING ? null : TRANSPARENCY_IDS_ENUM.MKR_VESTING,
  featureFlags[CURRENT_ENVIRONMENT].FEATURE_AUDIT_REPORTS ? null : TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS,
];

type CommentsLastVisitState = {
  hasNewComments: boolean;
  isFetching: boolean;
};
type CommentLastVisitAction = {
  type: 'START_FETCHING' | 'SET_HAS_NEW_COMMENTS';
  hasNewComments?: boolean;
};

export const useTransparencyReportViewModel = (coreUnit: CoreUnitDto) => {
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;
  const viewMonthStr = query.viewMonth;
  const anchor = useUrlAnchor();
  const transparencyTableRef = useRef<HTMLDivElement>(null);
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();

  const [tabsIndex, setTabsIndex] = useState<TRANSPARENCY_IDS_ENUM>(TRANSPARENCY_IDS_ENUM.ACTUALS);
  const [tabsIndexNumber, setTabsIndexNumber] = useState<number>(0);

  const [currentMonth, setCurrentMonth] = useState(DateTime.now());

  useEffect(() => {
    if (anchor) {
      const index = Object.values(TRANSPARENCY_IDS_ENUM).findIndex(
        (id) => anchor.indexOf(id) > -1 && !DISABLED_ID.includes(id)
      );
      if (index !== -1) {
        const indexKey = Object.keys(TRANSPARENCY_IDS_ENUM)[index];
        if (
          isTimestampTrackingAccepted &&
          tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS &&
          TRANSPARENCY_IDS_ENUM[indexKey as keyof typeof TRANSPARENCY_IDS_ENUM] !== TRANSPARENCY_IDS_ENUM.COMMENTS
        ) {
          // changing from "comments tab" to any other tab should mark the budget statement as visited
          const visit = async () => {
            const lastVisit = (await lastVisitHandler?.visit()) || DateTime.now().toMillis();
            await updateHasNewComments(DateTime.fromMillis(lastVisit));
          };
          visit();
        }
        setTabsIndex(TRANSPARENCY_IDS_ENUM[indexKey as keyof typeof TRANSPARENCY_IDS_ENUM]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor, isTimestampTrackingAccepted]);

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
  }, [anchor, scrolled]);

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
  }, [router.route, router.query, viewMonthStr, coreUnit?.budgetStatements]);

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
    const limit = getLastMonthWithActualOrForecast(coreUnit?.budgetStatements, true).minus({
      month: 1,
    });
    return currentMonth.startOf('month') > limit.startOf('month');
  }, [coreUnit?.budgetStatements, currentMonth]);

  const handlePreviousMonth = useCallback(() => {
    if (hasPreviousMonth()) {
      if (tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS) {
        lastVisitHandler.visit(); // mark the current budget statement as visited before leave
      }
      const month = currentMonth.minus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setCurrentMonth, currentMonth, router, tabsIndex]);

  const hasNextMonth = useCallback(() => {
    const limit = getLastMonthWithActualOrForecast(coreUnit?.budgetStatements).plus({
      month: 1,
    });
    return currentMonth.startOf('month') < limit.startOf('month');
  }, [coreUnit?.budgetStatements, currentMonth]);

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
        coreUnit?.budgetStatements?.find(
          (bs: BudgetStatementDto) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)
        )
      ),
    [coreUnit, currentMonth]
  );
  const lastVisitHandler = useMemo(
    () =>
      new LastVisitHandler(budgetStatementCommentsCollectionId(currentBudgetStatement?.id || ''), permissionManager),
    [permissionManager, currentBudgetStatement]
  );

  const handleNextMonth = useCallback(() => {
    if (hasNextMonth()) {
      if (tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS) {
        lastVisitHandler.visit(); // mark the current budget statement as visited before leave
      }
      const month = currentMonth.plus({ month: 1 });
      replaceViewMonthRoute(month.toFormat('LLLyyyy'));
      setCurrentMonth(month);
    }
  }, [hasNextMonth, tabsIndex, currentMonth, replaceViewMonthRoute, lastVisitHandler]);

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
  }, [currentBudgetStatement]);

  const numbersComments = useMemo(() => comments.length, [comments]);
  const longCode = coreUnit?.code;

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

  // "hasNewComments" related logic
  const [commentsLastVisitState, commentsLastVisitDispatch] = useReducer(
    (state: CommentsLastVisitState, action: CommentLastVisitAction): never | CommentsLastVisitState => {
      switch (action.type) {
        case 'START_FETCHING':
          return {
            hasNewComments: false,
            isFetching: true,
          };
        case 'SET_HAS_NEW_COMMENTS':
          return {
            isFetching: false,
            hasNewComments: !!action.hasNewComments,
          };
        default:
          throw new Error(`Unhandled action type: ${action.type}. Current state: ${state}`);
      }
    },
    {
      isFetching: false,
      hasNewComments: false,
    }
  );

  const updateHasNewComments = async (date?: DateTime) => {
    commentsLastVisitDispatch({ type: 'START_FETCHING' });
    const lastVisit = date || (await lastVisitHandler.lastVisit());
    if (lastVisit) {
      let hasNewComments: boolean = comments.length > 0 && !lastVisit;
      for (const comment of comments) {
        const commentDate = isActivity(comment)
          ? DateTime.fromISO(comment.created_at)
          : DateTime.fromISO(comment.timestamp);
        if (commentDate > lastVisit) {
          hasNewComments = true;
          break;
        }
      }
      commentsLastVisitDispatch({
        type: 'SET_HAS_NEW_COMMENTS',
        hasNewComments,
      });
    } else {
      commentsLastVisitDispatch({
        type: 'SET_HAS_NEW_COMMENTS',
        hasNewComments: comments.length > 0,
      });
    }
  };
  useEffect(() => {
    updateHasNewComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastVisitHandler, comments]);

  // update the visit date (preventing multiple renderings)
  let timeout: NodeJS.Timeout;
  useEffect(() => {
    clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    timeout = setTimeout(async () => {
      if (isTimestampTrackingAccepted && tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS) {
        const lastVisit = (await lastVisitHandler.visit()) || DateTime.now().toMillis();
        await updateHasNewComments(DateTime.fromMillis(lastVisit));
      }
    }, 3000);
    return () => {
      clearTimeout(timeout);
    };
  }, [lastVisitHandler, isTimestampTrackingAccepted, tabsIndex]);
  // end of "hasNewComments" related logic

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
    lastVisitHandler,
    hasNewComments: !commentsLastVisitState.isFetching && commentsLastVisitState.hasNewComments,
  };
};
