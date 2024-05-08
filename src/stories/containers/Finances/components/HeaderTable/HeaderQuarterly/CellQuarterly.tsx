import styled from '@emotion/styled';
import { getKeyMetric, getShortNameForMetric } from '@ses/containers/Finances/utils/utils';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { MetricValues } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  quarterly: string;
  isTotal?: boolean;
  className?: string;
  metrics: Partial<MetricValues>;
  activeMetrics: string[];
}

export const CellQuarterly: React.FC<Props> = ({ metrics, activeMetrics, quarterly, isTotal = false, className }) => {
  const { isLight } = useThemeContext();
  return (
    <MainContainer isLight={isLight} isTotal={isTotal} className={className}>
      <ContainerCell>
        <Quarterly isLight={isLight}>{quarterly}</Quarterly>
        <ContainerMetricsData>
          {activeMetrics?.map((metric, index) => (
            <Metrics key={index}>
              <Name isLight={isLight}>{getShortNameForMetric(metric)}</Name>
              <Amount isLight={isLight}>
                {usLocalizedNumber(metrics?.[getKeyMetric(metric) as keyof MetricValues] ?? 0)}
              </Amount>
            </Metrics>
          ))}
        </ContainerMetricsData>
      </ContainerCell>
    </MainContainer>
  );
};

export default CellQuarterly;

const MainContainer = styled.div<WithIsLight & { isTotal: boolean }>(({ isLight, isTotal }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  flex: 1,
  width: isTotal ? 105 : 96,
  alignItems: 'center',
  padding: isTotal ? '16px 0px 16px 8px' : '16px 4px',
  backgroundColor: isLight ? (isTotal ? 'rgba(209, 222, 230, 0.50)' : 'transparent') : isTotal ? '#374752' : '#405361)',
  ...(!isTotal && {
    ':after': {
      content: '""',
      position: 'relative',
      height: 48,
      left: 10,
      borderRight: `1px solid ${isLight ? '#D1DEE6' : '#546978'}`,
      [lightTheme.breakpoints.up('tablet_768')]: {
        left: 6,
      },
      [lightTheme.breakpoints.up('desktop_1024')]: {
        left: 4,
      },
      [lightTheme.breakpoints.up('desktop_1280')]: {
        left: 0,
      },

      [lightTheme.breakpoints.up('desktop_1440')]: {
        left: 0,
      },
      [lightTheme.breakpoints.up('desktop_1920')]: {
        left: 2,
      },
    },
  }),
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: isTotal ? 144 : 100,

    padding: isTotal ? '16px 4px 16px' : '16px 4px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: isTotal ? 162 : 190,
    padding: isTotal ? '16px 1px' : '16px 0px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: isTotal ? 197 : 191,
    padding: '16px 0px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    minWidth: isTotal ? 285 : 284,
  },
}));

const ContainerCell = styled.div({
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
const Quarterly = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  marginBottom: 6,
  fontWeight: 700,
  fontSize: 16,
  color: isLight ? '#231536' : '#D2D4EF',

  [lightTheme.breakpoints.up('desktop_1280')]: {
    fontSize: 20,
    fontWeight: 600,
    letterSpacing: '0.4px',
  },
}));
const ContainerMetricsData = styled.div({
  display: 'flex',
  flexDirection: 'column',

  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
const Metrics = styled.div({
  display: 'flex',
  flexDirection: 'column',
  minWidth: 77.5,
  [lightTheme.breakpoints.up('desktop_1280')]: {
    minWidth: 83.5,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    minWidth: 93.5,
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    minWidth: 80,
  },
});
const Name = styled.div<WithIsLight>(({ isLight }) => ({
  marginBottom: 4,
  fontSize: 11,
  fontWeight: 500,
  textAlign: 'center',
  fontStyle: 'normal',
  lineHeight: 'normal',
  color: isLight ? '#708390' : '#708390',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    textAlign: 'center',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    marginBottom: 2,
  },
}));
const Amount = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 12,
  fontWeight: 600,
  textAlign: 'center',
}));
