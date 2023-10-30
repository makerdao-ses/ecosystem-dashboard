import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardCoreUnitThirdLevelBudget from './CardCoreUnitThirdLevelBudget';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/NewFinances/CardCoreUnitThirdLevelBudget',
  component: CardCoreUnitThirdLevelBudget,

  parameters: {
    chromatic: {
      viewports: [375, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof CardCoreUnitThirdLevelBudget>;

const args = [
  {
    href: '#',
    shortCode: 'CES',
    name: 'Collateral Engineering Services',
    image: 'https://makerdao-ses.github.io/ecosystem-dashboard/core-units/ces-001/ces_logo.png',
  },
];
export const [[LightMode, DarkMode]] = createThemeModeVariants(CardCoreUnitThirdLevelBudget, args);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=23852:184275&mode=dev',
        options: {
          componentStyle: {
            width: 100,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22063:255652&mode=dev',
        options: {
          componentStyle: {
            width: 150,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
DarkMode.parameters = {};
