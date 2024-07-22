import { styled } from '@mui/material';
import React from 'react';
import { AdvancedInnerTable } from '@/components/AdvancedInnerTable/AdvancedInnerTable';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';

import BudgetStatementsPlaceholder from '@/components/PlaceHolders/BudgetStatementsPlaceholder';
import type { ResourceType } from '@/core/models/interfaces/types';
import type { DateTime } from 'luxon/src/datetime';
import type { FC } from 'react';

interface Props {
  currentMonth: DateTime;

  longCode: string;
  shortCode: string;
  resource: ResourceType;
  mainTableColumns: InnerTableColumn[];
  mainTableItems: InnerTableRow[];
}
const TransferRequestSection: FC<Props> = ({
  mainTableItems,
  mainTableColumns,
  currentMonth,
  longCode,
  resource,
  shortCode,
}) => (
  <Container>
    <Title>{currentMonth.toFormat('MMM yyyy')} Totals</Title>

    <AdvancedInnerTable
      columns={mainTableColumns}
      items={mainTableItems}
      cardsTotalPosition={'top'}
      cardSpacingSize="small"
      longCode={longCode}
      tablePlaceholder={<BudgetStatementsPlaceholder longCode={longCode} shortCode={shortCode} resource={resource} />}
    />
  </Container>
);

export default TransferRequestSection;

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
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
