import { TotalExpenseReportsBuilder } from '@ses/core/businessLogic/builders/totalExpenseReportsBuilder';
import { withoutSBPadding } from '@ses/core/utils/storybook/decorators';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import AppLayout from '../AppLayout/AppLayout';
import FinancesOverviewContainer from './FinancesOverviewContainer';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';
import type { Meta } from '@storybook/react';

const meta: Meta<typeof FinancesOverviewContainer> = {
  title: 'Pages/Finances Overview',
  component: FinancesOverviewContainer,
  decorators: [withoutSBPadding],
  parameters: {
    date: new Date('2023-02-14T04:14:00.000Z'),
    chromatic: {
      viewports: [375, 768, 1024, 1280, 1440, 1920],
      pauseAnimationAtEnd: true,
    },
  },
};
export default meta;

const variantsArgs = [
  {
    quarterExpenses: [
      new TotalExpenseReportsBuilder()
        .withPrediction(5236845)
        .withActuals(4521236)
        .withBudgetCap(6523658)
        .withQuarterPeriod(2022, 1)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(9121456)
        .withActuals(9191222)
        .withBudgetCap(9562451)
        .withQuarterPeriod(2022, 2)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(4232845)
        .withActuals(5432168)
        .withBudgetCap(6392563)
        .withQuarterPeriod(2022, 3)
        .build(),
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
    monthlyExpenses: [
      new TotalExpenseReportsBuilder().withPrediction(425631).withActuals(1082362).withMonthlyPeriod(2023, 1).build(),
      new TotalExpenseReportsBuilder().withPrediction(2451235).withActuals(451235).withMonthlyPeriod(2023, 2).build(),
      new TotalExpenseReportsBuilder().withPrediction(2311111).withActuals(1111454).withMonthlyPeriod(2023, 3).build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(222222)
        .withActuals(1522355)
        .withDiscontinued(235632)
        .withMonthlyPeriod(2023, 4)
        .build(),
      new TotalExpenseReportsBuilder().withPrediction(245325).withActuals(745225).withMonthlyPeriod(2022, 5).build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(1325521)
        .withActuals(2242531)
        .withDiscontinued(365236)
        .withMonthlyPeriod(2023, 6)
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(231563)
        .withActuals(242156)
        .withDiscontinued(125543)
        .withMonthlyPeriod(2023, 7)
        .build(),
      new TotalExpenseReportsBuilder().withPrediction(231563).withActuals(53624).withMonthlyPeriod(2023, 8).build(),
      new TotalExpenseReportsBuilder().withPrediction(231563).withActuals(233362).withMonthlyPeriod(2023, 9).build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(231563)
        .withActuals(645225)
        .withDiscontinued(235632)
        .withMonthlyPeriod(2023, 10)
        .build(),
      new TotalExpenseReportsBuilder().withPrediction(231563).withActuals(632531).withMonthlyPeriod(2023, 11).build(),
      new TotalExpenseReportsBuilder().withPrediction(231563).withActuals(1242156).withMonthlyPeriod(2023, 12).build(),
    ] as Partial<ExpenseDto>[],
    byBudgetBreakdownExpenses: [
      new TotalExpenseReportsBuilder()
        .withPrediction(5827878)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('PE', 'Protocol Engineering')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(3433400)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('GRO', 'Growth')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(3112752)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('CES', 'Collateral Engineering Services')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(2633200)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('RISK', 'Risk')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(2539612)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('ORA', 'Oracles')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(2364780)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('DECO', 'Deco Protocol')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(2364780)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('TECH', 'TechOps')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(1739908)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('SF', 'Strategic Happiness')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(1573652)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('DEL', 'Feedback Loops LLC')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(1240280)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('DUX', 'Development & UX')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(779481)
        .withActuals(329481)
        .withAnnualPeriod(2023)
        .withBudget('/makerdao/ecosystem-actors')
        .extend('DEWIZ', 'DEWIZ')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(425631)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('TEST', 'Testing')
        .build(),
      new TotalExpenseReportsBuilder()
        .withPrediction(425631)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('TEST', 'Testing')
        .build(),

      new TotalExpenseReportsBuilder()
        .withBudget('delegates')
        .withPrediction(415631)
        .withActuals(1082362)
        .withAnnualPeriod(2023)
        .extend('DEL', 'Recognized Delegates')
        .build(),
    ],
    byCategoryBreakdownExpenses: [
      new TotalExpenseReportsBuilder()
        .withCategory('headcount/CompensationAndBenefits')
        .withPrediction(3021102)
        .withActuals(2082362)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('headcount/TravelAndEntertainment')
        .withPrediction(2802112)
        .withActuals(2602124)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('non-headcount/GasExpense')
        .withPrediction(2725452)
        .withActuals(2700000)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('non-headcount/HardwareExpense')
        .withPrediction(2500045)
        .withActuals(2302145)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('non-headcount/ProfessionalServices')
        .withPrediction(1825452)
        .withActuals(1800125)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('non-headcount/SoftwareExpense')
        .withPrediction(1421456)
        .withActuals(1400456)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('non-headcount/ContingencyBuffer')
        .withPrediction(1000000)
        .withActuals(1000000)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('non-headcount/TrainingExpense')
        .withPrediction(980452)
        .withActuals(752865)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('non-headcount/AdminExpense')
        .withPrediction(456325)
        .withActuals(444256)
        .withAnnualPeriod(2023)
        .build(),
      new TotalExpenseReportsBuilder()
        .withCategory('non-headcount/SoftwareDevelopmentExpense')
        .withPrediction(256256)
        .withActuals(202456)
        .withAnnualPeriod(2023)
        .build(),
    ],
    expenseCategories: [],
  },
];

const [[LightMode, DarkMode]] = createThemeModeVariants(
  (props) => (
    <AppLayout>
      <FinancesOverviewContainer {...props} />
    </AppLayout>
  ),
  variantsArgs
);
export { LightMode, DarkMode };
