import styled from '@emotion/styled';
import { returnShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { MetricsWithAmount } from '@ses/containers/Finances/utils/types';

import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MetricsWithAmount[];
  title: string;
  isTotal?: boolean;
}

export const CellMonthly: React.FC<Props> = ({ metrics, title, isTotal = false }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerCell isLight={isLight} isTotal={isTotal}>
      <Month>{title}</Month>
      {metrics?.map((metric, index) => (
        <Metric key={index}>{returnShortNameForMetric(metric).name}</Metric>
      ))}
    </ContainerCell>
  );
};

export default CellMonthly;

const ContainerCell = styled.div<WithIsLight & { isTotal: boolean }>(({ isLight, isTotal }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: isLight ? '#231536' : 'red',
  width: '100%',
  fontWeight: 500,
  backgroundColor: isLight ? (isTotal ? 'rgba(209, 222, 230, 0.50)' : 'transparent') : isTotal ? 'red' : 'red',
  ...(isTotal && {
    padding: '16px 0px 16px 0px',
  }),
}));
const Metric = styled.div({
  fontSize: 11,
  textAlign: 'center',
  flex: 1,
});

const Month = styled.div({
  color: '#231536',
  textAlign: 'center',
  fontFamily: 'Inter, sans-serif',
  fontSize: 18,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: 'normal',
  marginBottom: 24,
});
