import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ExternalLinkButton from './ExternalLinkButton';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ExternalLinkButton> = {
  title: 'Fusion/Components/ExternalLinkButton',
  component: ExternalLinkButton,
  parameters: {
    chromatic: {
      viewports: [375],
      pauseAnimationAtEnd: true,
    },
  },
  argTypes: {
    href: {
      defaultValue: 'https://google.com',
    },
    children: {
      type: 'string',
      defaultValue: 'External link',
    },
    showArrow: {
      type: 'boolean',
      defaultValue: true,
    },
    wrapText: {
      type: 'boolean',
      defaultValue: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    href: 'https://google.com',
    children: 'External link',
  },
  {
    href: 'https://google.com',
    children: 'External link',
  },
];

const [[LightMode, DarkMode], [HoverStateLight, HoverStateDark]] = createThemeModeVariants(
  ExternalLinkButton,
  variantsArgs
);
export { LightMode, DarkMode, HoverStateLight, HoverStateDark };

HoverStateLight.parameters = {
  pseudo: {
    hover: true,
  },
};

HoverStateDark.parameters = {
  pseudo: {
    hover: true,
  },
};
