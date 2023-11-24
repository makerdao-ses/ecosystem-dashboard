import { TotalExpenseReportsBuilder } from '@ses/core/businessLogic/builders/totalExpenseReportsBuilder';
import { createThemeModeVariants } from '@ses/core/utils/storybook/factories';
import useFinancesOverview from '../../useFinancesOverview';
import CostBreakdownTable from './CostBreakdownTable';
import type { CostBreakdownFilterValue, ExtendedExpense } from '../../financesOverviewTypes';
import type { Meta } from '@storybook/react';
import type { FigmaParams } from 'sb-figma-comparator';

const meta: Meta<typeof CostBreakdownTable> = {
  title: 'Components/Finances/Cost Breakdown Table',
  component: CostBreakdownTable,
  parameters: {
    chromatic: {
      viewports: [375, 768],
    },
  },
};
export default meta;

const byBudgetBreakdownExpenses = [
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
];
const byCategoryBreakdownExpenses = [
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
];

const BuilderComponent: React.FC<{ filter: CostBreakdownFilterValue }> = ({ filter }) => {
  const {
    setSelectedFilter,
    byBudgetExpenses,
    remainingBudgetCU,
    remainingBudgetDelegates,
    maxValueByBudget,
    byCategoryExpenses,
    remainingCategories,
    maxValueByCategory,
    costBreakdownTotal,
    remainingEcosystemActors,
  } = useFinancesOverview([], [], byBudgetBreakdownExpenses as ExtendedExpense[], byCategoryBreakdownExpenses);

  return (
    <CostBreakdownTable
      remainingEcosystemActors={remainingEcosystemActors}
      selectedFilter={filter}
      setSelectedFilter={setSelectedFilter}
      byBudgetExpenses={byBudgetExpenses}
      remainingBudgetCU={remainingBudgetCU}
      remainingBudgetDelegates={remainingBudgetDelegates}
      maxValueByBudget={maxValueByBudget}
      byCategoryExpenses={byCategoryExpenses}
      remainingCategories={remainingCategories}
      maxValueByCategory={maxValueByCategory}
      total={costBreakdownTotal}
    />
  );
};
const [[ByBudgetLightMode, ByBudgetDarkMode]] = createThemeModeVariants(BuilderComponent, [{ filter: 'By budget' }]);
export { ByBudgetLightMode, ByBudgetDarkMode };

const [[ByCategoryLightMode, ByCategoryDarkMode]] = createThemeModeVariants(BuilderComponent, [
  { filter: 'By Category' },
]);
export { ByCategoryLightMode, ByCategoryDarkMode };

ByBudgetLightMode.parameters = {
  figma: {
    component: {
      0: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=25230:206973',
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
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24815:141273',
        options: {
          componentStyle: {
            width: 704,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1024: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24815:145653',
        options: {
          componentStyle: {
            width: 960,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1280: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=15343:204060',
        options: {
          componentStyle: {
            width: 640,
          },
          style: {
            top: -20,
            left: -40,
          },
        },
      },
      1440: {
        component: 'https://www.figma.com/file/pyaYEjcwF2b5uf9y0vIfIy/SES-Dashboard?type=design&node-id=24631:228180',
        options: {
          componentStyle: {
            width: 744,
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
