import { styled } from '@mui/material';
import { useMemo } from 'react';
import type { DoughnutSeries } from '@/views/Finances/utils/types';

interface MobileChartProps {
  seriesData: DoughnutSeries[];
}

const MobileChart: React.FC<MobileChartProps> = ({ seriesData }) => {
  const series = useMemo(() => {
    const total = seriesData.reduce((acc, item) => acc + item.value, 0);

    return seriesData.map((item) => ({
      ...item,
      percentage: (item.value / total) * 100,
    }));
  }, [seriesData]);

  return (
    <Wrapper>
      <BarContainer>
        {series.map((item) => (
          <Bar key={item.name} color={item.color} height={item.percentage} />
        ))}
      </BarContainer>
      <LegendsContainer>legends</LegendsContainer>
    </Wrapper>
  );
};

export default MobileChart;

const Wrapper = styled('div')(() => ({
  display: 'flex',
  gap: 16,
}));

const BarContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  height: 192,
  width: 32,
  borderRadius: 8,
  overflow: 'hidden',
}));

const Bar = styled('div')<{ color: string; height: number }>(({ color, height }) => ({
  backgroundColor: color,
  height: `${height}%`,
  width: '100%',
}));

const LegendsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : 'red',
  width: '100%',
  height: 192,
}));
