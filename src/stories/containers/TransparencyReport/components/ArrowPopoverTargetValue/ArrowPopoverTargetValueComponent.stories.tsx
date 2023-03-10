import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ArrowPopoverTargetValueComponent from './ArrowPopoverTargetValueComponent';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/ArrowPopoverTargetValueComponent.stories',
  component: ArrowPopoverTargetValueComponent,
  parameters: {
    chromatic: {
      viewports: [375, 834],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof ArrowPopoverTargetValueComponent>;

const variantsArgs = [
  {
    align: 'center',
    name: 'Collateral Engineering Services',
    longCode: 'SES-001',
    description: '2 Month Budget Cap',
    mipNumber: 'MIP40c3-SP14:',
    link: '#',
    style: {
      padding: 10,
      background: 'white',
      border: '1px solid #D4D9E1',
      boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
      borderRadius: '6px',
    },
  },
  {
    align: 'left',
    name: 'Collateral Engineering Services',
    longCode: 'SES-01',
    description: '2 Month Budget Cap',
    mipNumber: 'MIP40c3-SP14:',
    link: '#',
    style: {
      padding: 10,
      background: 'white',
      border: '1px solid #D4D9E1',
      boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
      borderRadius: '6px',
    },
  },
];

export const [[LightCenter, DarkCenter], [LightLeft, DarkLeft]] = createThemeModeVariants(
  ArrowPopoverTargetValueComponent,
  variantsArgs
);

LightCenter.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=15293%3A163334&t=GfCJNnX1UcXL4afU-4',
        options: {
          componentStyle: {
            width: 305,
          },
          style: {
            top: -32,
            left: -40,
          },
        },
      },
    },
  },
};
LightLeft.parameters = {
  figma: {
    component: {
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14723%3A160960&t=GfCJNnX1UcXL4afU-4',
        options: {
          componentStyle: {
            width: 305,
          },
          style: {
            top: -16,
            left: 0,
          },
        },
      },
    },
  },
};
