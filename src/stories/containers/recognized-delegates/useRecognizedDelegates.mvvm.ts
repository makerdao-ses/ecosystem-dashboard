import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import { LinkTypeEnum } from '@ses/core/enums/link-type.enum';
import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';
import lightTheme from '@ses/styles/theme/light';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { TRANSPARENCY_IDS_ENUM } from '../transparency-report/transparency-report.mvvm';
import type { TableItems } from '../transparency-report/transparency-report';

const useRecognizedDelegates = () => {
  const [tabsIndex, setTabsIndex] = useState<TRANSPARENCY_IDS_ENUM>(TRANSPARENCY_IDS_ENUM.ACTUALS);
  const [tabsIndexNumber, setTabsIndexNumber] = useState<number>(0);
  const anchor = useUrlAnchor();
  const { isTimestampTrackingAccepted } = useCookiesContextTracking();
  // Delete hard code when start the implementation
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const lastUpdateForBudgetStatement: DateTime = DateTime.fromISO('2021-09-21T09:08:34.123+06:00');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentMonth, setCurrentMonth] = useState(DateTime.fromISO('2022-10-05T09:08:34.123'));
  const hasNewComments = true;
  const numbersComments = 6;
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
      id: TRANSPARENCY_IDS_ENUM.ACTUALS,
    },
    {
      item: 'Forecast',
      id: TRANSPARENCY_IDS_ENUM.FORECAST,
    },
  ];

  useEffect(() => {
    if (anchor) {
      const index = Object.values(TRANSPARENCY_IDS_ENUM).findIndex((id) => anchor.indexOf(id) > -1);
      if (index !== -1) {
        const indexKey = Object.keys(TRANSPARENCY_IDS_ENUM)[index];
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

  return {
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
