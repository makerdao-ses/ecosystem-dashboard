import { siteRoutes } from '@ses/config/routes';
import { featureFlags } from '../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../config/endpoints';

export interface MenuType {
  title: string;
  link: string;
  marginRight: string;
  titleMobile?: string;
}

const menuItems: { [key: string]: MenuType } = {};

if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_FINANCES_OVERVIEW) {
  menuItems.finances = {
    title: 'Finances',
    link: siteRoutes.financesOverview,
    marginRight: '26px',
  };
}

if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_ECOSYSTEM_ACTORS) {
  menuItems.ecosystemActors = {
    title: 'Ecosystem Actors',
    link: siteRoutes.ecosystemActors,
    marginRight: '28px',
    titleMobile: 'Eco Actors',
  };
}

menuItems.coreUnits = {
  title: 'Core Units',
  link: siteRoutes.coreUnitsOverview,
  marginRight: '28px',
};

if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_RECOGNIZED_DELEGATES) {
  menuItems.recognizedDelegate = {
    title: 'Delegates',
    link: siteRoutes.recognizedDelegate,
    marginRight: '30px',
  };
}

if (featureFlags[CURRENT_ENVIRONMENT].FEATURE_GLOBAL_ACTIVITIES) {
  menuItems.globalActivityFeed = {
    title: 'Activity Feed',
    link: siteRoutes.globalActivityFeed,
    marginRight: '32px',
  };
}

export default menuItems;
