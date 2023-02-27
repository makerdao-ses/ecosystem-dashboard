import styled from '@emotion/styled';
import { AdvancedInnerTable } from '@ses/components/advanced-inner-table/advanced-inner-table';
import { Tabs } from '@ses/components/tabs/tabs';
import { TransparencyEmptyTable } from '@ses/containers/transparency-report/placeholders/transparency-empty-table';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { useDelegatesForecast } from './useDelegatesForeCast.mvvm';

import type { BudgetStatementDto } from '@ses/core/models/dto/core-unit.dto';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  budgetStatement: BudgetStatementDto[];
}

const DelegatesForecast: React.FC<Props> = ({ currentMonth, budgetStatement }) => {
  const { isLight } = useThemeContext();
  const {
    breakdownHeadersForecast,
    breakdownItemsForecast,
    breakdownTabsForecast,
    headerIdsForecast,
    mainTableColumnsForecast,
    mainTableItemsForecast,
    thirdIndexForecast,
  } = useDelegatesForecast(currentMonth, budgetStatement);
  return (
    <Container>
      <TotalsMonth isLight={isLight}>{currentMonth.toFormat('MMM yyyy')} Totals</TotalsMonth>
      <AdvancedInnerTable
        columns={mainTableColumnsForecast}
        items={mainTableItemsForecast}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode="DEL"
        tablePlaceholder={<TransparencyEmptyTable breakdown longCode="DEL" />}
      />
      {mainTableItemsForecast.length > 0 && (
        <TitleBreakdown isLight={isLight}>{currentMonth.toFormat('MMM yyyy')} Breakdown</TitleBreakdown>
      )}

      {mainTableItemsForecast.length > 0 && (
        <Tabs
          items={breakdownTabsForecast?.map((header, i) => ({
            item: header,
            id: headerIdsForecast[i],
          }))}
          currentIndex={thirdIndexForecast}
          style={{
            marginBottom: '32px',
          }}
        />
      )}

      {mainTableItemsForecast.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownHeadersForecast}
          items={breakdownItemsForecast}
          longCode="DEL"
          style={{ marginBottom: '64px' }}
          tablePlaceholder={<TransparencyEmptyTable breakdown longCode="DEL" />}
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
    marginTop: 64,
    marginBottom: 24,
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

export default DelegatesForecast;
