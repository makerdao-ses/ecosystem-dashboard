import { CategoryBuilder } from '@ses/core/businessLogic/builders/categoriesBuilders';
import { withFixedPositionRelative } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import ContainerModal from './ContainerModal';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/General/ContainerModal',
  component: ContainerModal,
  decorators: [withFixedPositionRelative],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [1140],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof ContainerModal>;
const variantsArgs = [
  {
    headCountCategories: [
      new CategoryBuilder().withCategory('Compensation & Benefits').build(),
      new CategoryBuilder().withCategory('Travel & Entertainment').build(),
      new CategoryBuilder().withCategory('Bonus').build(),
    ],
    noHeadCountCategories: [
      new CategoryBuilder().withCategory('Governance Programs').build(),
      new CategoryBuilder().withCategory('Training Expense').build(),
      new CategoryBuilder().withCategory('Supplies').build(),
      new CategoryBuilder().withCategory('Community Development Expense').build(),
      new CategoryBuilder().withCategory('Software Development Expense').build(),

      new CategoryBuilder().withCategory('Hardware Expense').build(),
      new CategoryBuilder().withCategory('Professional Services').build(),
      new CategoryBuilder().withCategory('Marketing Expense').build(),
      new CategoryBuilder().withCategory('Freight & Duties').build(),
      new CategoryBuilder().withCategory('Contingency Buffer').build(),
      new CategoryBuilder().withCategory('Gas Expense').build(),

      new CategoryBuilder().withCategory('Admin Expense').build(),
    ],
    isCheckedExpandedAll: true,
  },
  {
    headCountCategories: [
      new CategoryBuilder().withCategory('Compensation & Benefits').build(),
      new CategoryBuilder()
        .withCategory('Travel & Entertainment')
        .withSubCategories(['Hotels', 'Airfare', 'Meals', 'Activities & Events', 'Transportation (Uber, Taxi, etc)'])
        .build(),
      new CategoryBuilder().withCategory('Bonus').build(),
    ],
    noHeadCountCategories: [
      new CategoryBuilder().withCategory('Governance Programs').build(),
      new CategoryBuilder().withCategory('Training Expense').build(),
      new CategoryBuilder().withCategory('Supplies').build(),
      new CategoryBuilder().withCategory('Community Development Expense').build(),
    ],
    isCheckedExpandedAll: false,
  },
];

export const [[UnExpanded, UnExpandedDarkMode], [Expanded, ExpandedDarkMode]] = createThemeModeVariants(
  ContainerModal,
  variantsArgs
);

UnExpanded.parameters = {
  figma: {
    component: {
      1140: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19369:219227&t=FobkUgpeTSEk4O7P-4',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -36,
            left: -57,
          },
        },
      },
    },
  } as FigmaParams,
};

Expanded.parameters = {
  figma: {
    component: {
      1140: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19444:213383&t=wTeFraHPRXrZ38Md-4',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -36,
            left: -57,
          },
        },
      },
    },
  } as FigmaParams,
};
