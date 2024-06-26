import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import BreadcrumbNavigation from './BreadcrumbNavigation';
import type { NavigationBreadcrumb } from '@ses/components/Breadcrumbs/Breadcrumbs';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof BreadcrumbNavigation> = {
  title: 'Fusion/Views/Ecosystem Actor About/BreadcrumbNavigation',
  component: BreadcrumbNavigation,
  parameters: {
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    totalElements: 6,
    navigationPageTitle: 'Ecosystem Actors',
    mainUrl: '/core_unit',
    labelFirstItemNavigation: {
      label: 'Phoenix Labs',
      url: '',
    } as NavigationBreadcrumb,
    trailingAddress: [] as NavigationBreadcrumb[],
    itemActual: 1,

    breadcrumbTitleMobile: '',
    hasStyleMobileItem: true,
    descriptionTextPagination: 'Ecosystem Actors',
  },
];

const [[Actors, ActorsDark]] = createThemeModeVariants(BreadcrumbNavigation, variantsArgs);
export { Actors, ActorsDark };

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
