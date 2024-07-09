import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import CategoryModalComponent from '@/components/AdvancedInnerTable/BasicModal/CategoryModalComponent';
import BreakdownSection from './BreakdownSection/BreakdownSection';
import TotalWalletSections from './TotalWalletSection/TotalWalletSections';
import { useBudgetStatementActuals } from './useBudgetStatementActuals';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface BudgetStatementActualsProps {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatement[];
  longCode: string;
  shortCode: string;
  headline: React.ReactNode;
  resource: ResourceType;
}

export const BudgetStatementActuals: React.FC<BudgetStatementActualsProps> = ({
  currentMonth,
  budgetStatements,
  longCode,
  shortCode,
  headline,
  resource,
}) => {
  const {
    headerIds,
    breakdownTitleRef,
    breakdownColumnsForActiveTab,
    breakdownItemsForActiveTab,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
  } = useBudgetStatementActuals(currentMonth, budgetStatements);
  return (
    <Container>
      {headline}
      <TotalWalletSections
        currentMonth={currentMonth}
        longCode={longCode}
        mainTableColumns={mainTableColumns}
        mainTableItems={mainTableItems}
        shortCode={shortCode}
        resource={resource}
      />
      <ContainerBreakdown>
        <BreakdownSection
          currentMonth={currentMonth}
          mainTableItems={mainTableItems}
          longCode={longCode}
          shortCode={shortCode}
          breakdownTitleRef={breakdownTitleRef}
          breakdownTabs={breakdownTabs}
          headerIds={headerIds}
          breakdownColumnsForActiveTab={breakdownColumnsForActiveTab}
          breakdownItemsForActiveTab={breakdownItemsForActiveTab}
        />
      </ContainerBreakdown>
      <CategoryModalComponent />
    </Container>
  );
};

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

// TODO: delete this
export const LinkDescription = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.colors ? '#231536' : '#D2D4EF',

  span: {
    marginRight: 4,
  },

  [lightTheme.breakpoints.up('table_834')]: {
    fontSize: 16,
  },
}));

export const BreakdownTableWrapper = styled('div')({
  paddingTop: 24,
});

const ContainerBreakdown = styled('div')({
  marginTop: 8,
});
