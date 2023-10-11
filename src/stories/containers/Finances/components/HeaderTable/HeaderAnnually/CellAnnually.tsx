import styled from '@emotion/styled';
import { returnShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
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
        <Metrics isLight={isLight} key={index}>
          <Name isLight={isLight}>{returnShortNameForMetric(metric).name}</Name>
          <Amount isLight={isLight}>{usLocalizedNumber(metric.amount)}</Amount>
        </Metrics>
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
  color: isLight ? '#231536' : '#D2D4EF',
  width: '100%',
  fontWeight: 500,
}));

const Metrics = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 78,
  position: 'relative',
  flex: 1,
  ':after': {
    content: '""',
    position: 'absolute',
    height: 48,
    bottom: 4,
    borderRight: `1px solid ${isLight ? '#D1DEE6' : 'red'}`,
  },
  [lightTheme.breakpoints.up('tablet_768')]: {
    ':after': {
      display: 'none',
    },
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 83.5,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: 93.5,
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    minWidth: 80,
  },
}));
const Name = styled.div<WithIsLight>({
  marginBottom: 4,
  fontSize: 11,
  fontWeight: 500,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  color: '#708390',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    textAlign: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginBottom: 2,
  },
});
const Amount = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 11,
  fontWeight: 600,
  textAlign: 'center',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 12,
  },
}));
