import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { getLastUpdateForBudgetStatement } from '@ses/core/business-logic/coreUnits';
import { useAuthContext } from '@ses/core/context/AuthContext';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import useBudgetStatementComments from '@ses/core/hooks/useBudgetStatementComments';
import useBudgetStatementPager from '@ses/core/hooks/useBudgetStatementPager';
import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';
import { BudgetStatus } from '@ses/core/models/dto/coreUnitDTO';
import { budgetStatementCommentsCollectionId } from '@ses/core/utils/collectionsIds';

import { LastVisitHandler } from '@ses/core/utils/lastVisitHandler';

import lightTheme from '@ses/styles/theme/light';

import { DateTime } from 'luxon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CommentsTab from '../../components/Tabs/CommentsTab/CommentsTab';

import type { TableItems } from '../transparency-report/transparency-report';
import type {} from // InnerTableColumn,

'@ses/components/AdvancedInnerTable/AdvancedInnerTable';

import type { DelegatesDto } from '@ses/core/models/dto/delegatesDTO';

export enum DELEGATES_IDS_ENUM {
  ACTUALS = 'actuals',
  FORECAST = 'forecast',
  COMMENTS = 'comments',
}

const links = [
  {
    linkType: LinkTypeEnum.WWW,
    href: 'https://vote.makerdao.com/delegates',
  },
  {
    linkType: LinkTypeEnum.Forum,
    href: 'https://forum.makerdao.com/c/governance/delegates/43',
  },
  {
    linkType: LinkTypeEnum.Discord,
    href: 'https://discord.com/invite/uZxdmZcS',
  },
  {
    linkType: LinkTypeEnum.Youtube,
    href: 'https://www.youtube.com/@MakerDAO/videos',
  },
];

const itemsBreadcrumb = [
  {
    label: 'Finances',
    url: siteRoutes.financesOverview,
  },
  {
    label: 'Recognized Delegates',
    url: siteRoutes.recognizedDelegate,
  },
];

const useRecognizedDelegates = (delegates: DelegatesDto) => {
  const { isLight } = useThemeContext();
  const [tabsIndex, setTabsIndex] = useState<DELEGATES_IDS_ENUM>(DELEGATES_IDS_ENUM.ACTUALS);
  const [tabsIndexNumber, setTabsIndexNumber] = useState<number>(0);
  const [lastVisitHandler, setLastVisitHandler] = useState<LastVisitHandler>();
  const { permissionManager } = useAuthContext();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();
  const anchor = useUrlAnchor();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const allBudgetStatement = delegates?.budgetStatements || [];

  const onPrevious = useCallback(() => {
    if (tabsIndex === DELEGATES_IDS_ENUM.COMMENTS) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [lastVisitHandler, tabsIndex]);

  const onNext = useCallback(() => {
    if (tabsIndex === DELEGATES_IDS_ENUM.COMMENTS) {
      lastVisitHandler?.visit(); // mark the current budget statement as visited before leave
    }
  }, [lastVisitHandler, tabsIndex]);

  const { currentMonth, currentBudgetStatement, handleNextMonth, handlePreviousMonth, hasNextMonth, hasPreviousMonth } =
    useBudgetStatementPager(delegates, {
      onNext,
      onPrevious,
    });

  useEffect(() => {
    // change the tabs when anchor changes
    if (anchor) {
      const index = Object.values(DELEGATES_IDS_ENUM).findIndex((id) => anchor.indexOf(id) > -1);
      if (index !== -1) {
        const indexKey = Object.keys(DELEGATES_IDS_ENUM)[index];

        setTabsIndex(DELEGATES_IDS_ENUM[indexKey as keyof typeof DELEGATES_IDS_ENUM]);
        setTabsIndexNumber(index);
      }
    }
  }, [anchor]);

  useEffect(() => {
    // update lastVisitHandler for the current budgetStatement
    if (currentBudgetStatement) {
      setLastVisitHandler(
        new LastVisitHandler(budgetStatementCommentsCollectionId(currentBudgetStatement.id), permissionManager)
      );
    }
  }, [currentBudgetStatement, permissionManager]);

  const lastUpdateForBudgetStatement = useMemo(
    () => getLastUpdateForBudgetStatement(delegates, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement, delegates]
  );

  // TODO: update when the CTA should be displayed according to the current budget statement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showExpenseReportStatusCTA, setShowExpenseReportStatusCTA] = useState<boolean>(false);
  useEffect(() => {
    switch (currentBudgetStatement?.status) {
      case BudgetStatus.Draft:
        setShowExpenseReportStatusCTA(permissionManager.coreUnit.isCoreUnitAdmin(delegates.id));
        break;
      default:
        setShowExpenseReportStatusCTA(false);
    }
  }, [currentBudgetStatement, delegates.id, permissionManager]);

  // TODO: remove next line (eslint disable)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { comments, numbersComments, commentsLastVisitState, updateHasNewComments } = useBudgetStatementComments(
    currentBudgetStatement,
    lastVisitHandler,
    tabsIndex === DELEGATES_IDS_ENUM.COMMENTS
  );

  const tabItems: TableItems[] = [
    {
      item: 'Actuals',
      id: DELEGATES_IDS_ENUM.ACTUALS,
    },
    {
      item: 'Forecast',
      id: DELEGATES_IDS_ENUM.FORECAST,
    },
    {
      item: (
        <CommentsTab
          hasNewComments={!commentsLastVisitState.isFetching && commentsLastVisitState.hasNewComments}
          numbersComments={numbersComments}
        />
      ),
      id: DELEGATES_IDS_ENUM.COMMENTS,
    },
  ];

  useEffect(() => {
    if (anchor) {
      const index = Object.values(DELEGATES_IDS_ENUM).findIndex((id) => anchor.indexOf(id) > -1);
      if (index !== -1) {
        const indexKey = Object.keys(DELEGATES_IDS_ENUM)[index];
        if (
          isTimestampTrackingAccepted &&
          tabsIndex === DELEGATES_IDS_ENUM.COMMENTS &&
          DELEGATES_IDS_ENUM[indexKey as keyof typeof DELEGATES_IDS_ENUM] !== DELEGATES_IDS_ENUM.COMMENTS
        ) {
          // changing from "comments tab" to any other tab should mark the budget statement as visited
          const visit = async () => {
            const lastVisit = (await lastVisitHandler?.visit()) || DateTime.now().toMillis();
            await updateHasNewComments(DateTime.fromMillis(lastVisit));
          };
          visit();
        }
        setTabsIndex(DELEGATES_IDS_ENUM[indexKey as keyof typeof DELEGATES_IDS_ENUM]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor, isTimestampTrackingAccepted]);

  return {
    isLight,
    links,
    itemsBreadcrumb,
    isMobile,
    tabItems,
    tabsIndex,
    tabsIndexNumber,
    showExpenseReportStatusCTA,
    lastUpdateForBudgetStatement,
    lastVisitHandler,
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    allBudgetStatement,
    comments,
  };
};

export default useRecognizedDelegates;
