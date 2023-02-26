import styled from '@emotion/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AdvancedInnerTable } from '@ses/components/advanced-inner-table/advanced-inner-table';
import { CustomLink } from '@ses/components/custom-link/custom-link';
import { Tabs } from '@ses/components/tabs/tabs';
import { TransparencyEmptyTable } from '@ses/containers/transparency-report/placeholders/transparency-empty-table';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { InnerTableColumn, InnerTableRow } from '@ses/components/advanced-inner-table/advanced-inner-table';

import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  longCode: string;
  mainTableColumns: InnerTableColumn[];
  mainTableItems: InnerTableRow[];
  breakdownTabs: string[];
  currentIndex: number;
  headerIds: string[];
  breakdownColumns: InnerTableColumn[];
  breakdownItems: InnerTableRow[];
}

const DelegatesActuals: React.FC<Props> = ({
  currentMonth,
  longCode,
  mainTableColumns,
  mainTableItems,
  breakdownTabs,
  currentIndex,
  headerIds,
  breakdownColumns,
  breakdownItems,
}) => {
  const { isLight } = useThemeContext();
  const isMobile = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  return (
    <Container>
      <TransactionLink isLight={isLight}>
        View the onchain transaction for recognized delegates
        <CustomLink
          children="this month"
          href="#"
          fontSize={isMobile ? 14 : 16}
          lineHeight="18px"
          iconWidth={10}
          iconHeight={10}
        />
      </TransactionLink>

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

const TransactionLink = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '22px',
  marginBottom: 32,
  color: isLight ? '#231536' : '#D2D4EF',
}));

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
export default DelegatesActuals;
