import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import { ResourceType } from '@/core/models/interfaces/types';
import { withFixedPositionRelative, withoutSBPadding } from '@/core/utils/storybook/decorators';
import Breadcrumb from './Breadcrumb';
import TeamBreadcrumbContent from './CustomContents/TeamBreadcrumbContent';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Fusion/Components/Breadcrumb',
  component: Breadcrumb,
  decorators: [withoutSBPadding, withFixedPositionRelative],
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
        label: 'Finances',
        href: '/',
      },
      {
        label: 'Something else',
        href: '/something-else',
      },
      {
        label: 'Atlas Immutable Budget',
        href: '/atlas-immutable-budget',
      },
      {
        label: 'Generative Tokens',
        href: '/generative-tokens',
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
    withMenusOpened: true,
  },
];

const [
  [LightModeDefault, DarkModeDefault],
  [WithLongLabelsLight, WithLongLabelsDark],
  [WithMenusOpenedLight, WithMenusOpenedDark],
] = createThemeModeVariants(Breadcrumb, variantsArgs, false);

export {
  LightModeDefault,
  DarkModeDefault,
  WithLongLabelsLight,
  WithLongLabelsDark,
  WithMenusOpenedLight,
  WithMenusOpenedDark,
};

WithLongLabelsLight.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2293-28769&t=kzkccrF7VEewOmD3-4',
        options: {
          style: {
            top: -20,
            left: -3,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2293-28522&t=kzkccrF7VEewOmD3-4',
        options: {
          style: {
            top: -20,
            left: -19,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2293-28419&t=kzkccrF7VEewOmD3-4',
        options: {
          style: {
            top: -19,
            left: -19,
          },
        },
      },
    },
  } as FigmaParams,
};
