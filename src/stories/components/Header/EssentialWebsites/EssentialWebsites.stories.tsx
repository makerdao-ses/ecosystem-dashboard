import { withWrappedStyles } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import EssentialWebsites from './EssentialWebsites';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof EssentialWebsites> = {
  title: 'Components/General/Header/Essential Websites',
  component: EssentialWebsites,
  decorators: [withWrappedStyles({ margin: 16 })],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 834],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {
    showButtons: {
      control: { type: 'boolean' },
    },
  },
};
export default meta;

const variantsArgs = [{ showButtons: false }, { showButtons: true }];

const [[Default, DefaultDarkMode], [Mobile, MobileDarkMode]] = createThemeModeVariants(
  EssentialWebsites,
  variantsArgs,
  false
);
export { Default, DefaultDarkMode, Mobile, MobileDarkMode };

Mobile.parameters = {
  chromatic: {
    viewports: [375],
  },
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14298%3A260357',
        options: {
          componentStyle: {
            width: 360,
          },
          style: {
            top: -22,
            left: -24,
          },
        },
      },
    },
  } as FigmaParams,
};
MobileDarkMode.parameters = {
  chromatic: {
    viewports: [375],
  },
};
