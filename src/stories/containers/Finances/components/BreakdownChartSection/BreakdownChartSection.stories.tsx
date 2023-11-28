import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { atlasBudget, legacyBudget, scopeBudget } from '../../utils/utils';
import BreakdownChartSection from './BreakdownChartSection';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BreakdownChartSection> = {
  title: 'Components/NewFinances/Section/BreakdownChartSection',
  component: BreakdownChartSection,

  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    year: 2023,
    newAtlasBudgetWithBorders: atlasBudget,
    newScopeBudgetWithBorders: scopeBudget,
    newLegacyBudgetWithBorders: legacyBudget,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(BreakdownChartSection, args);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24365:94944',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24369:99808',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24542:201606',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:213735',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=22935:199997',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 40,
            left: 0,
          },
        },
      },
    },
  },
};
