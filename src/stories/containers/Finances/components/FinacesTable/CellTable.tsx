import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { filterMetricValues } from '../SectionPages/BreakdownTable/utils';
import type { MetricValues } from '../../utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: string[];
  value: MetricValues;
}

const CellTable: React.FC<Props> = ({ metrics, value }) => {
  const element = filterMetricValues(value, metrics as (keyof MetricValues)[]);
  const { isLight } = useThemeContext();
  return (
    <Cell isLight={isLight}>
      <SpacedValues>
        {metrics.map((metric, index) => (
          <Span key={index} isLight={isLight}>
            {usLocalizedNumber(element[metric as keyof MetricValues], 0)}
          </Span>
        ))}
      </SpacedValues>
    </Cell>
  );
};

export default CellTable;

const Cell = styled.td<WithIsLight>(({ isLight }) => ({
  borderRight: `1px solid ${isLight ? '#D8E0E3' : '#405361'}`,
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 20px',
  },
}));

const SpacedValues = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    gap: 16,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    gap: 32,
  },
});

const Span = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
}));
