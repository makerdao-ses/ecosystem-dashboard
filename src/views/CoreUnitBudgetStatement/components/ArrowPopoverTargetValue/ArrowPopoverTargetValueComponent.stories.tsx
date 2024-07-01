import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ArrowPopoverTargetValueComponent from './ArrowPopoverTargetValueComponent';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ArrowPopoverTargetValueComponent> = {
  title: 'Components/General/ArrowPopoverTargetValueComponent',
  component: ArrowPopoverTargetValueComponent,
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    months: 'FEB + MAR Budget Cap',

    name: 'Modify Core Unit Budget - Collateral Engineering Services (SES-001)',
    toolTipData: {
      description: '2 Month Budget Cap',
      link: '#',
      mipNumber: 'MIP40c3-SP14:',
    } as Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>,
    style: {
      padding: 16,
      width: '305px',
      background: 'white',
      border: '1px solid #D4D9E1',
      boxShadow: '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
      borderRadius: '6px',
    },
  },
];

const [[PopoverContainerWithoutArrow, PopoverContainerWithoutArrowDark]] = createThemeModeVariants(
  ArrowPopoverTargetValueComponent,
  variantsArgs
);
export { PopoverContainerWithoutArrow, PopoverContainerWithoutArrowDark };

PopoverContainerWithoutArrow.parameters = {
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
