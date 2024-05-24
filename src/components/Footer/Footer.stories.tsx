import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import Footer from './Footer';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof Footer> = {
  title: 'Fusion/Components/Footer',
  component: Footer,
  decorators: [withoutSBPadding],
  parameters: {
    chromatic: {
      viewports: [1440], // when responsive is done [1440, 1280, 1024, 768, 375]
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
