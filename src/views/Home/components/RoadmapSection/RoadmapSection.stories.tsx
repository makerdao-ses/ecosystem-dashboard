import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import RoadmapSection from './RoadmapSection';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof RoadmapSection> = {
  title: 'Fusion/Views/Home/RoadmapSection',
  component: RoadmapSection,
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
    roadmaps: [
      {
        id: '1',
        slug: 'ph-2024',
        title: 'Powerhouse Roadmap 2024',
        description: 'Powerhouse Ecosystem Actor team roadmap for the year 2024.',
        milestones: [
          {
            id: 'ustpb52jla',
            sequenceCode: 'PH01',
            code: 'POC',
            title: 'Decentralized Operations Platform - POC',
            abstract: 'The initial phase of Powerhouse Decentralized Operations Platform.',
            scope: {
              deliverables: [
                {
                  id: 'oy69oibt04',
                  code: 'POC1',
                  title: 'First technical integration of RWA Portfolio (Connect & Switchboard)',
                  description:
                    'Technical integration demo showcasing for the first time the RWA Portfolio Editor in Connect and the data synchronization with Switchboard.',
                  status: 'DELIVERED',
                  keyResults: [
                    {
                      id: 'B84xO69g',
                      title: 'RWA Conceptual Wireframes',
                      link: 'https://drive.google.com/file/d/1NZXm_Q43sKH5pqwHTwN0DYvSW1uewMlY/view',
                    },
                    {
                      id: '4965Bh97',
                      title: 'First demo of RWA Portfolio - Feb 21',
                      link: 'https://drive.google.com/file/d/1CMwePiR046IJqQGLypi7Fzu_B7aLYNco/view',
                    },
                  ],
                  workProgress: {
                    __typename: 'Percentage',
                    value: 1,
                  },
                  budgetAnchor: {
                    project: {
                      code: 'RWA',
                      title: 'RWA Portfolio Reporting',
                    },
                    workUnitBudget: 1,
                    deliverableBudget: 0,
                  },
                  owner: {
                    id: 'H7Cx8em3',
                    ref: 'makerdao/ecosystem-actor',
                    name: 'Powerhouse',
                    code: 'PH',
                    imageUrl:
                      'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
                  },
                },
              ],
              status: 'DRAFT',
              progress: {
                __typename: 'Percentage',
                value: 1,
              },
              totalDeliverables: 3,
              deliverablesCompleted: 3,
            },
            coordinators: [
              {
                imageUrl: 'N/A',
                code: 'Prometheus',
                name: 'Prometheus',
                ref: 'makerdao/contributor',
                id: 'Z89231k5',
              },
              {
                imageUrl: 'N/A',
                code: 'cc00',
                name: 'cc00',
                ref: 'makerdao/contributor',
                id: '66ICk94v',
              },
              {
                imageUrl: 'N/A',
                code: 'cc11',
                name: 'cc11',
                ref: 'makerdao/contributor',
                id: '47z35Z8x',
              },
              {
                imageUrl: 'N/A',
                code: 'cc22',
                name: 'cc22',
                ref: 'makerdao/contributor',
                id: '05SGYZ20',
              },
            ],
            contributors: [
              {
                id: 'H7Cx8em3',
                ref: 'makerdao/ecosystem-actor',
                name: 'Powerhouse',
                code: 'PH',
                imageUrl:
                  'https://makerdao-ses.github.io/ecosystem-dashboard/ecosystem-actors/POWERHOUSE/POWERHOUSE_logo.png',
              },
            ],
          },
        ],
      },
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(RoadmapSection, variantsArgs);

export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      375: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-32716&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-30498&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-27749&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5617-24915&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=5809-32681&m=dev',
        options: {
          componentStyle: {},
          style: {
            top: '-1rem',
            left: '-1rem',
          },
        },
      },
    },
  } as FigmaParams,
};
