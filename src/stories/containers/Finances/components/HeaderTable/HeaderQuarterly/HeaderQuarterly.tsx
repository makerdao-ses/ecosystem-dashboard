import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import CellQuarterly from './CellQuarterly';
import type { MetricsWithAmount } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  title: string;
  className?: string;
  metrics: Record<string, MetricsWithAmount[]>;
  metricTotal: MetricsWithAmount[];
}

const HeaderQuarterly: React.FC<Props> = ({ title, className, metrics, metricTotal }) => {
  const { isLight } = useThemeContext();
  const keysMetrics = Object.keys(metrics);
  return (
    <Container isLight={isLight} className={className}>
      <TitleContainer isLight={isLight}>
        <Title isLight={isLight}>{title}</Title>
      </TitleContainer>

      <ContainerCell>
        {keysMetrics?.map((key, index) => (
          <CellQuarterly metrics={metrics[key]} quarterly={key} key={index} />
        ))}
        <CellQuarterlyTotal metrics={metricTotal} quarterly="Total" isTotal />
      </ContainerCell>
    </Container>
  );
};

export default HeaderQuarterly;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  borderRadius: 6,
  backgroundColor: isLight ? '#E5E9EC' : '#405361',
  boxShadow: isLight
    ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)'
    : '0px 1px 3px 0px rgba(30, 23, 23, 0.25), 0px 20px 40px -40px rgba(7, 22, 40, 0.40)',
  alignItems: 'center',
  whiteSpace: 'pre',
  overflow: 'auto',
  height: 97,
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  whiteSpace: 'break-spaces',
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
  width: 145,
  padding: '16px 8px 16px 8px',
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 148,
    padding: '16px 0px 16px 8px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 220,

    padding: '16px 0px 16px 32px',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 260,
    padding: '16px 8px 16px 32px',
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    width: 228,

    padding: '16px 0px 16px 16px',
  },
}));

const ContainerCell = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  alignItems: 'center',
});

const CellQuarterlyTotal = styled(CellQuarterly)({
  minHeight: 80,
});
