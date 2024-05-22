import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import ButtonLinkOptions from './ButtonLinkOptions';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ButtonLinkOptions> = {
  title: 'Fusion/Components/ButtonLinkOptions',
  component: ButtonLinkOptions,

  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;
const variantsArgs = [
  {},
  {
    label: 'Links',
  },
];

const [[LightModeDefault, DarkModeDefault], [WithTextLight, WithTextDark]] = createThemeModeVariants(
  ButtonLinkOptions,
  variantsArgs
);
export { LightModeDefault, DarkModeDefault, WithTextLight, WithTextDark };
