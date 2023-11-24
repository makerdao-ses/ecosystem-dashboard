import { SnapshotAccountBuilder } from '@ses/core/businessLogic/builders/accountSnapshot/accountSnapshotBuilder';
import { SnapshotAccountBalanceBuilder } from '@ses/core/businessLogic/builders/accountSnapshot/snapshotAccountBalanceBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import CUReserves from './CUReserves';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof CUReserves> = {
  title: 'Components/CUTransparencyReport/Accounts Snapshot/Core Unit Reserves',
  component: CUReserves,
};
export default meta;

const variantsArgs = [
  {
    snapshotOwner: 'SES Core Unit',
    startDate: '2023-05-12T22:52:54.494Z',
    endDate: '2023-06-14T22:52:54.494Z',
    balance: new SnapshotAccountBalanceBuilder()
      .withInitialBalance(1500000)
      .withNewBalance(1266680)
      .withInflow(305000)
      .withOutflow(-538320)
      .build(),
    onChainData: [
      new SnapshotAccountBuilder()
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
      new SnapshotAccountBuilder()
        .withId('2')
        .withAccountLabel('Auditor')
        .withAccountType('singular')
        .withAccountAddress('0x23b554585a4ef8482')
        .addSnapshotAccountBalance(
          new SnapshotAccountBalanceBuilder()
            .withInitialBalance(500000)
            .withNewBalance(550000)
            .withInflow(300000)
            .withOutflow(-250000)
            .build()
        )
        .build(),
      new SnapshotAccountBuilder()
        .withId('3')
        .withAccountLabel('Operational')
        .withAccountType('group')
        .addSnapshotAccountBalance(
          new SnapshotAccountBalanceBuilder()
            .withInitialBalance(900000)
            .withNewBalance(1100000)
            .withInflow(250000)
            .withOutflow(-50000)
            .build()
        )
        .build(),
    ],
    offChainData: [
      new SnapshotAccountBuilder()
        .withId('1')
        .withAccountLabel('Payment Processor')
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
      new SnapshotAccountBuilder()
        .withId('2')
        // eslint-disable-next-line spellcheck/spell-checker
        .withAccountLabel('Coinbase Account')
        .withAccountType('group')
        .addSnapshotAccountBalance(
          new SnapshotAccountBalanceBuilder()
            .withInitialBalance(900000)
            .withNewBalance(1100000)
            .withInflow(250000)
            .withOutflow(-50000)
            .build()
        )
        .build(),
    ],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(CUReserves, variantsArgs);
export { LightMode, DarkMode };

LightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18675%3A210832',
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
      834: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18595%3A253799',
        options: {
          componentStyle: {
            width: 770,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1194: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A235964',
        options: {
          componentStyle: {
            width: 1130,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=18569%3A231194',
        options: {
          componentStyle: {
            width: 1184,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=19847%3A227648',
        options: {
          componentStyle: {
            width: 1312,
          },
          style: {
            top: 0,
            left: -40,
          },
        },
      },
    },
  } as FigmaParams,
};
