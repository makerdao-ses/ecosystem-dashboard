import AppLayout from '@ses/containers/layout/layout';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import LoginContainer from './login';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/Login',
  component: LoginContainer,
  decorators: [withoutSBPadding],
  chromatic: {
    viewports: [375, 834, 1194],
    pauseAnimationAtEnd: true,
  },
} as ComponentMeta<typeof LoginContainer>;

const variantsArgs = [{}];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <LoginContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10120%3A105793',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -16,
            left: 0,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10120%3A105175',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -16,
            left: -24,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=10120%3A104591',
        options: {
          componentStyle: {
            width: 1194,
          },
          style: {
            top: -16,
            left: 0,
          },
        },
      },
    },
  } as FigmaParams,
};
