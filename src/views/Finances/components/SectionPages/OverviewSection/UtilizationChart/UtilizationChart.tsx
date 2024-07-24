import { styled, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import Card from '@/components/Card/Card';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import FilterTabs from './FilterTabs/FilterTabs';
import MobileChart from './MobileChart/MobileChart';
import type { Theme } from '@mui/material';

interface UtilizationChartProps {
  seriesData: DoughnutSeries[];
}

const UtilizationChart: React.FC<UtilizationChartProps> = ({ seriesData }) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('tablet_768'));
  const [activeTab, setActiveTab] = useState('Budget');

  return (
    <CardContainer>
      <FilterTabs
        tabs={['Budget', 'Forecast', 'Net Protocol Outflow', 'Net Expenses On-chain', 'Actuals']}
        activeTab={activeTab}
        onChangeTab={(tab: string) => setActiveTab(tab)}
      />
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
