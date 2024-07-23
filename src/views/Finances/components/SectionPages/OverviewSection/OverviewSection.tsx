import { styled } from '@mui/material';
import type { AnalyticMetric } from '@/core/models/interfaces/analytic';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import BudgetUtilizationCard from './BudgetUtilizationCard/BudgetUtilizationCard';
import UtilizationChart from './UtilizationChart/UtilizationChart';

interface OverviewSectionProps {
  paymentsOnChain: number;
  budgetCap: number;
  seriesData: DoughnutSeries[];
  isCoreThirdLevel: boolean;
  changeAlignment: boolean;
  showSwiper: boolean;
  numberSliderPerLevel?: number;
  selectedMetric: AnalyticMetric;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
  paymentsOnChain,
  budgetCap,
  seriesData,
  // changeAlignment,
  // isCoreThirdLevel,
  // selectedMetric,
  // showSwiper,
  // numberSliderPerLevel,
}) => (
  <MainContentSection>
    <BudgetUtilizationCard paymentsOnChain={paymentsOnChain} budgetCap={budgetCap} />

    <UtilizationChart seriesData={seriesData} />
    {/* <DoughnutChartFinances
      doughnutSeriesData={doughnutSeriesData}
      isCoreThirdLevel={isCoreThirdLevel}
      changeAlignment={changeAlignment}
      showSwiper={showSwiper}
      numberSliderPerLevel={numberSliderPerLevel}
      selectedMetric={selectedMetric}
    /> */}
  </MainContentSection>
);

export default OverviewSection;

const MainContentSection = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,

  [theme.breakpoints.up('tablet_768')]: {
    gap: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    flexDirection: 'row',

    '& > div:nth-of-type(1)': {
      flex: 1,
    },

    '& > div:nth-of-type(2)': {
      flex: 2,
    },
  },
}));
