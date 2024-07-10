import { SnapshotAccountBuilder } from '@ses/core/businessLogic/builders/accountSnapshot/accountSnapshotBuilder';
import { SnapshotAccountBalanceBuilder } from '@ses/core/businessLogic/builders/accountSnapshot/snapshotAccountBalanceBuilder';
import { SnapshotAccountTransactionBuilder } from '@ses/core/businessLogic/builders/accountSnapshot/snapshotAccountTransactionBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import ReserveCard from './ReserveCard';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof ReserveCard> = {
  title: 'Fusion/Components/Accounts Snapshot/Reserve Card',
  component: ReserveCard,
  parameters: {
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440],
    },
  },
};
export default meta;

const variantsArgs = [
  {
    account: new SnapshotAccountBuilder()
      .withId('1')
      .withAccountLabel('Auditor')
      .withAccountAddress('0x232b6335224ae8482')
      .withAccountType('singular')
      .addSnapshotAccountBalance(
        new SnapshotAccountBalanceBuilder()
          .withInitialBalance(500000)
          .withNewBalance(550000)
          .withInflow(300000)
          .withOutflow(-250000)
          .build()
      )
      .addSnapshotAccountTransaction(
        new SnapshotAccountTransactionBuilder()
          .withAmount(300000)
          .withCounterParty('0x232b56628482')
          .withCounterPartyName('DSS Vest')
          .withTimestamp('2023-03-29T14:45:00Z')
          .withToken('DAI')
          .withTxHash('0xe079d59dbf813d54875aec552a')
          .withTxLabel('Top up (Internal)')
          .build()
      )
      .addSnapshotAccountTransaction(
        new SnapshotAccountTransactionBuilder()
          .withAmount(-250000)
          .withCounterParty('0x232b56628482')
          .withCounterPartyName('Operational Wallet')
          .withTimestamp('2023-03-28T11:41:00Z')
          .withToken('DAI')
          .withTxHash('0xe079d59dbf813d54875aec552a')
          .withTxLabel('Top up')
          .build()
      )
      .build(),
    currency: 'DAI',
    defaultExpanded: true,
  },
  {
    account: {
      ...new SnapshotAccountBuilder()
        .withId('1')
        .withAccountLabel('DSS Vest')
        .withAccountType('group')
        .addSnapshotAccountBalance(
          new SnapshotAccountBalanceBuilder()
            .withInitialBalance(100000)
            .withNewBalance(100000)
            .withInflow(300000)
            .withOutflow(-300000)
            .build()
        )

        .build(),
      children: [
        new SnapshotAccountBuilder()
          .withId('2')
          .withAccountLabel('Stream #13')
          .withAccountAddress('0x232b5454ae48482')
          .withAccountType('singular')
          .addSnapshotAccountBalance(
            new SnapshotAccountBalanceBuilder()
              .withInitialBalance(153480)
              .withNewBalance(153480)
              .withInflow(150000)
              .withOutflow(-50000)
              .build()
          )
          .addSnapshotAccountTransaction(
            new SnapshotAccountTransactionBuilder()
              .withAmount(300000)
              .withCounterParty('0x232b56628482')
              .withCounterPartyName('Maker Protocol')
              .withTimestamp('2023-04-17T11:36:00Z')
              .withToken('DAI')
              .withTxHash('0xe079d59dbf813d54875aec552a')
              .withTxLabel('Top up (Internal)')
              .build()
          )
          .addSnapshotAccountTransaction(
            new SnapshotAccountTransactionBuilder()
              .withAmount(-300000)
              .withCounterParty('0x232b56628482')
              .withCounterPartyName('Auditor Wallet')
              .withTimestamp('2023-04-15T10:05:00Z')
              .withToken('DAI')
              .withTxHash('0xe079d59dbf813d54875aec552a')
              .withTxLabel('Top up')
              .build()
          )
          .build(),
        new SnapshotAccountBuilder()
          .withId('2')
          .withAccountLabel('Stream #14')
          .withAccountAddress('0x232b5454ae48482')
          .withAccountType('singular')
          .addSnapshotAccountBalance(
            new SnapshotAccountBalanceBuilder()
              .withInitialBalance(153480)
              .withNewBalance(153480)
              .withInflow(150000)
              .withOutflow(-50000)
              .build()
          )
          .addSnapshotAccountTransaction(
            new SnapshotAccountTransactionBuilder()
              .withAmount(300000)
              .withCounterParty('0x232b56628482')
              .withCounterPartyName('Maker Protocol')
              .withTimestamp('2023-03-28T17:32:00Z')
              .withToken('DAI')
              .withTxHash('0xe079d59dbf813d54875aec552a')
              .withTxLabel('Top up (Internal)')
              .build()
          )
          .addSnapshotAccountTransaction(
            new SnapshotAccountTransactionBuilder()
              .withAmount(-300000)
              .withCounterParty('0x232b56628482')
              .withCounterPartyName('Auditor Wallet')
              .withTimestamp('2023-03-28T09:45:00Z')
              .withToken('DAI')
              .withTxHash('0xe079d59dbf813d54875aec552a')
              .withTxLabel('Top up')
              .build()
          )
          .build(),
      ],
    },
    currency: 'DAI',
    defaultExpanded: true,
  },
];

const [[WithSingularLightMode, WithSingularDarkMode], [WithGroupLightMode, WithGroupDarkMode]] =
  createThemeModeVariants(ReserveCard, variantsArgs);

export { WithSingularLightMode, WithSingularDarkMode, WithGroupLightMode, WithGroupDarkMode };

WithSingularLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1996-37693',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1811-56190',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1734-49812',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1715-18272',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1714-17484',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};

WithGroupLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1996-37336',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      768: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1811-55785',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1734-49811',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1715-18212',
        options: {
          componentStyle: {
            width: 1200,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/design/iLyzLutlWLu6Yf8tFdlM6T/Fusion%2FPowerhouse?node-id=1679-88398&m=dev',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -11,
            left: -14,
          },
        },
      },
    },
  } as FigmaParams,
};
