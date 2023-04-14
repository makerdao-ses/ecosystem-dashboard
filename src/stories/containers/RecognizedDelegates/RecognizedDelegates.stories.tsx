import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import RecognizedDelegatesContainer from './RecognizedDelegatesContainer';
import type { ComponentMeta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

export default {
  title: 'Pages/Recognized Delegates',
  component: RecognizedDelegatesContainer,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
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
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:202678&t=faN0xkmslBHAjD0T-4',

        options: {
          componentStyle: {
            width: 375,
          },
          ...optionStyles,
        },
      },
    },
  } as FigmaParams,
};
