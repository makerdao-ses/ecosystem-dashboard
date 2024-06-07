import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import TableEmptyState from './TableEmptyState';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof TableEmptyState> = {
  title: 'Fusion/Components/TableEmptyState',
  component: TableEmptyState,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    description: 'There are no Core Units available with this combination of filters.',
  },
];

const [[Actors, ActorsDark]] = createThemeModeVariants(
  TableEmptyState,

  variantsArgs
);
export { Actors, ActorsDark };

Actors.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2410:14831&t=St2JexmyIMfCV6xZ-4',
        options: {
          style: {
            left: -8,
            top: 0,
          },
          componentStyle: {
            width: 343,
            height: 568,
            maxHeight: 568,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2410:14379&t=St2JexmyIMfCV6xZ-4',
        options: {
          style: {
            left: -4,
            top: 0,
          },
          componentStyle: {
            width: 704,
          },
        },
      },
      1024: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2410:13695&t=St2JexmyIMfCV6xZ-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 960,
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2410:12878&t=St2JexmyIMfCV6xZ-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 1200,
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=2104:29937&t=St2JexmyIMfCV6xZ-4',
        options: {
          style: {
            left: -14,
            top: -12,
          },
          componentStyle: {
            width: 1312,
          },
        },
      },
    },
  },
};

ActorsDark.parameters = {};
