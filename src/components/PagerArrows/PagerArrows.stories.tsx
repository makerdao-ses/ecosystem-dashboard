import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import PagerArrows from './PagerArrows';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof PagerArrows> = {
  title: 'Fusion/Components/PagerArrows',
  component: PagerArrows,
  parameters: {
    chromatic: {
      viewports: [375, 768],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    hasPrevious: true,
    hasNext: true,
  },
  {
    hasPrevious: true,
    hasNext: true,
  },
  {
    hasPrevious: false,
    hasNext: true,
  },
];

const [[DefaultLight, DefaultDark], [WithHoverLight, WithHoverRight], [WithDisabledLight, WithDisabledDark]] =
  createThemeModeVariants(PagerArrows, variantsArgs, false);

export { DefaultLight, DefaultDark, WithHoverLight, WithHoverRight, WithDisabledLight, WithDisabledDark };

WithHoverLight.parameters = {
  pseudo: {
    hover: 'svg:first-of-type',
  },
};
WithHoverRight.parameters = {
  pseudo: {
    hover: 'svg:first-of-type',
  },
};
