import { styled } from '@mui/material';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import InformationBudgetCapOverview from '../OverviewSection/BudgetUtilizationCard/BudgetUtilizationCard';
import DoughnutChartFinances from './OverviewCardKeyDetailsBudget/DoughnutChartFinances/DoughnutChartFinances';
import type { AnalyticMetric } from '@ses/core/models/interfaces/analytic';

interface Props {
  selectedMetric: AnalyticMetric;
  handleSelectedMetric: (selectedMetric: AnalyticMetric) => void;
  paymentsOnChain: number;
  budgetCap: number;
  doughnutSeriesData: DoughnutSeries[];
  isCoreThirdLevel: boolean;
  changeAlignment: boolean;
  showSwiper: boolean;
  numberSliderPerLevel?: number;
}

const CardChartOverview: React.FC<Props> = ({
  selectedMetric,
  // TODO: Uncomment this line after the chart filters are implemented (notice to reviewers: this is WIP)
  // handleSelectedMetric,
  paymentsOnChain,
  budgetCap,
  doughnutSeriesData,
  isCoreThirdLevel,
  changeAlignment,
  showSwiper,
  numberSliderPerLevel,
}) => (
  <Container>
    <InformationBudgetCapOverview paymentsOnChain={paymentsOnChain} budgetCap={budgetCap} />
    <DoughnutChartFinances
      doughnutSeriesData={doughnutSeriesData}
      isCoreThirdLevel={isCoreThirdLevel}
      changeAlignment={changeAlignment}
      showSwiper={showSwiper}
      numberSliderPerLevel={numberSliderPerLevel}
      selectedMetric={selectedMetric}
    />
  </Container>
);

export default CardChartOverview;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  [theme.breakpoints.up('tablet_768')]: {
    height: 223,
    minWidth: 704,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    padding: '16px 24px 24px 32px',
    height: 223,
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: '16px 16px  48px 64px',
    height: 311,
  },
  [theme.breakpoints.up('desktop_1440')]: {
    padding: '16px 16px  48px 64px',
    height: 311,
  },
}));
