import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ExpenditureLevel } from '@ses/core/enums/expenditureLevelEnum';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import React from 'react';
import { getExpenditureLevelForecast } from '../../utils/forecastHelper';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  value: number;
  relativeValue: number;
  month: string;
}

const PopoverForecastDescription: React.FC<Props> = ({ value, relativeValue, month }) => {
  const { isLight } = useThemeContext();
  const expenditureLevel = getExpenditureLevelForecast(value, relativeValue);
  const percent = percentageRespectTo(value, relativeValue);
  const valueShowPercent = Math.trunc(percent) === 0 && value !== 0 ? '-' : `${Math.trunc(percent)}%`;

  return (
    <ContainerInside>
      <RowMonthDescription>
        <Month>{month}</Month>
        <SeverityDistinction
          isLight={isLight}
          levelExpenditure={expenditureLevel === '0' ? ExpenditureLevel.overBudget : expenditureLevel}
        >
          {expenditureLevel === '0' ? '' : expenditureLevel}
        </SeverityDistinction>
      </RowMonthDescription>
      {value >= 0 && (
        <RowPercentBudgetCap>
          <Percent isLight={isLight}>{valueShowPercent}</Percent>
          <Description isLight={isLight}>of budget cap forecasted</Description>
        </RowPercentBudgetCap>
      )}
      <RowAbsoluteNumbers>
        <Forecast>
          <Value isLight={isLight}>{usLocalizedNumber(value)}</Value>
          <DescriptionValue isLight={isLight}>Forecast</DescriptionValue>
        </Forecast>
        <BudgetCap>
          <Value isLight={isLight}>{usLocalizedNumber(relativeValue)}</Value>
          <DescriptionValue isLight={isLight}>Budget Cap</DescriptionValue>
        </BudgetCap>
      </RowAbsoluteNumbers>
    </ContainerInside>
  );
};

export default PopoverForecastDescription;

const ContainerInside = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  width: 188,
});

const RowMonthDescription = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});
const Month = styled.div({
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
});
const SeverityDistinction = styled.div<WithIsLight & { levelExpenditure: string }>(({ isLight, levelExpenditure }) => ({
  fontWeight: 300,
  fontSize: '11px',
  lineHeight: '13px',
  textTransform: 'uppercase',
  color: isLight
    ? levelExpenditure === ExpenditureLevel.low || levelExpenditure === ExpenditureLevel.optimal
      ? '#02CB9B'
      : levelExpenditure === ExpenditureLevel.stretched
      ? '#F08B04'
      : levelExpenditure === ExpenditureLevel.overBudget
      ? '#CB3A0D'
      : '#1E2C37'
    : levelExpenditure === ExpenditureLevel.low || levelExpenditure === ExpenditureLevel.optimal
    ? '#00ED18'
    : levelExpenditure === ExpenditureLevel.stretched
    ? '#FF8237'
    : levelExpenditure === ExpenditureLevel.overBudget
    ? '#FF4085'
    : '#ECF1F3',
}));
const RowPercentBudgetCap = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Percent = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '22px',
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
  color: isLight ? '#000000' : '#FFFFFF',
  marginBottom: 4,
}));
const Description = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: 12,
  lineHeight: '15px',
  color: isLight ? '#231536' : '#FFFFFF',
}));
const DescriptionValue = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: isLight ? '#231536' : '#EDEFFF',
}));

const RowAbsoluteNumbers = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Forecast = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const Value = styled.div<WithIsLight>(({ isLight }) => ({
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '0.3px',
  fontFeatureSettings: " 'tnum' on, 'lnum' on",
  color: isLight ? '#000000' : '#EDEFFF',
  marginBottom: 4,
}));

const BudgetCap = styled.div({
  display: 'flex',
  flexDirection: 'column',
});
