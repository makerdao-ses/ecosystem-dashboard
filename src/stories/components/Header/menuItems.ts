import { siteRoutes } from '@ses/config/routes';
import { featureFlags } from '../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../config/endpoints';

export interface MenuType {
  title: string;
  link: string;
  marginRight: string;
}

const menuItems = [
  ...(featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW
    ? [
        {
          title: 'Finances',
          link: siteRoutes.financesOverview,
          marginRight: '32px',
        },
      ]
    : []),
  {
    title: 'Core Units',
    link: siteRoutes.coreUnitsOverview,
    marginRight: '32px',
  },
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
