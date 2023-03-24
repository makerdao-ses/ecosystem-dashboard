import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ModalSheetValueContent from './ModalSheetValueContent';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/General/ModalSheetValueContent',
  component: ModalSheetValueContent,
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof ModalSheetValueContent>;

const variantsArgs = [
  {
    months: 'FEB + MAR Budget Cap',
    name: 'Modify Core Unit Budget - Collateral Engineering Services (SES-001)',
    toolTipData: {
      description: '3 Months of Forecasts',
      link: '#',
      mipNumber: 'MIP40c3-SP14:',
    } as Pick<TargetBalanceTooltipInformation, 'description' | 'mipNumber' | 'link'>,
  },
];

export const [[PopoverContainerWithoutArrow, PopoverContainerWithoutArrowDark]] = createThemeModeVariants(
  ModalSheetValueContent,
  variantsArgs
);

PopoverContainerWithoutArrow.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=15293%3A163759&t=V8kJ5LFUtBGS3Q4t-4',
        options: {
          componentStyle: {
            // width: 305,
            width: 375,
          },
          style: {
            top: -40,
            left: -20,
          },
        },
      },
    },
  },
};
