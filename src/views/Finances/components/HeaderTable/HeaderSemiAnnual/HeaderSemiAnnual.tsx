import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { MetricValues, PeriodicSelectionFilter } from '@/views/Finances/utils/types';
import { filterActiveMetrics } from '@/views/Finances/utils/utils';
import { orderMetrics } from '../utils';
import CellSemiAnnual from './CellSemiAnnual';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  title: string;
  className?: string;
  period: PeriodicSelectionFilter;
  headerTable: MetricValues[];
  activeMetrics: string[];
  year: string;
}

const HeaderSemiAnnual: React.FC<Props> = ({ title, className, activeMetrics, headerTable, year }) => {
  const { isLight } = useThemeContext();
  const keysMetrics = [`H${1} ${year}`, `H${2} ${year}`, 'Total'];
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable);

  return (
    <Container isLight={isLight} className={className}>
      <TitleContainer isLight={isLight}>
        <Title isLight={isLight}>{title}</Title>
      </TitleContainer>

      <ContainerCell>
        {keysMetrics?.map((period, index) => (
          <CellSemiAnnual
            metrics={metricsActive[index]}
            semiannual={period}
            key={index}
            activeMetrics={orderMetrics(undefined, activeMetrics)}
          />
        ))}
      </ContainerCell>
    </Container>
  );
};

export default HeaderSemiAnnual;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  borderRadius: 6,
  paddingTop: 8,
  paddingBottom: 8,
  backgroundColor: isLight ? '#E5E9EC' : '#405361',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  alignItems: 'center',
  whiteSpace: 'pre',
  overflow: 'hidden',
  minHeight: 87,
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  whiteSpace: 'break-spaces',
  maxWidth: '100%',
  wordWrap: 'break-word',
  paddingRight: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    whiteSpace: 'revert',
  },
}));

const TitleContainer = styled.div<WithIsLight>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: 48,
  borderRight: `1px solid ${isLight ? '#D1DEE6' : '#546978'}`,
  width: 85,
  minWidth: 85,
  padding: '16px 0px 16px 8px',
  whiteSpace: 'normal',
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
}));

const ContainerCell = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
  '& > div:last-of-type': {
    minHeight: 87,
  },
});
