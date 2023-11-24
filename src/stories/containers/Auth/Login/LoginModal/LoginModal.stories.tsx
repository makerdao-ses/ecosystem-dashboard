import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import LoginModal from './LoginModal';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof LoginModal> = {
  title: 'Components/General/Auth/Login Modal',
  component: LoginModal,
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
    open: true,
    handleClose: () => null,
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(LoginModal, variantsArgs);
export { LightMode, DarkMode };

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
