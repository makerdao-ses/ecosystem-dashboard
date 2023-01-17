import CheckBox from '@ses/components/check-box/check-box';
import { withFigmaComparator } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { figmaComparatorCommonPaddingOptions } from '@ses/core/utils/storybook/utils';
import type { ComponentMeta } from '@storybook/react';
export default {
  title: 'Components/General/CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const variantsArgs = [
  {
    isChecked: true,
    label: 'Show empty budget categories',
  },
  {
    isChecked: false,
    label: 'Show empty budget categories',
  },
];

export const [[Checked, Unchecked]] = createThemeModeVariants(CheckBox, variantsArgs);

Checked.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=3384%3A17690&t=0QkX2DAbV9YY8AId-4',
    figmaComparatorCommonPaddingOptions
  ),
];
Unchecked.decorators = [
  withFigmaComparator(
    'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=3384%3A17688&t=0QkX2DAbV9YY8AId-4',
    figmaComparatorCommonPaddingOptions
  ),
];
