import styled from '@emotion/styled';
import { getShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import type { MetricValues } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  semiannual: string;
  isTotal?: boolean;
  className?: string;
  metrics: Partial<MetricValues>;
  activeMetrics: string[];
}

export const CellSemiAnnual: React.FC<Props> = ({ metrics, semiannual, isTotal = false, className, activeMetrics }) => {
  const { isLight } = useThemeContext();

  return (
    <MainContainer isLight={isLight} isTotal={isTotal} className={className}>
      <ContainerCell>
        <Semiannual isLight={isLight}>{semiannual}</Semiannual>
        <ContainerMetricsData>
          {activeMetrics?.map((metric, index) => (
            <Metrics key={index}>
              <Name isLight={isLight}>{getShortNameForMetric(metric)}</Name>
              <Amount isLight={isLight}>{usLocalizedNumber(metrics[metric as keyof MetricValues] ?? 0)}</Amount>
            </Metrics>
          ))}
        </ContainerMetricsData>
      </ContainerCell>
    </MainContainer>
  );
};

export default CellSemiAnnual;

const MainContainer = styled.div<WithIsLight & { isTotal: boolean }>(({ isLight, isTotal }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flex: 1,
  width: isTotal ? 71 : 78,
  alignItems: 'center',
  backgroundColor: isLight ? (isTotal ? 'rgba(209, 222, 230, 0.50)' : 'transparent') : isTotal ? '#2D3C48' : '#405361',
  ...(!isTotal && {
    ':after': {
      content: '""',
      position: 'relative',
      height: 48,
      borderLeft: `1px solid ${isLight ? '#D1DEE6' : 'none'}`,
    },
  }),
}));

const ContainerCell = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});
const Semiannual = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  marginBottom: 6,
  fontWeight: 500,
  fontSize: 14,
  color: isLight ? '#231536' : '#D2D4EF',
}));
const ContainerMetricsData = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
const Metrics = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 70,
});
const Name = styled.div<WithIsLight>(({ isLight }) => ({
  marginBottom: 4,
  fontSize: 11,
  fontWeight: 500,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  color: isLight ? '#708390' : '#D2D4EF',
}));
const Amount = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'center',
}));
