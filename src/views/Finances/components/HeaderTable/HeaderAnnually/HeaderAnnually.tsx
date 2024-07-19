import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import type { MetricValues } from '@/views/Finances/utils/types';
import { filterActiveMetrics } from '@/views/Finances/utils/utils';
import { orderMetrics } from '../utils';
import CellAnnually from './CellAnnually';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  year: string;
  title: string;
  headerTable: MetricValues[];
  activeMetrics: string[];
}

export const HeaderAnnually: React.FC<Props> = ({ year, title, activeMetrics, headerTable }) => {
  const { isLight } = useThemeContext();

  const metricsActive = filterActiveMetrics(activeMetrics, headerTable);

  return (
    <Container isLight={isLight}>
      <ContainerAnnually>
        <ContainerTitle isLight={isLight}>
          <Title isLight={isLight}>{title}</Title>
        </ContainerTitle>
        <ContainerYear>
          <Year isLight={isLight}>{year}</Year>
          <ContainerAnnuallyCell>
            <CellAnnually metrics={metricsActive[0]} activeMetrics={orderMetrics(undefined, activeMetrics)} />
          </ContainerAnnuallyCell>
        </ContainerYear>
      </ContainerAnnually>
    </Container>
  );
};

export default HeaderAnnually;

const ContainerAnnually = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '16px 8px',
  flex: 1,
  whiteSpace: 'break-spaces',
  [lightTheme.breakpoints.up('tablet_768')]: {
    padding: '16px 8px',
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    padding: '16px 32px',
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: 1312,
  },
});

const Year = styled.div<WithIsLight>(({ isLight }) => ({
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: 'normal',
  marginBottom: 8,
  color: isLight ? '#231536' : '#D2D4EF',
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 24,
    fontSize: 18,
  },
}));

const ContainerAnnuallyCell = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  [lightTheme.breakpoints.up('tablet_768')]: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  whiteSpace: 'break-spaces',
  maxWidth: '100%',
  wordWrap: 'break-word',
  paddingRight: 8,

  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
}));

const ContainerTitle = styled.div<WithIsLight>({
  width: 78,
  minWidth: 78,
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'break-spaces',
  [lightTheme.breakpoints.up('tablet_768')]: {
    width: 140,
    height: 48,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 140,
  },
  [lightTheme.breakpoints.up('desktop_1024')]: {
    width: 140,
  },
  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 190,
  },
  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 170,
  },
  [lightTheme.breakpoints.up('desktop_1920')]: {
    width: 195,
  },
});

const ContainerYear = styled.div({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
});

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
  overflow: 'hidden',
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));
