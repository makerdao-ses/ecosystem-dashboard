import { featureFlags } from '../../../../feature-flags/feature-flags';
import { CURRENT_ENVIRONMENT } from '../../../config/endpoints';

export interface MenuType {
  title: string;
  link: string;
  marginRight: string;
}

const menuItems = [
  {
    title: 'Core Units',
    link: '/',
    marginRight: '32px',
  },
  ...(featureFlags[CURRENT_ENVIRONMENT].FEATURE_GLOBAL_ACTIVITIES
    ? [
        {
          title: 'Activity Feed',
          link: '/activity-feed',
          marginRight: '32px',
        },
      ]
    : []),
] as MenuType[];

export default menuItems;
