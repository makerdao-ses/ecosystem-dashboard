import styled from '@emotion/styled';
import { AdvancedInnerTable } from '@ses/components/advanced-inner-table/advanced-inner-table';
import { Tabs } from '@ses/components/tabs/tabs';
import { TransparencyEmptyTable } from '@ses/containers/transparency-report/placeholders/transparency-empty-table';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { InnerTableColumn, InnerTableRow } from '@ses/components/advanced-inner-table/advanced-inner-table';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  mainTableColumns: InnerTableColumn[];
  mainTableItems: InnerTableRow[];
  longCode: string;
  breakdownTabs: string[];
  currentIndex: number;
  headerIds: string[];
  breakdownColumns: InnerTableColumn[];
  breakdownItems: InnerTableRow[];
}

const DelegatesForecast: React.FC<Props> = ({
  currentMonth,
  mainTableItems,
  mainTableColumns,
  longCode,
  breakdownTabs,
  headerIds,
  currentIndex,
  breakdownColumns,
  breakdownItems,
}) => {
  const { isLight } = useThemeContext();
  return (
    <Container>
      <TotalsMonth isLight={isLight}>{currentMonth.toFormat('MMM yyyy')} Totals</TotalsMonth>
      <AdvancedInnerTable
        columns={mainTableColumns}
        items={mainTableItems}
        style={{ marginBottom: '64px' }}
        cardsTotalPosition="top"
        longCode={longCode}
      />
      {mainTableItems.length > 0 && (
        <TitleBreakdown isLight={isLight}>{currentMonth.toFormat('MMM yyyy')} Breakdown</TitleBreakdown>
      )}

      {mainTableItems.length > 0 && (
        <Tabs
          items={breakdownTabs?.map((header, i) => ({
            item: header,
            id: headerIds[i],
          }))}
          currentIndex={currentIndex}
          style={{
            marginBottom: '32px',
          }}
        />
      )}

      {mainTableItems.length > 0 && (
        <AdvancedInnerTable
          columns={breakdownColumns}
          items={breakdownItems}
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
