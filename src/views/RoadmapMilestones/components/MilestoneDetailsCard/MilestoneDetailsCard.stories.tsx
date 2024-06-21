import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { PowerhouseRoadmap2024 } from '../../staticData';
import MilestoneDetailsCard from './MilestoneDetailsCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof MilestoneDetailsCard> = {
  title: 'Fusion/Roadmap and Milestones/Milestone Details Card',
  component: MilestoneDetailsCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280],
      pauseAnimationAtEnd: true,
    },
  },
};

export default meta;

const variantsArgs = [
  {
    milestone: PowerhouseRoadmap2024.milestones[0],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(MilestoneDetailsCard, variantsArgs, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28869-260079',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=28417-454588',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -3,
            left: -17,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/nubRdNZLDrQJLDgh8caMrQ/Untitled?type=design&node-id=1612-34674',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -4,
            left: 0,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/nubRdNZLDrQJLDgh8caMrQ/Untitled?type=design&node-id=1616-37493',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -4,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
