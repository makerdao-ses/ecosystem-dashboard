import { SnapshotAccountTransactionBuilder } from '@ses/core/businessLogic/builders/accountSnapshot/snapshotAccountTransactionBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import FundingOverview from './FundingOverview';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof FundingOverview> = {
  title: 'Fusion/Components/Accounts Snapshot/Funding Overview',
  component: FundingOverview,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const CommonArgs = {
  snapshotOwner: 'SES Core Unit',
  startDate: '2023-05-12T22:52:54.494Z',
  endDate: '2023-06-14T22:52:54.494Z',
  sinceDate: new Date('2023-05-12T22:52:54.494Z'),
  balance: {
    initialBalance: 3685648,
    newBalance: -3743328,
    inflow: 300000,
    outflow: -242320,
  },
};
const variantsArgs = [
  {
    ...CommonArgs,
  },
  {
    ...CommonArgs,
    transactionHistory: [
      new SnapshotAccountTransactionBuilder()
        .withTimestamp('2023-04-17T11:36:05.188Z')
        .withTxHash('0xe079d59dbf813d2541a345ef4786cc44a8a')
        .withCounterParty('0x232b5483e5a5cd22188482')
        .withAmount(-1153480)
        .build(),
      new SnapshotAccountTransactionBuilder()
        .withTimestamp('2023-04-15T11:36:05.188Z')
        .withTxHash('0xe079d59dbf813d2541a345ef4786cc44a8a')
        .withCounterParty('0x232b5483e5a5cd22188482')
        .withAmount(153480)
        .build(),
      new SnapshotAccountTransactionBuilder()
        .withTimestamp('2023-03-28T17:32:05.188Z')
        .withTxHash('0xe079d59dbf813d2541a345ef4786cc44a8a')
        .withCounterParty('0x232b5483e5a5cd22188482')
        .withAmount(-1153480)
        .build(),
      new SnapshotAccountTransactionBuilder()
        .withTimestamp('2023-03-28T09:45:05.188Z')
        .withTxHash('0xe079d59dbf813d2541a345ef4786cc44a8a')
        .withCounterParty('0x232b5483e5a5cd22188482')
        .withAmount(153480)
        .build(),
    ],
    defaultExpanded: true,
  },
];

const [[LightMode, DarkMode], [ExpandedLightMode, ExpandedDarkMode]] = createThemeModeVariants(
  FundingOverview,
  variantsArgs,
  false
);
export { LightMode, DarkMode, ExpandedLightMode, ExpandedDarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1734-43044',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -56,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1734-42099',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -56,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1734-41111',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -58,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1654-53086',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -58,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1654-52447',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -58,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};

ExpandedLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18675:214293',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1811-52934',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -55,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1734-46077',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -57,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1715-15149',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -57,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1679-87116',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -57,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
