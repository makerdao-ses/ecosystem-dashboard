import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';

import { LinkTypeEnum } from '@ses/core/enums/link-type.enum';
import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';

import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

import type { TableItems } from '../transparency-report/transparency-report';

export enum DELEGATES_IDS_ENUM {
  ACTUALS = 'actuals',
  FORECAST = 'forecast',
  COMMENTS = 'comments',
}

const useRecognizedDelegates = () => {
  const { isLight } = useThemeContext();
  const [tabsIndex, setTabsIndex] = useState<DELEGATES_IDS_ENUM>(DELEGATES_IDS_ENUM.ACTUALS);
  const [tabsIndexNumber, setTabsIndexNumber] = useState<number>(0);
  const anchor = useUrlAnchor();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  // Delete hard code when start the implementation
  const lastUpdateForBudgetStatement: DateTime = DateTime.fromISO('2021-09-21T09:08:34.123+06:00');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMonth, setCurrentMonth] = useState(DateTime.fromISO('2022-10-05T09:08:34.123'));
  const hasNewComments = true;
  const numbersComments = 5;
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
  const tabItems: TableItems[] = [
    {
      item: 'Actuals',
      id: DELEGATES_IDS_ENUM.ACTUALS,
    },
    {
      item: 'Forecast',
      id: DELEGATES_IDS_ENUM.FORECAST,
    },
  ];
  useEffect(() => {
    if (anchor) {
      const index = Object.values(DELEGATES_IDS_ENUM).findIndex((id) => anchor.indexOf(id) > -1);
      if (index !== -1) {
        const indexKey = Object.keys(DELEGATES_IDS_ENUM)[index];

        setTabsIndex(DELEGATES_IDS_ENUM[indexKey as keyof typeof DELEGATES_IDS_ENUM]);
      }
    }
  }, [anchor]);

  useEffect(() => {
    const values = Object.values(DELEGATES_IDS_ENUM);
    const index = values.indexOf(tabsIndex);

    setTabsIndexNumber(index);
  }, [tabsIndex]);

  return {
    isLight,
    links,
    itemsBreadcrumb,
    isMobile,
    currentMonth,
    lastUpdateForBudgetStatement,
    hasNewComments,
    numbersComments,
    tabItems,
    tabsIndex,
    tabsIndexNumber,
  };
};

export default useRecognizedDelegates;
