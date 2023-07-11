import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CardSomethingWrong from './CardSomethingWrong';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/CUAbout/CardSomethingWrong',
  components: CardSomethingWrong,
  parameters: {
    chromatic: {
      viewports: [834, 1194, 1280],
    },
  },
} as ComponentMeta<typeof CardSomethingWrong>;

const variantsArgs = [
  {
    title: 'Are you part of this Ecosystem Actor? ',
    linkText: 'Join Powerhouse discord #dashboard-reporting channel',
  },
];

export const [[Card, CardDark]] = createThemeModeVariants(CardSomethingWrong, variantsArgs);

Card.parameters = {
  figma: {
    component: {
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=21839:251251&mode=design&t=ZoBUW5FV1PY2s2bI-4',

        options: {
          style: {
            left: -40,
            top: 0,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20298:288915&mode=design&t=ZoBUW5FV1PY2s2bI-4',
        options: {
          style: {
            left: -40,
            top: 0,
          },
          componentStyle: {
            width: 383,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20296:284071&mode=design&t=ZoBUW5FV1PY2s2bI-4',
        options: {
          style: {
            left: -40,
            top: 0,
          },
          componentStyle: {
            width: 405,
          },
        },
      },
    },
  },
};

CardDark.parameters = {};
