import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { getHeaderForFilters, monthAbbreviations } from '../../utils/utils';
import CellAnnually from './CellsForHeader/CellAnnually';
import CellMonthly from './CellsForHeader/CellMonthly';
import CellQuarterly from './CellsForHeader/CellQuarterly';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  metrics: string[];
  period: string;
  title: string;
  className?: string;
  year: string;
}

const HeaderTable: React.FC<Props> = ({ title, metrics, year, className, period }) => {
  const { isLight } = useThemeContext();

  const result = getHeaderForFilters(period, year);
  const hasBorderRight = period === 'Quarterly';
  console.log('result', result);
  return (
    <Container isLight={isLight} className={className}>
      <TitleContainer isLight={isLight} hasBorderRight={hasBorderRight}>
        <Title isLight={isLight}>{title}</Title>
      </TitleContainer>
      {period === 'Quarterly' && (
        <ContainerCell>
          {result.periods.map((period) => (
            <CellQuarterly metrics={metrics} period={period} />
          ))}
          <CellQuarterly metrics={metrics} period={'Total'} />
        </ContainerCell>
      )}
      {period === 'Annually' && (
        <ContainerAnnually>
          <Year>{year}</Year>
          <ContainerCell>
            {metrics.map((metric) => (
              <CellAnnually metric={metric} />
            ))}
          </ContainerCell>
        </ContainerAnnually>
      )}
      {period === 'Monthly' && (
        <ContainerMonthly>
          <ContainerMonthlyCell>
            {monthAbbreviations.map((month) => (
              <CellMonthly metrics={metrics} month={month} />
            ))}
          </ContainerMonthlyCell>
        </ContainerMonthly>
      )}
    </Container>
  );
};

export default HeaderTable;

const Container = styled.div<WithIsLight>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  borderRadius: 6,
  backgroundColor: isLight ? '#E5E9EC' : 'red',
  boxShadow: isLight ? '0px 1px 3px 0px rgba(190, 190, 190, 0.25), 0px 20px 40px 0px rgba(219, 227, 237, 0.40)' : 'red',
  padding: '16px 32px',
  height: 95,
  alignItems: 'center',
  whiteSpace: 'pre',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    width: 0,
  },
  '& div:last-of-type': {
    borderRight: 'none',
  },
}));

const Title = styled.div<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : 'red',
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontStyle: 'normal',
  fontWeight: 700,
  lineHeight: 'normal',
}));

const TitleContainer = styled.div<WithIsLight & { hasBorderRight?: boolean }>(
  ({ isLight, hasBorderRight = false }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 48,
    height: 48,
    borderRight: hasBorderRight ? `1px solid ${isLight ? '#D1DEE6' : 'red'}` : 'none',
    [lightTheme.breakpoints.up('desktop_1194')]: {
      width: 229,
    },
  })
);

const ContainerCell = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
});

const Year = styled.div({
  textAlign: 'center',
  fontSize: 18,
  fontStyle: 'normal',
  lineHeight: 'normal',
});

const ContainerAnnually = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  flex: 1,
});

const ContainerMonthly = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  flex: 1,
});

const ContainerMonthlyCell = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: 12,
  flex: 1,
});
