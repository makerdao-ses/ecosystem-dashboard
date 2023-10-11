import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import CellAnnually from './CellAnnually';
import type { MetricsWithAmount } from '@ses/containers/Finances/utils/types';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  year: string;
  metrics: MetricsWithAmount[];
  title: string;
}

export const HeaderAnnually: React.FC<Props> = ({ year, metrics, title }) => {
  const { isLight } = useThemeContext();
  return (
    <Container isLight={isLight}>
      <ContainerAnnually>
        <ContainerTitle isLight={isLight}>
          <Title>{title}</Title>
        </ContainerTitle>
        <ContainerYear>
          <Year>{year}</Year>
          <ContainerAnnuallyCell>
            <CellAnnually metrics={metrics} />
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

const Year = styled.div({
  textAlign: 'center',
  fontSize: 14,
  fontWeight: 500,
  fontStyle: 'normal',
  lineHeight: 'normal',
  marginBottom: 8,
  [lightTheme.breakpoints.up('tablet_768')]: {
    marginBottom: 24,
    fontSize: 18,
  },
});

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

const Title = styled.div({
  color: '#231536',
  fontFamily: 'Inter, sans-serif',
  fontSize: 11,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
  whiteSpace: 'break-spaces',
  [lightTheme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
});

const ContainerTitle = styled.div<WithIsLight>(({ isLight }) => ({
  width: 76,
  display: 'flex',
  alignItems: 'center',
  borderRight: `1px solid ${isLight ? '#D1DEE6' : 'red'}`,
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
}));

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
  backgroundColor: isLight ? '#E5E9EC' : 'red',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  alignItems: 'center',
  whiteSpace: 'pre',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
    height: 0,
  },
}));