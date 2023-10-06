import styled from '@emotion/styled';
import { returnShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React from 'react';
import type { MetricsWithAmount } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MetricsWithAmount[];
  semiannual: string;
  isTotal?: boolean;
  className?: string;
}

export const CellSemiAnnual: React.FC<Props> = ({ metrics, semiannual, isTotal = false, className }) => {
  const { isLight } = useThemeContext();

  return (
    <MainContainer isLight={isLight} isTotal={isTotal} className={className}>
      <ContainerCell>
        <Semiannual isLight={isLight}>{semiannual}</Semiannual>
        <ContainerMetricsData>
          {metrics?.map((metric, index) => (
            <Metrics key={index}>
              <Name isLight={isLight}>{returnShortNameForMetric(metric).name}</Name>
              <Amount isLight={isLight}>{usLocalizedNumber(metric.amount)}</Amount>
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
  position: 'relative',
  alignItems: 'center',

  backgroundColor: isLight ? (isTotal ? 'rgba(209, 222, 230, 0.50)' : 'transparent') : isTotal ? 'red' : 'red',
  ...(!isTotal && {
    ':after': {
      content: '""',
      position: 'relative',
      height: 48,
      borderLeft: `1px solid ${isLight ? '#D1DEE6' : 'red'}`,
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
  color: isLight ? '#231536' : 'red',
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
  color: isLight ? '#708390' : 'red',
}));
const Amount = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'center',
}));
