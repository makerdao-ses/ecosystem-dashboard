import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Footer from './Footer';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof Footer> = {
  title: 'Fusion/Components/Footer',
  component: Footer,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [375, 834, 1280],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const args = [
  {
    linkCategory: [
      {
        name: 'Governance',
        links: [
          {
            label: 'Maker forum',
            link: 'https://forum.makerdao.com/',
          },
          {
            label: 'Voting portal',
            link: 'https://vote.makerdao.com/',
          },
          {
            label: 'MIPs portal',
            link: 'https://mips.makerdao.com/mips/lis',
          },
          {
            // eslint-disable-next-line spellcheck/spell-checker
            label: 'Makerburn vnext',
            link: 'https://makerburn.com/v2',
          },
        ],
      },
      {
        name: 'Documentation',
        links: [
          {
            label: 'Organization',
            link: 'https://www.powerhouse.inc/',
          },
          {
            label: 'Technical Docs',
            link: 'https://powerhouse-1.gitbook.io/powerhouse',
          },
          {
            label: 'Brand Assets',
            link: '#',
          },
          {
            label: 'Github Repos',
            link: 'https://github.com/powerhouse-inc',
          },
        ],
      },
      {
        name: 'MakerDao Tools',
        links: [
          {
            label: 'Connect',
            link: '#',
            icon: '/assets/img/footer/footer_link_connect.svg',
          },
          {
            label: 'Switchboard',
            link: 'https://powerhouse-nginx-router-5dcc24a23f9e.herokuapp.com/makerdao/switchboard',
            icon: '/assets/img/footer/footer_link_switchboard.svg',
          },
          {
            label: 'Fusion',
            link: '#',
            icon: '/assets/img/footer/footer_link_fusion.svg',
          },
        ],
      },
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(Footer, args, false);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4338%3A48482',
        options: {
          componentStyle: {
            width: 375,
          },
          style: {
            top: -16,
            left: -8,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=4308%3A55429',
        options: {
          componentStyle: {
            width: 834,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=198-1841&m=dev',
        options: {
          componentStyle: {
            width: 1280,
          },
          style: {
            top: -16,
            left: -16,
          },
        },
      },
    },
  } as FigmaParams,
};
