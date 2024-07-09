import { styled } from '@mui/material';
import React from 'react';
import ForecastBreakdownSection from './ForecastBreakdownSection/ForecastBreakdownSection';
import TotalForecastSection from './TotalForecastSection/TotalForecastSection';
import { useBudgetStatementForecast } from './useBudgetStatementForecast';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface BudgetStatementForecastProps {
  currentMonth: DateTime;
  budgetStatements: BudgetStatement[];
  longCode: string;
  shortCode: string;
  headline: React.ReactNode;
  resource: ResourceType;
}

export const BudgetStatementForecast: React.FC<BudgetStatementForecastProps> = ({
  currentMonth,
  budgetStatements,
  longCode,
  shortCode,
  headline,
  resource,
}) => {
  const {
    headerIds,
    mainTableColumns,
    mainTableItems,
    breakdownColumnsForActiveTab,
    breakdownItems,
    breakdownTitleRef,
    breakdownTabs,
  } = useBudgetStatementForecast(currentMonth, budgetStatements);

  return (
    <Container>
      {headline}
      <TotalForecastSection
        currentMonth={currentMonth}
        longCode={longCode}
        mainTableColumns={mainTableColumns}
        mainTableItems={mainTableItems}
        shortCode={shortCode}
      />
      <ForecastBreakdownSection
        breakdownColumnsForActiveTab={breakdownColumnsForActiveTab}
        breakdownItems={breakdownItems}
        breakdownTabs={breakdownTabs}
        breakdownTitleRef={breakdownTitleRef}
        currentMonth={currentMonth}
        headerIds={headerIds}
        longCode={longCode}
        mainTableItems={mainTableItems}
        resource={resource}
        shortCode={shortCode}
      />
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 64,
});
