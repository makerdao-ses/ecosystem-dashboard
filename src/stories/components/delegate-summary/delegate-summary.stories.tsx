import { LinkTypeEnum } from '@ses/core/enums/link-type.enum';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateSummary from './delegate-summary';
import type { LinkModel } from '../cu-table-column-links/cu-table-column-links';
import type { ComponentMeta } from '@storybook/react';

export default {
  title: 'Components/Delegate/DelegateSummary',
  component: DelegateSummary,
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
} as ComponentMeta<typeof DelegateSummary>;

const variantsArgs = [
  {
    code: 'del',
    links: [
      {
        linkType: LinkTypeEnum.WWW,
        href: 'https://vote.makerdao.com/delegates',
      },
      {
        linkType: LinkTypeEnum.Forum,
        href: 'https://forum.makerdao.com/c/governance/delegates/43',
      },
      {
        linkType: LinkTypeEnum.Discord,
        href: 'https://discord.com/invite/uZxdmZcS',
      },
      {
        linkType: LinkTypeEnum.Youtube,
        href: 'https://www.youtube.com/@MakerDAO/videos',
      },
    ] as LinkModel[],
  },
];

export const [[LightMode, DarkMode]] = createThemeModeVariants(DelegateSummary, variantsArgs);

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14310%3A260967&t=RQw5OvfIDN7GgH70-4',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -18,
            left: -22,
          },
        },
      },

      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14539%3A157717&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: -18,
            left: -22,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14539%3A154161&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: -18,
            left: -22,
          },
        },
      },

      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A159678&t=nnlMhBVyl5KbS8g1-4',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -18,
            left: -20,
          },
        },
      },

      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14171%3A258356&t=WCAGvNfUJOZmR3GA-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -18,
            left: -20,
          },
        },
      },
      1920: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A157310&t=CPxU3URf0kVMynJT-4',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -18,
            left: -20,
          },
        },
      },
    },
  },
};
