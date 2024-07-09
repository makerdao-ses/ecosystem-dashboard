import { styled } from '@mui/material';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import BudgetStatementsPlaceholder from '@/components/PlaceHolders/BudgetStatementsPlaceholder';
import type { ResourceType } from '@/core/models/interfaces/types';
import type { DateTime } from 'luxon';

interface Props {
  currentMonth: DateTime;
  mainTableColumns: InnerTableColumn[];
  mainTableItems: InnerTableRow[];
  longCode: string;
  shortCode: string;
  resource?: ResourceType;
}

const TotalWalletSections: React.FC<Props> = ({
  currentMonth,
  mainTableColumns,
  mainTableItems,
  longCode,
  shortCode,
  resource,
}) => (
  <Container>
    <Title>{currentMonth.toFormat('MMM yyyy')} Totals</Title>
    <AdvancedInnerTable
      columns={mainTableColumns}
      cardSpacingSize="small"
      items={mainTableItems}
      cardsTotalPosition="top"
      longCode={longCode}
      tablePlaceholder={<BudgetStatementsPlaceholder longCode={longCode} shortCode={shortCode} resource={resource} />}
    />
  </Container>
);
export default TotalWalletSections;

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
