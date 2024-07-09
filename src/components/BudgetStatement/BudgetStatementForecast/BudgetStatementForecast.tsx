import { styled } from '@mui/material';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import Tabs from '@/components/Tabs/Tabs';

import { TransparencyEmptyTable } from '@/views/CoreUnitBudgetStatement/components/Placeholders/TransparencyEmptyTable';
import { FORECAST_BREAKDOWN_QUERY_PARAM } from '@/views/CoreUnitBudgetStatement/utils/constants';
import { BreakdownTableWrapper } from '../BudgetStatementActuals/BudgetStatementActuals';
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

      <Title>{currentMonth.toFormat('MMM yyyy')} Totals</Title>
      <AdvancedInnerTable
        longCode={longCode}
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition={'top'}
        tablePlaceholder={
          <TransparencyEmptyTable breakdown longCode={longCode} shortCode={shortCode} resource={resource} />
        }
      />
      {!!mainTableItems?.length && (
        <Title marginBottom={24} ref={breakdownTitleRef}>
          {currentMonth.toFormat('MMM yyyy')} Breakdown
        </Title>
      )}

      {!!mainTableItems?.length && (
        <Tabs
          tabs={breakdownTabs.map((header, i) => ({
            item: header,
            id: headerIds[i],
          }))}
          tabQuery={FORECAST_BREAKDOWN_QUERY_PARAM}
        />
      )}

      {!!mainTableItems?.length && (
        <BreakdownTableWrapper>
          <AdvancedInnerTable
            longCode={longCode}
            columns={breakdownColumnsForActiveTab}
            items={breakdownItems}
            cardSpacingSize="small"
            tablePlaceholder={
              <TransparencyEmptyTable breakdown longCode={longCode} shortCode={shortCode} resource={resource} />
            }
          />
        </BreakdownTableWrapper>
      )}
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 64,
});

const Title = styled('div')<{
  marginBottom?: number;
  fontSize?: string;
  responsiveMarginBottom?: number;
  isTitleOfPage?: boolean;
  marginTop?: number;
}>(({ marginBottom = 16, theme, responsiveMarginBottom, isTitleOfPage = false, marginTop = 24 }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: isTitleOfPage ? 500 : 600,
  fontStyle: 'normal',
  fontSize: 16,
  lineHeight: '19px',
  marginTop,
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginBottom: `${marginBottom}px`,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '18px',
    lineHeight: '24px',
    marginBottom: `${responsiveMarginBottom || marginBottom}px`,
  },

  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    fontWeight: 700,
  },
}));
