import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { withoutSBPadding } from '@/core/utils/storybook/decorators';
import Breadcrumb from './Breadcrumb';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Fusion/Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    items: [
      {
        label: 'Home',
        href: '/',
        number: 15,
      },
      {
        label: 'About',
        href: '/about',
      },
      {
        label: 'Contact',
        href: '/contact',
      },
    ],
  },
  {
    items: [
      {
        label: '1- Home',
        href: '/',
        number: 15,
      },
      {
        label: '2- Lorem ipsum',
        href: '/a1',
      },
      {
        label: '3- Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        href: '/a2',
      },
      {
        label: '4- Lorem ipsum dolor',
        href: '/a3',
      },
      {
        label: '5- A very long text that should be truncated',
        href: '/long',
      },
    ],
  },
];

const [[LightModeDefault, DarkModeDefault], [WithLongLabelsLight, WithLongLabelsDark]] = createThemeModeVariants(
  Breadcrumb,
  variantsArgs,
  false
);
export { LightModeDefault, DarkModeDefault, WithLongLabelsLight, WithLongLabelsDark };
