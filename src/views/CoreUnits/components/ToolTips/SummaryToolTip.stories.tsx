import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { TeamCategory, TeamStatus } from '@/core/models/interfaces/types';
import { SummaryToolTip } from './SummaryToolTip';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof SummaryToolTip> = {
  title: 'Fusion/CoreUnits/SummaryToolTip',
  component: SummaryToolTip,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
    date: new Date('2023-07-14T09:08:34.123'),
  },
};
export default meta;
const variantsArgs = [
  {
    code: 'SES',
    status: TeamStatus.Accepted,
    name: 'Sustainable Ecosystem Scaling',
    imageUrl: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ses-001/logo.png',
    statusModified: new Date(),
    href: '#',
    categories: [TeamCategory.Operational, TeamCategory.Legal],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(SummaryToolTip, variantsArgs);
export { LightMode, DarkMode };
LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2046-28206&t=zTsJwOZWyIxBYwi8-4',
        options: {
          style: {
            left: -4,
            top: 0,
          },
          componentStyle: {
            width: 365,
          },
        },
      },
    },
  },
};
