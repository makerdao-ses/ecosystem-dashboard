import { siteRoutes } from '@ses/config/routes';
import { LinkTypeEnum } from '@ses/core/enums/linkTypeEnum';
import { withoutMarginTopInFixedPosition } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import DelegateSummary from './DelegateSummary';
import type { LinkModel } from '../CuTableColumnLinks/CuTableColumnLinks';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof DelegateSummary> = {
  title: 'Components/DelegateReport/DelegateSummary',
  component: DelegateSummary,
  decorators: [withoutMarginTopInFixedPosition],
  parameters: {
    layout: 'fullscreen',
    chromatic: {
      viewports: [375, 834, 1194],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    code: 'del',
    showHeader: true,
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
    items: [
      {
        label: 'Finances',
        url: siteRoutes.financesOverview,
      },
      {
        label: 'Recognized Delegates',
        url: siteRoutes.recognizedDelegateReport,
      },
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(DelegateSummary, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14373%3A153088&t=7GuGRFEMTECsE9fy-4',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -36,
            left: -42,
          },
        },
      },

      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14539%3A157641&t=7GuGRFEMTECsE9fy-4',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -18,
            left: -14,
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=14539%3A154084&t=7GuGRFEMTECsE9fy-4',
        options: {
          componentStyle: {
            width: 1194,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
    },
  },
};
