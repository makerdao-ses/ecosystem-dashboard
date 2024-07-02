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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18698:216049',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19867:248296',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19866:244466',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19865:238757',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20719:254463',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -40,
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18698:215790',
        options: {
          componentStyle: {
            width: 343,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19867:248234',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19866:244404',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19865:238695',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=20719:254401',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
