import styled from '@emotion/styled';
import { getKeyMetric, getShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { MetricValues } from '@ses/containers/Finances/utils/types';

import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: Partial<MetricValues>;
  activeMetrics: string[];
}

export const CellAnnually: React.FC<Props> = ({ metrics, activeMetrics }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerCell isLight={isLight} activeMetrics={activeMetrics.length}>
      {activeMetrics?.map((metric, index) => (
        <Metrics isLight={isLight} key={index}>
          <Name isLight={isLight}>{getShortNameForMetric(metric)}</Name>
          <Amount isLight={isLight}>
            {usLocalizedNumber(metrics[getKeyMetric(metric) as keyof MetricValues] ?? 0)}
          </Amount>
        </Metrics>
      ))}
    </ContainerCell>
  );
};

export default CellAnnually;

const ContainerCell = styled.div<WithIsLight & { activeMetrics: number }>(({ isLight, activeMetrics }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  color: isLight ? '#231536' : '#D2D4EF',
  width: '100%',
  fontWeight: 500,
  ...(activeMetrics === 3 && {
    '& > div:nth-of-type(3)': {
      ':after': {
        left: 4,
      },
    },
  }),
  ...(activeMetrics === 2 && {
    '& > div:nth-of-type(2)': {
      ':after': {
        left: 2,
        bottom: -6,
        height: 42,
      },
    },
  }),
  [lightTheme.breakpoints.up('desktop_1440')]: {
    gap: 60,
    paddingLeft: 20,
  },
}));

const Metrics = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 80,
  flex: 1,
  position: 'relative',
  ':after': {
    content: '""',
    position: 'absolute',
    height: 48,
    bottom: 4,
    borderRight: `1px solid ${isLight ? '#D1DEE6' : '#546978'}`,
  },
  padding: 0,
  [lightTheme.breakpoints.up('tablet_768')]: {
    ':after': {
      display: 'none',
    },
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 192,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 78,
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
