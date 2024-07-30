import { styled, useMediaQuery } from '@mui/material';
import Card from '@/components/Card/Card';
import type { AnalyticMetric } from '@/core/models/interfaces/analytic';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import DesktopChart from './DesktopChart/DesktopChart';
import FilterTabs from './FilterTabs/FilterTabs';
import MobileChart from './MobileChart/MobileChart';
import type { Theme } from '@mui/material';

interface UtilizationChartProps {
  seriesData: DoughnutSeries[];
  selectedMetric: AnalyticMetric;
  handleMetricChange: (metric: AnalyticMetric) => void;
  isCoreThirdLevel: boolean;
  changeAlignment: boolean;
  showSwiper: boolean;
  numberSliderPerLevel?: number;
}

const UtilizationChart: React.FC<UtilizationChartProps> = ({
  seriesData,
  selectedMetric,
  handleMetricChange,
  isCoreThirdLevel,
  changeAlignment,
  showSwiper,
  numberSliderPerLevel,
}) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));

  return (
    <CardContainer>
      <FilterTabs selectedMetric={selectedMetric} onChangeTab={handleMetricChange} />
      <Content>
        {isMobile ? (
          <MobileChart seriesData={seriesData} />
        ) : (
          <DesktopChart
            seriesData={seriesData}
            selectedMetric={selectedMetric}
            isCoreThirdLevel={isCoreThirdLevel}
            changeAlignment={changeAlignment}
            showSwiper={showSwiper}
            numberSliderPerLevel={numberSliderPerLevel}
          />
        )}
      </Content>
    </CardContainer>
  );
};

export default UtilizationChart;

const CardContainer = styled(Card)(({ theme }) => ({
  [theme.breakpoints.up('tablet_768')]: {
    flexDirection: 'row',
  },
}));

const Content = styled('div')(({ theme }) => ({
  padding: '8px 16px 16px',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '8px 16px',
  },
}));
