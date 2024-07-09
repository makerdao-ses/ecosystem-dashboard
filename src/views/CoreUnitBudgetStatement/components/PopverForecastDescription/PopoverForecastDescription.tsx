import { styled } from '@mui/material';
import { ExpenditureLevel } from '@ses/core/enums/expenditureLevelEnum';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import React from 'react';
import { getExpenditureLevelForecast } from '../../utils/forecastHelper';

interface Props {
  value: number;
  relativeValue: number;
  month: string;
}

const PopoverForecastDescription: React.FC<Props> = ({ value, relativeValue, month }) => {
  const expenditureLevel = getExpenditureLevelForecast(value, relativeValue);
  const percent = percentageRespectTo(value, relativeValue);
  const valueShowPercent = Math.trunc(percent) === 0 && value !== 0 ? '-' : `${Math.trunc(percent)}%`;

  return (
    <Container>
      <ContainerInside>
        <RowMonthDescription>
          <Month>{month}</Month>
          <SeverityDistinction
            levelExpenditure={expenditureLevel === '0' ? ExpenditureLevel.overBudget : expenditureLevel}
          >
            {expenditureLevel === '0' ? '' : expenditureLevel}
          </SeverityDistinction>
        </RowMonthDescription>
        {value >= 0 && (
          <RowPercentBudgetCap>
            <Percent>{valueShowPercent}</Percent>
            <Description>of budget cap forecasted</Description>
          </RowPercentBudgetCap>
        )}
        <RowAbsoluteNumbers>
          <Forecast>
            <Value>{usLocalizedNumber(value)}</Value>
            <DescriptionValue>Forecast</DescriptionValue>
          </Forecast>
          <BudgetCap>
            <Value>{usLocalizedNumber(relativeValue)}</Value>
            <DescriptionValue>Budget Cap</DescriptionValue>
          </BudgetCap>
        </RowAbsoluteNumbers>
      </ContainerInside>
    </Container>
  );
};

export default PopoverForecastDescription;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 16px',
  width: '100%',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
}));
const ContainerInside = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
});

const RowMonthDescription = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
});
const Month = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '24px',
  color: theme.palette.colors.charcoal[400],
}));
const SeverityDistinction = styled('div')<{ levelExpenditure: string }>(({ theme, levelExpenditure }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  marginRight: -4,

  color: theme.palette.isLight
    ? levelExpenditure === ExpenditureLevel.low || levelExpenditure === ExpenditureLevel.optimal
      ? theme.palette.colors.green[700]
      : levelExpenditure === ExpenditureLevel.stretched
      ? theme.palette.colors.orange[700]
      : levelExpenditure === ExpenditureLevel.overBudget
      ? theme.palette.colors.red[700]
      : theme.palette.colors.charcoal[500]
    : levelExpenditure === ExpenditureLevel.low || levelExpenditure === ExpenditureLevel.optimal
    ? theme.palette.colors.green[900]
    : levelExpenditure === ExpenditureLevel.stretched
    ? theme.palette.colors.orange[900]
    : levelExpenditure === ExpenditureLevel.overBudget
    ? theme.palette.colors.red[900]
    : theme.palette.colors.charcoal[500],
}));
const RowPercentBudgetCap = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Percent = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
}));
const Description = styled('div')(({ theme }) => ({
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '15px',
  color: theme.palette.colors.charcoal[500],
}));
const DescriptionValue = styled('div')(({ theme }) => ({
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  marginRight: -4,
  color: theme.palette.colors.charcoal[500],
}));

const RowAbsoluteNumbers = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Forecast = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Value = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
  marginTop: 1,
}));

const BudgetCap = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
