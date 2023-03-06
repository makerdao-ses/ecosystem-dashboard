import CommentsTab from '@ses/components/tabs/comments-tab/comments-tab';
// import { CURRENT_ENVIRONMENT } from '@ses/config/endpoints';
import { getLastUpdateForBudgetStatement } from '@ses/core/business-logic/core-units';
import { useAuthContext } from '@ses/core/context/AuthContext';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import useBudgetStatementComments from '@ses/core/hooks/useBudgetStatementComments';
import useBudgetStatementPager from '@ses/core/hooks/useBudgetStatementPager';

import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';
import { BudgetStatus } from '@ses/core/models/dto/core-unit.dto';
import { budgetStatementCommentsCollectionId } from '@ses/core/utils/collections-ids';
import { LastVisitHandler } from '@ses/core/utils/last-visit-handler';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import type { TableItems } from './transparency-report';
import type { CoreUnitDto } from '@ses/core/models/dto/core-unit.dto';

export enum TRANSPARENCY_IDS_ENUM {
  ACTUALS = 'actuals',
  FORECAST = 'forecast',
  MKR_VESTING = 'mkr-vesting',
  TRANSFER_REQUESTS = 'transfer-requests',
  AUDIT_REPORTS = 'audit-reports',
  COMMENTS = 'comments',
}

export const useTransparencyReportViewModel = (coreUnit: CoreUnitDto) => {
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;
  const anchor = useUrlAnchor();
  const transparencyTableRef = useRef<HTMLDivElement>(null);
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();

  const [tabsIndex, setTabsIndex] = useState<TRANSPARENCY_IDS_ENUM>(TRANSPARENCY_IDS_ENUM.ACTUALS);
  const [tabsIndexNumber, setTabsIndexNumber] = useState<number>(0);

  useEffect(() => {
    if (anchor) {
      const index = Object.values(TRANSPARENCY_IDS_ENUM).findIndex((id) => anchor.indexOf(id) > -1);
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

    setTabsIndexNumber(index);
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

  const [lastVisitHandler, setLastVisitHandler] = useState<LastVisitHandler>();

  const onPrevious = useCallback(() => {
    if (tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [lastVisitHandler, tabsIndex]);

  const onNext = useCallback(() => {
    if (tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [lastVisitHandler, tabsIndex]);

  const { currentMonth, currentBudgetStatement, handleNextMonth, handlePreviousMonth, hasNextMonth, hasPreviousMonth } =
    useBudgetStatementPager(coreUnit, {
      onNext,
      onPrevious,
    });

  useEffect(() => {
    // update lastVisitHandler for the current budgetStatement
    if (currentBudgetStatement) {
      setLastVisitHandler(
        new LastVisitHandler(budgetStatementCommentsCollectionId(currentBudgetStatement.id), permissionManager)
      );
    }
  }, [currentBudgetStatement, permissionManager]);

  const longCode = coreUnit?.code;

  const lastUpdateForBudgetStatement = useMemo(
    () => getLastUpdateForBudgetStatement(coreUnit, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement, coreUnit]
  );

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

  const { comments, numbersComments, commentsLastVisitState, updateHasNewComments } = useBudgetStatementComments(
    currentBudgetStatement,
    lastVisitHandler,
    tabsIndex === TRANSPARENCY_IDS_ENUM.COMMENTS
  );

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

  tabItems.push({
    item: 'MKR Vesting',
    id: TRANSPARENCY_IDS_ENUM.MKR_VESTING,
  });

  tabItems.push({
    item: 'Transfer Requests',
    id: TRANSPARENCY_IDS_ENUM.TRANSFER_REQUESTS,
  });

  tabItems.push({
    item: 'Audit Reports',
    id: TRANSPARENCY_IDS_ENUM.AUDIT_REPORTS,
  });

  tabItems.push({
    item: (
      <CommentsTab
        hasNewComments={!commentsLastVisitState.isFetching && commentsLastVisitState.hasNewComments}
        numbersComments={numbersComments}
      />
    ),
    id: TRANSPARENCY_IDS_ENUM.COMMENTS,
  });

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
    longCode,
    hasPreviousMonth,
    comments,
    lastVisitHandler,
  };
};
