import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { ResourceType } from '@/core/models/interfaces/types';
import { withoutSBPadding } from '@/core/utils/storybook/decorators';
import Breadcrumb from './Breadcrumb';
import TeamBreadcrumbContent from './CustomContents/TeamBreadcrumbContent';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Fusion/Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const rightContent = (
  <TeamBreadcrumbContent
    team={ResourceType.CoreUnit}
    currentPage={1}
    totalPages={15}
    pagerProps={{
      hasNext: true,
      hasPrevious: true,
      onNext: () => null,
      onPrevious: () => null,
    }}
  />
);

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
    rightContent,
  },
  {
    items: [
      {
        label: '1- Home',
        href: '/',
        number: 15,
      },
      {
        label: '2.1- Lorem ipsum',
        href: '/a1',
      },
      {
        label: '2.2- Lorem ipsum consectetur',
        href: '/a1',
      },
      {
        label: '2.3- Lorem ipsum lorem ipsum',
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
    rightContent,
  },
];

const [[LightModeDefault, DarkModeDefault], [WithLongLabelsLight, WithLongLabelsDark]] = createThemeModeVariants(
  Breadcrumb,
  variantsArgs,
  false
);
export { LightModeDefault, DarkModeDefault, WithLongLabelsLight, WithLongLabelsDark };
