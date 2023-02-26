import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { getLastUpdateForBudgetStatement } from '@ses/core/business-logic/core-units';
import { useAuthContext } from '@ses/core/context/AuthContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { LinkTypeEnum } from '@ses/core/enums/link-type.enum';
import useBudgetStatementPager from '@ses/core/hooks/useBudgetStatementPager';
import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';
import { BudgetStatus } from '@ses/core/models/dto/core-unit.dto';
import lightTheme from '@ses/styles/theme/light';
import { useEffect, useMemo, useState } from 'react';
import CommentsTab from '../../components/tabs/comments-tab/comments-tab';
import type { TableItems } from '../transparency-report/transparency-report';
import type { DelegatesDto } from '@ses/core/models/dto/delegates.dto';

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
  const { permissionManager } = useAuthContext();
  const anchor = useUrlAnchor();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));

  const hasNewComments = true;
  const numbersComments = 5;

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
      item: <CommentsTab hasNewComments={hasNewComments} numbersComments={numbersComments} />,
      id: DELEGATES_IDS_ENUM.COMMENTS,
    },
  ];

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

  const { currentMonth, currentBudgetStatement, handleNextMonth, handlePreviousMonth, hasNextMonth, hasPreviousMonth } =
    useBudgetStatementPager(delegates);

  const lastUpdateForBudgetStatement = useMemo(
    () => getLastUpdateForBudgetStatement(delegates, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement, delegates]
  );

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
    // budget statement pager
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
  };
};

export default useRecognizedDelegates;
