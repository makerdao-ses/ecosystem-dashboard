import { styled } from '@mui/material';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import CategoryModalComponent from '@/components/AdvancedInnerTable/BasicModal/CategoryModalComponent';
import Tabs from '@/components/Tabs/Tabs';
import { ACTUALS_BREAKDOWN_QUERY_PARAM } from '../../utils/constants';
import { TransparencyEmptyTable } from '../Placeholders/TransparencyEmptyTable';
import { useTransparencyActuals } from './useTransparencyActuals';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { ResourceType } from '@ses/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface TransparencyActualsProps {
  currentMonth: DateTime;
  budgetStatements?: BudgetStatement[];
  longCode: string;
  shortCode: string;
  headline: React.ReactNode;
  resource: ResourceType;
}

export const TransparencyActuals: React.FC<TransparencyActualsProps> = ({
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
  } = useTransparencyActuals(currentMonth, budgetStatements);

  return (
    <Container>
      {headline}

      <Title>{currentMonth.toFormat('MMM yyyy')} Totals</Title>
      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode={longCode}
        tablePlaceholder={
          <div style={{ marginBottom: 64 }}>
            <TransparencyEmptyTable longCode={longCode} shortCode={shortCode} resource={resource} />
          </div>
        }
      />
      {mainTableItems.length > 0 && (
        <Title ref={breakdownTitleRef} isBreakDown>
          {currentMonth.toFormat('MMM yyyy')} Breakdown
        </Title>
      )}

      {mainTableItems.length > 0 && (
        <Tabs
          tabs={breakdownTabs.map((header, i) => ({
            item: header,
            id: headerIds[i],
          }))}
          tabQuery={ACTUALS_BREAKDOWN_QUERY_PARAM}
        />
      )}

      {mainTableItems.length > 0 && (
        <BreakdownTableWrapper>
          <AdvancedInnerTable
            columns={breakdownColumnsForActiveTab}
            items={breakdownItemsForActiveTab}
            longCode={longCode}
            style={{ marginBottom: 64 }}
            cardSpacingSize="small"
            tablePlaceholder={
              <div style={{ marginBottom: 64 }}>
                <TransparencyEmptyTable breakdown longCode={longCode} shortCode={shortCode} resource={resource} />
              </div>
            }
          />
        </BreakdownTableWrapper>
      )}
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

const Title = styled('div')<{
  marginBottom?: number;
  fontSize?: string;
  responsiveMarginBottom?: number;
  isBreakDown?: boolean;
  marginTop?: number;
}>(({ marginBottom = 16, theme, responsiveMarginBottom, marginTop = 24, isBreakDown = false }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: isBreakDown ? 700 : 600,
  fontStyle: 'normal',
  fontSize: 16,
  lineHeight: isBreakDown ? '19.36px' : '24px',
  marginTop,
  letterSpacing: '0.4px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  marginBottom: `${marginBottom}px`,

  [theme.breakpoints.up('tablet_768')]: {
    fontSize: '18px',
    lineHeight: '21.6px',
    fontWeight: 700,
    marginBottom: `${responsiveMarginBottom || marginBottom}px`,
  },
}));
