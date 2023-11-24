import { withoutMarginTopInFixedPosition, withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { SESCoreUnitMocked } from '@ses/core/utils/storybook/mocks/coreUnitsMocks';
import { CoreUnitSummary } from './CoreUnitSummary';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof CoreUnitSummary> = {
  title: 'Components/General/CoreUnitSummary',
  component: CoreUnitSummary,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
  },
  decorators: [withoutSBPadding, withoutMarginTopInFixedPosition],
};
export default meta;

const nextjs = {
  router: {
    path: '/core-unit/[code]',
    asPath: '/core-unit/SES',
    query: {
      code: 'SES',
    },
  },
};

const variantsArgs = [
  {
    coreUnits: [SESCoreUnitMocked],
    showDescription: true,
  },
  {
    coreUnits: [SESCoreUnitMocked],
    showDescription: false,
  },
];

const [[WithDescription, WithDescriptionDark], [WithoutDescription, WithoutDescriptionDarkMode]] =
  createThemeModeVariants(CoreUnitSummary, variantsArgs);
export { WithDescription, WithDescriptionDark, WithoutDescription, WithoutDescriptionDarkMode };

WithDescription.parameters = {
  nextjs,
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=5222%3A59807',
        options: {
          componentStyle: {},
          style: {
            top: -37,
            left: -44,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8928%3A111263',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -35,
            left: -42,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4354%3A48438',
        options: {
          componentStyle: {
            width: 1194,
          },
          style: {
            top: -37,
            left: -41,
          },
        },
      },
    },
  } as FigmaParams,
};
WithDescriptionDark.parameters = {
  nextjs,
};
WithoutDescription.parameters = {
  nextjs,
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8928%3A120824',
        options: {
          componentStyle: {},
          style: {
            top: -37,
            left: -44,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=8216%3A144366',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -35,
            left: -42,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4633%3A62213',
        options: {
          componentStyle: {
            width: 1194,
          },
          style: {
            top: -16,
            left: -17,
          },
        },
      },
    },
  } as FigmaParams,
};
WithoutDescriptionDarkMode.parameters = {
  nextjs,
};
