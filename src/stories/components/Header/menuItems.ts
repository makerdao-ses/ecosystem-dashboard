import { siteRoutes } from '@ses/config/routes';
import { featureFlags } from '../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../config/endpoints';

export interface MenuType {
  title: string;
  link: string;
  marginRight: string;
  titleMobile?: string;
}

const menuItems = [
  ...(featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW
    ? [
        {
          title: 'Finances',
          link: siteRoutes.financesOverview,
          marginRight: '26px',
        },
      ]
    : []),
  ...(featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_ACTORS
    ? [
        {
          title: 'Ecosystem Actors',
          link: siteRoutes.ecosystemActors,
          marginRight: '28px',
          titleMobile: 'Eco Actors',
        },
      ]
    : []),
  {
    title: 'Core Units',
    link: siteRoutes.coreUnitsOverview,
    marginRight: '28px',
  },
  ...(featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES
    ? [
        {
          title: 'Delegates',
          link: siteRoutes.recognizedDelegate,
          marginRight: '30px',
        },
      ]
    : []),
  ...(featureFlags[CURRENT_ENVIRONMENT].FEATURE_GLOBAL_ACTIVITIES
    ? [
        {
          title: 'Activity Feed',
          link: siteRoutes.globalActivityFeed,
          marginRight: '32px',
        },
      ]
    : []),
] as MenuType[];

export default menuItems;
