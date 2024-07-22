import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { MetricValues } from '@/views/Finances/utils/types';
import { filterActiveMetrics } from '@/views/Finances/utils/utils';
import { orderMetrics } from '../utils';
import CellMonthly from './CellMonthly';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  title: string;
  headerTable: MetricValues[];
  activeMetrics: string[];
}

export const HeaderMonthly: React.FC<Props> = ({ title, activeMetrics, headerTable }) => {
  const keysMetrics = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Total'];
  const metricsActive = filterActiveMetrics(activeMetrics, headerTable);

  const { isLight } = useThemeContext();
  return (
    <Container isLight={isLight}>
      <ContainerAnnually>
        <ContainerTitle>
          <Title isLight={isLight}>{title}</Title>
        </ContainerTitle>
        <ContainerYear>
          <ContainerAnnuallyCell>
            {keysMetrics.map((month, index) => (
              <CellMonthly
                metrics={metricsActive[index]}
                title={month}
                key={month}
                activeMetrics={orderMetrics(undefined, activeMetrics)}
              />
            ))}
          </ContainerAnnuallyCell>
        </ContainerYear>
      </ContainerAnnually>
    </Container>
  );
};

export default HeaderMonthly;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-start',
  borderRadius: 6,
  backgroundColor: isLight ? '#E5E9EC' : '#405361',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  alignItems: 'center',
  whiteSpace: 'pre',
  overflow: 'hidden',
  height: 97,
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));
const ContainerAnnually = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',

  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
});

const ContainerAnnuallyCell = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  paddingTop: 10,
  paddingBottom: 10,
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  whiteSpace: 'normal',
  maxWidth: '100%',
  wordWrap: 'break-word',
  paddingRight: 8,
}));

const ContainerTitle = styled.div({
  display: 'flex',
  padding: '16px 0px 16px 32px',
  alignItems: 'center',
  width: 195,
  height: 48,
  paddingTop: 10,
  paddingBottom: 10,
  [lightTheme.breakpoints.up('desktop_1920')]: {
    minWidth: 230,
  },
});

const ContainerYear = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});
