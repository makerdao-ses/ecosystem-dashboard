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
  );
};

export default PopoverForecastDescription;

const ContainerInside = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  width: 188,
});

const RowMonthDescription = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const Month = styled('div')({
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
});
const SeverityDistinction = styled('div')<{ levelExpenditure: string }>(({ theme, levelExpenditure }) => ({
  fontWeight: 600,
  fontSize: 14,
  lineHeight: '22px',
  // textTransform: 'uppercase',
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
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: theme.palette.isLight ? '#000000' : '#FFFFFF',
  marginBottom: 4,
}));
const Description = styled('div')(({ theme }) => ({
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '15px',
  color: theme.palette.isLight ? '#231536' : '#FFFFFF',
}));
const DescriptionValue = styled('div')(({ theme }) => ({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: theme.palette.isLight ? '#231536' : '#EDEFFF',
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
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  fontFeatureSettings: " 'tnum' on, 'lnum' on",
  color: theme ? '#000000' : '#EDEFFF',
  marginBottom: 4,
}));

const BudgetCap = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
