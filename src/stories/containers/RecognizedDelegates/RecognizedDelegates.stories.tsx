import { RecognizedDelegatesBuilder } from '@ses/core/businessLogic/builders/recognizedDelegatesBuilder';
import { TotalExpenseReportsBuilder } from '@ses/core/businessLogic/builders/totalExpenseReportsBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import RecognizedDelegatesContainer from './RecognizedDelegatesContainer';
import type { TotalDelegateDto } from '@ses/core/models/dto/delegatesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'storybook-addon-figma-comparator/dist/ts/types';

const meta: Meta<typeof RecognizedDelegatesContainer> = {
  title: 'Pages/Recognized Delegates',
  component: RecognizedDelegatesContainer,
  parameters: {
    layout: 'fullscreen',
    nextRouter: {
      pathname: '/delegates',
    },
    chromatic: {
      viewports: [375, 834, 1194, 1280, 1440],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    delegates: [
      new RecognizedDelegatesBuilder()
        .withName('Feedblack Loops LLC')
        .withImage('https://live.staticflickr.com/65535/52832796763_a0e2339b3b_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(23325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
      new RecognizedDelegatesBuilder()
        .withName('Flip Flop Flap Delegate LLC')
        .withImage('https://live.staticflickr.com/65535/52808669587_127cc79684_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(292325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
      new RecognizedDelegatesBuilder()
        .withName('GFX Labs')
        .withImage('https://live.staticflickr.com/65535/52832350651_0506c1ff2a_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(282325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
      new RecognizedDelegatesBuilder()
        .withName('Coldirion.eth')
        .withImage('https://live.staticflickr.com/65535/52832350671_ac70b94b13_m.jpg')
        .withLatestVotingContract('0xF1792852BF860b4ef84a2869DF1550BC80eC0aB7')
        .withNumberDai(272325)
        .withSocials({
          twitter: '#',
          forumProfile: '#',
          forumPlatform: '#',
          youtube: '#',
          votingPortal: '#',
        })
        .build(),
    ],
    delegatesNumbers: [
      new TotalExpenseReportsBuilder()
        .withPrediction(1821236)
        .withActuals(20144)
        .withBudget('makerdao/delegates/Flip Flop Flap Delegate LLC')
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 4)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(1236845)
        .withActuals(192)
        .withBudget('makerdao/delegates/Feedblack Loops LLC')
        .withBudgetCap(6523658)
        .withQuarterPeriod(2022, 1)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(3690)
        .withActuals(14292)
        .withBudget('makerdao/delegates/GFX Labs')
        .withBudgetCap(9562451)
        .withQuarterPeriod(2022, 2)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4232845)
        .withActuals(13292)
        .withBudget('makerdao/delegates/Coldirion.eth')
        .withBudgetCap(6392563)
        .withQuarterPeriod(2022, 3)
        .build(),
    ] as ExpenseDto[],
    totalQuarterlyExpenses: {
      delegatesExpenses: [
        new TotalExpenseReportsBuilder()
          .withPrediction(5821236)
          .withActuals(2082362)
          .withBudgetCap(8392323)
          .withQuarterPeriod(2022, 4)
          .build(),
        new TotalExpenseReportsBuilder()
          .withPrediction(4231563)
          .withActuals(2082362)
          .withBudgetCap(8392323)
          .withQuarterPeriod(2023, 1)
          .build(),
        new TotalExpenseReportsBuilder()
          .withPrediction(4231563)
          .withActuals(2082362)
          .withBudgetCap(8392323)
          .withQuarterPeriod(2023, 1)
          .build(),
        new TotalExpenseReportsBuilder()
          .withPrediction(4231563)
          .withActuals(12394)
          .withBudgetCap(8392323)
          .withQuarterPeriod(2023, 1)
          .build(),
        new TotalExpenseReportsBuilder()
          .withPrediction(4231563)
          .withActuals(5082362)
          .withBudgetCap(8392323)
          .withQuarterPeriod(2023, 1)
          .build(),
      ] as ExpenseDto[],
      totalExpenses: [
        new TotalExpenseReportsBuilder()
          .withPrediction(5821236)
          .withActuals(5082362)
          .withBudgetCap(8392323)
          .withQuarterPeriod(2022, 4)
          .build(),
        new TotalExpenseReportsBuilder()
          .withPrediction(4231563)
          .withActuals(5082362)
          .withBudgetCap(8392323)
          .withQuarterPeriod(2023, 1)
          .build(),
      ] as ExpenseDto[],
    } as TotalDelegateDto,
    totalMonthlyExpenses: [
      new TotalExpenseReportsBuilder()
        .withPrediction(5821236)
        .withActuals(22362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2021, 11)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(245362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2021, 12)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(345452)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 1)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(432345)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 2)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(332362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 3)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(332362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 4)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(332362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 5)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(482362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 6)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(482362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 7)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(482362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 8)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(562362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 9)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(562362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 10)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(562362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 11)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(562362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2022, 12)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(562362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2023, 1)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(562362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2023, 2)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4231563)
        .withActuals(562362)
        .withBudgetCap(8392323)
        .withQuarterPeriod(2023, 3)
        .build(),
    ] as ExpenseDto[],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <RecognizedDelegatesContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { LightMode, DarkMode };

const optionStyles = {
  style: {
    top: -16,
    left: -16,
  },
};
LightMode.parameters = {
  figma: {
    component: {
      0: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16759:207820&t=jLRG7vNdHbvDtBzQ-4',
        options: {
          ...optionStyles,
          componentStyle: {
            width: '375px',
          },
        },
      },
      834: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:198497&t=2slOLmhn2jXaUBIK-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: '834px',
          },
        },
      },
      1194: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:195841&t=2slOLmhn2jXaUBIK-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: '1194px',
          },
        },
      },
      1280: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:193184&t=2slOLmhn2jXaUBIK-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: '1280px',
          },
        },
      },
      1440: {
        component:
          'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?node-id=16724:189758&t=2slOLmhn2jXaUBIK-4',
        options: {
          style: {
            top: -16,
            left: -16,
          },
          componentStyle: {
            width: '1440px',
          },
        },
      },
    },
  } as FigmaParams,
};
