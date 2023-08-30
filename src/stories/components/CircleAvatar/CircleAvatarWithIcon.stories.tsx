import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import MultiUsers from '../svg/MultiUsers';
import CircleAvatarWithIcon from './CircleAvatarWithIcon';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/CircleAvatarWithIcon',
  component: CircleAvatarWithIcon,
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CircleAvatarWithIcon>;

const args = [
  {
    icon: <MultiUsers />,
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(CircleAvatarWithIcon, args);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=23882:188114&mode=dev',
        options: {
          style: {
            left: -4,
            top: -2,
          },
          componentStyle: {
            width: 32,
          },
        },
      },
    },
  },
};
DarkMode.parameters = {};
