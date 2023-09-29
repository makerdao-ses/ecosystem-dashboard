import styled from '@emotion/styled';
import { returnShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { MetricsWithAmount } from '@ses/containers/Finances/utils/types';

import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: MetricsWithAmount[];
}

export const CellAnnually: React.FC<Props> = ({ metrics }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerCell isLight={isLight}>
      {metrics?.map((metric, index) => (
        <Metric key={index}>{returnShortNameForMetric(metric).name}</Metric>
      ))}
    </ContainerCell>
  );
};

export default CellAnnually;

const ContainerCell = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  color: isLight ? '#231536' : 'red',
  width: '100%',
  fontWeight: 500,
  [lightTheme.breakpoints.up('desktop_1440')]: {},
}));

const Metric = styled.div({
  fontSize: 11,
  textAlign: 'center',
  flex: 1,
});
