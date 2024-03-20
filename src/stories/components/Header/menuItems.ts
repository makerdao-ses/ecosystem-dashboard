import { siteRoutes } from '@ses/config/routes';
import { featureFlags } from '../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../config/endpoints';

export interface MenuType {
  title: string;
  link: string;
  marginRight: string;
  titleMobile?: string;
  mobileOnly?: boolean;
}

type RouteOnHeader =
  | 'finances'
  | 'ecosystemActors'
  | 'coreUnits'
  | 'recognizedDelegate'
  | 'endgame'
  | 'globalActivityFeed'
  | '';

const menuItems = {} as Record<RouteOnHeader, MenuType>;

if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
  menuItems.finances = {
    title: 'Finances',
    link: featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_FINANCES_DASHBOARD_PAGE
      ? siteRoutes.finances()
      : siteRoutes.financesOverview,
    marginRight: '32px',
  };
}

if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_ACTORS) {
  menuItems.ecosystemActors = {
    title: 'Ecosystem Actors',
    link: siteRoutes.ecosystemActors,
    marginRight: '33px',
    titleMobile: 'Eco Actors',
  };
}

menuItems.coreUnits = {
  title: 'Core Units',
  link: siteRoutes.coreUnitsOverview,
  marginRight: '32px',
};

if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
  menuItems.recognizedDelegate = {
    title: 'Delegates',
    link: siteRoutes.recognizedDelegate,
    marginRight: '33px',
  };
}

menuItems.endgame = {
  title: 'Endgame',
  link: siteRoutes.endgame,
  marginRight: '32px',
};

if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_GLOBAL_ACTIVITIES) {
  menuItems.globalActivityFeed = {
    title: 'Activity Feed',
    link: siteRoutes.globalActivityFeed,
    marginRight: '32px',
    mobileOnly: true,
  };
}

export default menuItems;
