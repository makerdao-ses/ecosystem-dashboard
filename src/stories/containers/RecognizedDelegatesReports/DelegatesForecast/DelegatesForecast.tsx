import styled from '@emotion/styled';

import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ResourceType } from '@ses/core/models/interfaces/types';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import { TransparencyEmptyTable } from '@/views/CoreUnitBudgetStatement/components/Placeholders/TransparencyEmptyTable';
import { useDelegatesForecast } from './useDelegatesForecast';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatement: BudgetStatement[];
}

const DelegatesForecast: React.FC<Props> = ({ currentMonth, budgetStatement }) => {
  const { isLight } = useThemeContext();
  const { breakdownHeadersForecast, breakdownItemsForecast, mainTableColumnsForecast, mainTableItemsForecast } =
    useDelegatesForecast(currentMonth, budgetStatement);
  return (
    <Container>
      <TotalsMonth isLight={isLight}>{currentMonth.toFormat('MMM yyyy')} Totals</TotalsMonth>
      <AdvancedInnerTable
        columns={mainTableColumnsForecast}
        items={mainTableItemsForecast}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode="DEL"
        tablePlaceholder={
          <TransparencyEmptyTable breakdown longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
        }
      />
      {mainTableItemsForecast.length > 0 && (
        <TitleBreakdown isLight={isLight}>{currentMonth.toFormat('MMM yyyy')} Breakdown</TitleBreakdown>
      )}

      {mainTableItemsForecast.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownHeadersForecast}
          items={breakdownItemsForecast}
          longCode="DEL"
          style={{ marginBottom: '64px' }}
          tablePlaceholder={
            <TransparencyEmptyTable breakdown longCode="DEL" shortCode="DEL" resource={ResourceType.Delegates} />
          }
        />
      )}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const TotalsMonth = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#9FAFB9',
  marginBottom: 16,
  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: 24,
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const TitleBreakdown = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.4px',
  marginTop: 40,
  marginBottom: 32,
  color: isLight ? '#231536' : '#9FAFB9',

  [lightTheme.breakpoints.up('table_834')]: {
    marginTop: 0,
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

export default DelegatesForecast;
