import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';

import BreadCrumbNavigation from './BreadCrumbNavigation';
import type { NavigationBreadCrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Actor/BreadCrumbNavigation',
  component: BreadCrumbNavigation,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
    },
  },
} as ComponentMeta<typeof BreadCrumbNavigation>;
const variantsArgs = [
  {
    totalElements: 6,
    navigationPageTitle: 'Ecosystem Actors',
    mainUrl: '/core_unit',
    labelFirstItemNavigation: {
      label: 'Phoenix Labs',
      url: '',
    } as NavigationBreadCrumb,
    trailingAddress: [] as NavigationBreadCrumb[],
    itemActual: 1,

    breadcrumbTitleMobile: '',
    hasStyleMobileItem: true,
    descriptionTextPagination: 'Ecosystem Actors',
  },
];

export const [[Actors, ActorsDark]] = createThemeModeVariants(BreadCrumbNavigation, variantsArgs);

Actors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20296:268969&mode=dev',
        options: {
          style: {
            left: 16,
            top: 16,
          },
          componentStyle: {
            width: 375,
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20298:289948&mode=design&t=tHcF8WD0X6ZQdRJc-4',
        options: {
          style: {
            left: 0,
            top: 1,
          },
          componentStyle: {
            width: 834,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20298:286887&mode=design&t=tHcF8WD0X6ZQdRJc-4',
        options: {
          style: {
            left: 0,
            top: 2,
          },
          componentStyle: {
            width: 1194,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20296:280013&mode=design&t=tHcF8WD0X6ZQdRJc-4',
        options: {
          style: {
            left: 0,
            top: 2,
          },
          componentStyle: {
            width: 1280,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20296:266215&mode=design&t=tHcF8WD0X6ZQdRJc-4',
        options: {
          style: {
            left: 0,
            top: 2,
          },
          componentStyle: {
            width: 1440,
          },
        },
      },
    },
  },
};

ActorsDark.parameters = {};
