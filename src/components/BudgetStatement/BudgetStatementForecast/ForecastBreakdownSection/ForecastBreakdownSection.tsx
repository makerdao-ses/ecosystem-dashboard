import { styled } from '@mui/material';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import BudgetStatementsPlaceholder from '@/components/PlaceHolders/BudgetStatementsPlaceholder';
import Tabs from '@/components/Tabs/Tabs';
import type { ResourceType } from '@/core/models/interfaces/types';
import { FORECAST_BREAKDOWN_QUERY_PARAM } from '@/views/CoreUnitBudgetStatement/utils/constants';
import type { DateTime } from 'luxon';
import type { FC } from 'react';

interface Props {
  mainTableItems: InnerTableRow[];
  breakdownTitleRef: React.RefObject<HTMLDivElement>;
  currentMonth: DateTime;
  breakdownTabs: string[];
  headerIds: string[];
  longCode: string;
  shortCode: string;
  breakdownColumnsForActiveTab: InnerTableColumn[];
  breakdownItems: InnerTableRow[];
  resource: ResourceType;
}

const ForecastBreakdownSection: FC<Props> = ({
  mainTableItems,
  breakdownTitleRef,
  currentMonth,
  breakdownTabs,
  headerIds,
  longCode,
  shortCode,
  breakdownItems,
  breakdownColumnsForActiveTab,
  resource,
}) => (
  <Container>
    {!!mainTableItems?.length && (
      <Title marginBottom={24} ref={breakdownTitleRef} isBreakDown>
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
            <BudgetStatementsPlaceholder longCode={longCode} shortCode={shortCode} resource={resource} />
          }
        />
      </BreakdownTableWrapper>
    )}
  </Container>
);

export default ForecastBreakdownSection;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const BreakdownTableWrapper = styled('div')({
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
