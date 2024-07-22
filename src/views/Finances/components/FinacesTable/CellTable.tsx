import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import LinkCellComponent from '../LinkCellComponent/LinkCellComponent';
import { filterMetricValues } from '../SectionPages/BreakdownTable/utils';
import type { MetricValues } from '../../utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: string[];
  value: MetricValues;
  href: string;
  isSummaryRow?: boolean;
}

const CellTable: React.FC<Props> = ({ metrics, value, href, isSummaryRow }) => {
  const element = filterMetricValues(value, metrics as (keyof MetricValues)[]);
  const { isLight } = useThemeContext();
  return (
    <Cell isLight={isLight}>
      <LinkCellComponent href={href} isSummaryRow={isSummaryRow}>
        <SpacedValues>
          {metrics.map((metric, index) => (
            <Span key={index} isLight={isLight}>
              {usLocalizedNumber(element[metric as keyof MetricValues] ?? 0, 0)}
            </Span>
          ))}
        </SpacedValues>
      </LinkCellComponent>
    </Cell>
  );
};

export default CellTable;

const Cell = styled.td<WithIsLight>(({ isLight }) => ({
  borderRight: `1px solid ${isLight ? '#D8E0E3' : '#405361'}`,
  padding: '16px 8px',
  textAlign: 'center',
  fontSize: 12,
  position: 'relative',
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 20px',
  },
}));

const SpacedValues = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const Span = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  minWidth: 77.5,
  textAlign: 'center',
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
