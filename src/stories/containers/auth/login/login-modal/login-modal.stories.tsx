import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import LoginModal from './login-modal';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Components/General/Auth/Login Modal',
  component: LoginModal,
  chromatic: {
    viewports: [375],
    pauseAnimationAtEnd: true,
  },
} as ComponentMeta<typeof LoginModal>;

const variantsArgs = [
  {
    open: true,
    handleClose: () => null,
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(LoginModal, variantsArgs);
LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14129%3A170642',
        options: {
          componentStyle: {
            width: '375',
          },
          style: {
            top: -36,
            left: -56,
          },
        },
      },
    },
  } as FigmaParams,
};
