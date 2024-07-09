import { styled } from '@mui/material';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import BudgetStatementsPlaceholder from '@/components/PlaceHolders/BudgetStatementsPlaceholder';
import Tabs from '@/components/Tabs/Tabs';
import type { ResourceType } from '@/core/models/interfaces/types';
import { ACTUALS_BREAKDOWN_QUERY_PARAM } from '@/views/CoreUnitBudgetStatement/utils/constants';
import { BreakdownTableWrapper } from '../BudgetStatementActuals';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  mainTableItems: InnerTableRow[];
  longCode: string;
  shortCode: string;
  resource?: ResourceType;
  breakdownTitleRef: React.RefObject<HTMLDivElement>;
  breakdownTabs: string[];
  headerIds: string[];
  breakdownColumnsForActiveTab: InnerTableColumn[];
  breakdownItemsForActiveTab: InnerTableRow[];
}
const BreakdownSection: React.FC<Props> = ({
  currentMonth,
  longCode,
  headerIds,
  mainTableItems,
  shortCode,
  resource,
  breakdownTitleRef,
  breakdownTabs,
  breakdownColumnsForActiveTab,
  breakdownItemsForActiveTab,
}) => (
  <Container>
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
          cardSpacingSize="small"
          tablePlaceholder={
            <BudgetStatementsPlaceholder longCode={longCode} shortCode={shortCode} resource={resource} />
          }
        />
      </BreakdownTableWrapper>
    )}
  </Container>
);

export default BreakdownSection;

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

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});
