import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ExternalLinkText from './ExternalLinkText';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof ExternalLinkText> = {
  title: 'Fusion/Components/ExternalLinkText',
  decorators: [
    (Story) => (
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
        }}
      >
        <Story />
      </ul>
    ),
  ],
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    href: 'https://www.google.com',
    children: 'External link as text',
  },
  {
    href: 'https://www.google.com',
    children: 'External link as text',
    asLi: true,
  },
];

const [[DefaultLightMode, DefaultDarkMode], [AsListItemLightMode, AsListItemDarkMode]] = createThemeModeVariants(
  ExternalLinkText,
  variantsArgs
);

export { DefaultLightMode, DefaultDarkMode, AsListItemLightMode, AsListItemDarkMode };
