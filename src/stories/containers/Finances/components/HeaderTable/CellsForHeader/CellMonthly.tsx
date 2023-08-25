import styled from '@emotion/styled';
import { returnShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: string[];
  month: string;
}
const CellMonthly: React.FC<Props> = ({ metrics, month }) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <Month>{month}</Month>
      <ContainerMetric>
        {metrics.map((metric, index) => (
          <Metrics key={index} isLight={isLight}>
            {returnShortNameForMetric(metric)}
          </Metrics>
        ))}
      </ContainerMetric>
    </Container>
  );
};

export default CellMonthly;

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  textTransform: 'none',
  justifyContent: 'center',
  flex: 1,
});
const Metrics = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 24,
  color: isLight ? '#231536' : 'red',
  fontSize: 11,
  fontWeight: 600,
  lineHeight: 'normal',
  whiteSpace: 'pre',
}));

const Month = styled.div({
  textAlign: 'center',
  fontSize: 18,
  fontWeight: 500,
});

const ContainerMetric = styled.div({
  display: 'flex',
  flexDirection: 'row',
  textTransform: 'none',
  justifyContent: 'center',
  flex: 1,
  [lightTheme.breakpoints.up('table_834')]: {
    gap: 14.63,
  },
});
