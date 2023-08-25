import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { returnShortNameForMetric } from '../../../utils/utils';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  period: string;
  metrics: string[];

  className?: string;
}

const CellQuarterly: React.FC<Props> = ({ metrics, period, className }) => {
  const { isLight } = useThemeContext();
  return (
    <ContainerCell className={className}>
      <Period isLight={isLight}>{period}</Period>
      <ContainerMetric>
        {metrics.map((metric, index) => (
          <Metrics key={index} isLight={isLight}>
            {returnShortNameForMetric(metric)}
          </Metrics>
        ))}
      </ContainerMetric>
    </ContainerCell>
  );
};

export default CellQuarterly;

const ContainerCell = styled.div({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #D1DEE6;',
  paddingLeft: 18,
  paddingRight: 18,
  flex: 1,
});

const Period = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontSize: 20,
  lineHeight: 'normal',
  fontStyle: 'normal',
  fontWeight: 600,
  letterSpacing: '0.4px',
  textAlign: 'center',
  marginBottom: 25,
}));

const Metrics = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  color: isLight ? '#231536' : 'red',
  fontSize: 11,
  fontWeight: 600,
  lineHeight: 'normal',
  whiteSpace: 'pre',
  width: 77,
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 68,
  },
}));

const ContainerMetric = styled.div({
  display: 'flex',
  flexDirection: 'row',
  textTransform: 'none',
  justifyContent: 'space-between',
  flex: 1,

  [lightTheme.breakpoints.up('desktop_1440')]: {
    '& tr:nth-child(even)': {
      marginLeft: 4,
    },
    '& tr:nth-child(odd)': {
      marginRight: -3,
    },
  },
});
