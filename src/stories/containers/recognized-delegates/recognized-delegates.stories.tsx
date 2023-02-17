import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../layout/layout';
import RecognizedDelegatesContainer from './recognized-delegates';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/Recognized Delegates',
  component: RecognizedDelegatesContainer,
  decorators: [withoutSBPadding],
  chromatic: {
    viewports: [375, 1440, 1920],
    pauseAnimationAtEnd: true,
  },
} as ComponentMeta<typeof RecognizedDelegatesContainer>;

const variantsArgs = [{}];

export const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <RecognizedDelegatesContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);

const optionStyles = {
  style: {
    top: -16,
    left: -16,
  },
};
LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A152908&t=LZ9EyDUco0YusmKq-4',
        options: {
          componentStyle: {
            width: 375,
          },
          ...optionStyles,
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A152093&t=kbWt0cOvr2KYcuOj-4',
        options: {
          componentStyle: {
            width: 1440,
          },
          ...optionStyles,
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A154395&t=kbWt0cOvr2KYcuOj-4',
        options: {
          componentStyle: {
            width: 1920,
          },
          ...optionStyles,
        },
      },
    },
  } as FigmaParams,
};
