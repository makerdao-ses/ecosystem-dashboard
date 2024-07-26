import { styled, useMediaQuery } from '@mui/material';
import Card from '@/components/Card/Card';
import type { AnalyticMetric } from '@/core/models/interfaces/analytic';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import FilterTabs from './FilterTabs/FilterTabs';
import MobileChart from './MobileChart/MobileChart';
import type { Theme } from '@mui/material';

interface UtilizationChartProps {
  seriesData: DoughnutSeries[];
  selectedMetric: AnalyticMetric;
  handleMetricChange: (metric: AnalyticMetric) => void;
}

const UtilizationChart: React.FC<UtilizationChartProps> = ({ seriesData, selectedMetric, handleMetricChange }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <CardContainer>
      <FilterTabs selectedMetric={selectedMetric} onChangeTab={handleMetricChange} />
      <Content>{isMobile ? <MobileChart seriesData={seriesData} /> : <div>Chart</div>}</Content>
    </CardContainer>
  );
};

export default UtilizationChart;

const CardContainer = styled(Card)(({ theme }) => ({
  overflow: 'hidden',

  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
  },
}));

const Content = styled('div')(() => ({
  padding: '8px 16px 16px',
}));
