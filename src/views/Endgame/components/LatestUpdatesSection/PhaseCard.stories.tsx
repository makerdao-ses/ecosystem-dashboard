import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import PhaseCard, { EndgameUpdateStatus } from './PhaseCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof PhaseCard> = {
  title: 'Fusion/Views/Endgame/PhaseCard',
  component: PhaseCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    phase: 'Phase 1',
    title: 'Launch Season',
    status: EndgameUpdateStatus.INPROGRESS,
    description: {
      paragraph:
        'Introduction of new tokens (NewStable and NewGovToken) and a new brand focusing on user-friendly access and sustainable yield farming through the SubDAO ecosystem. This phase aims for rapid deployment of core features to drive Dai usage growth.',
      list: [
        {
          bold: 'New Beginnings',
          text: 'Unveiling a vibrant new brand and the revolutionary NewStable and NewFovToken.',
        },
        {
          bold: 'Access Simplified',
          text: 'Launch of a user-centric website and app, making navigation through our ecosystem seamless.',
        },
        {
          bold: 'Lock in Value',
          text: 'Introduction of the Lockstake Engine, fostering long-term participation and governance.',
        },
      ],
    },
    importantLinks: [
      {
        href: 'https://forum.makerdao.com/t/makerdao-endgame-launch-season/23857',
        label: 'MakerDAO Endgame: Launch Season',
      },
      {
        href: 'https://forum.makerdao.com/t/governance-changes-to-prepare-for-launch-season/23878',
        label: 'Governance changes to prepare for Launch Season',
      },
      {
        href: 'https://forum.makerdao.com/t/preparing-to-decentralize-the-launch-project-after-launch-season/24193',
        label: 'Decentralization of Launch Project',
      },
    ],
  },
  {
    phase: 'Phase 2',
    title: 'Scaling Up',
    status: EndgameUpdateStatus.TODO,
    description: {
      paragraph:
        'After the successful launch of key components, this phase focuses on vertical and horizontal expansion, including more SubDAOs catering to diverse interests and bridging to major L2s and L1s enhancing the ecosystem’s reach and capabilities.',
      list: [
        {
          bold: 'Diverse Ecosystem',
          text: 'Expansion with more SubDAOs, each addressing unique market need and interests.',
        },
        {
          bold: 'Enhance Connectivity',
          text: 'Implementation of bridges to popular L2s and L1s, widening our reach.',
        },
        {
          bold: 'Governance Evolution',
          text: 'SubDAOs gain autonomy, supported by innovative UI adn AI tools.',
        },
      ],
    },
    importantLinks: [],
  },
];

const [[LightMode, DarkMode], [WithoutLinksLightMode, WithoutLinksDarkMode]] = createThemeModeVariants(
  PhaseCard,
  variantsArgs
);
export { LightMode, DarkMode, WithoutLinksLightMode, WithoutLinksDarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=219-47646',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=208-26439',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=160-2222',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=61-21211',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=61-16954',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};

WithoutLinksLightMode.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=219-47680',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      768: {
        component:
          'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=208-27843',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=160-2257',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=61-21246',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?type=design&node-id=61-16989',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -10,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
