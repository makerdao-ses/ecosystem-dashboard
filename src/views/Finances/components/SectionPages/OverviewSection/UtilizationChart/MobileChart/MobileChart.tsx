import { styled } from '@mui/material';
import { useMemo } from 'react';
import type { DoughnutSeries } from '@/views/Finances/utils/types';
import LegendItem from './LegendItem';

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
      <LegendsWrapper>
        <LegendContainer>
          {seriesData.map((item) => (
            <LegendItem
              key={item.name}
              inline={seriesData.length > 4}
              name={item.name}
              code={item.code}
              color={item.color}
              value={item.value}
              percentage={item.percent}
            />
          ))}
        </LegendContainer>
      </LegendsWrapper>
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
  alignSelf: 'stretch',
  minHeight: 192,
  width: 32,
  borderRadius: 8,
  overflow: 'hidden',
}));

const Bar = styled('div')<{ color: string; height: number }>(({ color, height }) => ({
  backgroundColor: color,
  height: `${height}%`,
  width: '100%',
}));

const LegendsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 12,
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  width: '100%',
  minHeight: 192,
  padding: 16,
}));

const LegendContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
}));
