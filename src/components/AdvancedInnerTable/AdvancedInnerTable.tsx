import { styled } from '@mui/material';
import React, { useId } from 'react';

import { OpenModalTransparency } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import { useThemeContext } from '../../core/context/ThemeContext';
import { TransparencyEmptyTable } from '../../views/CoreUnitBudgetStatement/components/Placeholders/TransparencyEmptyTable';
import { NumberCell } from './NumberCell/NumberCell';
import { TextCell } from './TextCell/TextCell';
import { TransparencyCard } from './TransparencyCard/TransparencyCard';
import type { AdvancedInnerTableProps, Alignment, InnerTableColumn, RowType } from './types';

export const AdvancedInnerTable: React.FC<AdvancedInnerTableProps> = ({
  cardsTotalPosition = 'bottom',
  columns,
  items,
  longCode,
  style,
  className,
  tablePlaceholder,
  cardSpacingSize = 'large',
}) => {
  const id = useId();
  const { isLight } = useThemeContext();
  const getCell = (column: InnerTableColumn, rowType: RowType, value: unknown) => {
    if (value !== 0 && !value) {
      return <></>;
    }
    const isBold = rowType === 'total' || rowType === 'section' || rowType === 'groupTitle';
    const isSection = rowType === 'section';
    const columnType = rowType === 'total' && column?.type === 'custom' ? 'text' : column?.type;
    switch (columnType) {
      case 'number':
        return <NumberCell key={id} value={Number(value)} bold={isBold} rowType={rowType} />;
      case 'incomeNumber':
        return <NumberCell key={id} value={Number(value)} bold={isBold} isIncome={true} rowType={rowType} />;
      case 'text':
        return rowType === 'groupTitle' ? (
          <TextCell key={id} isHeader={true}>
            <GroupTitle className="table-groupTitle">{value as string}</GroupTitle>
          </TextCell>
        ) : rowType === 'category' ? (
          <StyledOpenModalTransparency
            handleOpenModal={column.handleOpenModal}
            name={value as string}
            className={
              value === 'Total' || value === 'Subtotal'
                ? 'advanced-table__cell-row--category'
                : column.header === 'Comments'
                ? 'advanced-table__cell-row--category--comments'
                : ''
            }
          />
        ) : (
          <TextCell
            key={id}
            bold={isBold || rowType === 'subTotal'}
            isHeader={column.isCardHeader}
            isSection={isSection}
          >
            {value as string}
          </TextCell>
        );
      case 'custom':
        if (column?.cellRender) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return column?.cellRender(value as any);
        }
    }

    return (
      <TextCell key={id} bold={isBold} isHeader={column.isCardHeader} isSection={isSection}>
        {value as string}
      </TextCell>
    );
  };

  let cardItems =
    cardsTotalPosition === 'top' && items.length > 0
      ? [items[items.length - 1], ...items.slice(0, items.length - 1)]
      : items;

  cardItems = cardItems?.filter((x) => !x.hideMobile);

  return items?.length > 0 ? (
    <>
      <TableWrapper>
        <Container style={style} className={className}>
          <Table>
            <TableHead>
              <tr>
                {columns
                  ?.filter((x) => !x.hidden)
                  .map((column, i) => (
                    <HeadCell
                      hasBorderRight={column.hasBorderRight}
                      key={`header-${i}`}
                      style={{
                        textAlign: (column.headerAlign ?? column.align ?? 'left') as Alignment,
                        width: column.width ?? '120px',
                        minWidth: column.minWidth ?? 'unset',
                        overflow: 'hidden',
                      }}
                    >
                      {column.header}
                    </HeadCell>
                  ))}
              </tr>
            </TableHead>
            <tbody>
              {items?.map((row, i) => (
                <TableRow key={i} borderTop={row.borderTop || row.type === 'total'} borderBottom={row.borderBottom}>
                  {row.items
                    ?.filter((x) => !x.column.hidden)
                    .map((item, j) => (
                      <TableCell
                        hasBorderRight={item.column.hasBorderRight}
                        isLight={isLight}
                        key={`${i}-${j}`}
                        textAlign={(item.column?.align ?? 'left') as Alignment}
                      >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {getCell(item.column, row.type, item.value as any)}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Container>
      </TableWrapper>
      <CardsWrapper>
        {cardItems.map((item, i) => {
          if (item.type === 'groupTitle') {
            return null;
          }
          console.log('>>>>>>>>>>>', cardItems[i], cardItems[i].showHeader);
          return (
            <TransparencyCard
              category={item.category}
              showSubHeader={cardItems[i].showHeader || false}
              itemType={item.type}
              subHeader={item.subHeader || ''}
              key={`item-${i}`}
              cardSpacingSize={cardSpacingSize}
              separators={item.items
                .filter((x) => !x.column.hidden && !x.column.isCardHeader && !x.column.isCardFooter)
                .map((x) => !!x.column.hasBorderBottomOnCard)}
              header={
                <>
                  {item.items
                    .filter((x) => x.column?.isCardHeader && x.value && !x.column.hidden)
                    .map((x) => getCell(x.column, item.type, x.value))}
                </>
              }
              headers={columns
                .filter((x) => !x.hidden && !x.isCardHeader && !x.isCardFooter)
                .map((x) => x.header ?? '')}
              items={
                item.items
                  .filter((x) => !x.column.hidden && !x.column?.isCardFooter && !x.column?.isCardHeader)
                  .map((x) => getCell(x.column, item.type, x.value)) ?? []
              }
              footer={
                item.items.filter((x) => x.column?.isCardFooter).length ? (
                  <>
                    {item.items.filter((x) => x.column?.isCardFooter).map((x) => getCell(x.column, 'normal', x.value))}
                  </>
                ) : undefined
              }
            />
          );
        })}
      </CardsWrapper>
    </>
  ) : (
    tablePlaceholder ?? <TransparencyEmptyTable longCode={longCode} shortCode={longCode} />
  );
};

const Container = styled('div')(({ theme }) => ({
  background: theme.palette.isLight ? '#FFFFFF' : theme.palette.colors.charcoal[900],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.reskinShortShadow : theme.fusionShadows.darkMode,
  borderRadius: '12px',
  overflowX: 'auto',
  msOverFlowStyle: 'none',
  scrollbarWidth: 'thin',
}));

const Table = styled('table')({
  borderCollapse: 'collapse',
  flex: '1',
  width: '100%',
});

const TableCell = styled('td')<{
  textAlign: 'left' | 'center' | 'right';
  isLight?: boolean;
  hasBorderRight?: boolean;
}>(({ textAlign, isLight, hasBorderRight }) => ({
  textAlign,
  borderRight: hasBorderRight ? (isLight ? '1px solid #D4D9E1' : '1px solid #405361') : 'none',
}));

const TableHead = styled('thead')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 600,
  borderBottom: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,
  whiteSpace: 'nowrap',
}));

const HeadCell = styled('th')<{ hasBorderRight?: boolean }>(({ hasBorderRight, theme }) => ({
  padding: '7.5px 16px',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[200],
  borderRight: hasBorderRight ? (theme.palette.isLight ? '1px solid #D4D9E1' : '1px solid #405361') : 'none',
}));

const TableWrapper = styled('div')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('tablet_768')]: {
    display: 'block',
  },
}));

const CardsWrapper = styled('div')(({ theme }) => ({
  display: 'block',
  '& .advance-table--transparency_item .advance-table--transparency-card_icon_hidden': {
    display: 'none',
  },

  [theme.breakpoints.up('tablet_768')]: {
    display: 'none',
  },
}));

const GroupTitle = styled('div')(({ theme }) => ({
  fontSize: 16,
  lineHeight: '22px',
  fontWeight: 600,
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const TableRow = styled('tr')<{ borderTop?: boolean; borderBottom?: boolean }>(
  ({ theme, borderTop = false, borderBottom = false }) => ({
    borderTop: borderTop
      ? `1px solid ${theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]}`
      : 'none',
    borderBottom: borderBottom
      ? `1px solid ${theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]}`
      : 'none',
  })
);

const StyledOpenModalTransparency = styled(OpenModalTransparency)(({ theme }) => ({
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  paddingLeft: 24,
  paddingTop: 8,
  paddingRight: 24,
  paddingBottom: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  fontFamily: 'Inter, sans-serif',
  justifyContent: 'space-between',
  gap: 0,
  '&.advanced-table__cell-row--category--comments': {
    paddingTop: 0,
    fontSize: 14,
    lineHeight: '15px',
    marginBottom: 0,
    fontWeight: 400,
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.gray[600],

    svg: {
      display: 'none',
    },
    [theme.breakpoints.up('tablet_768')]: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: '24px',
      paddingLeft: 16,
    },
  },
  [theme.breakpoints.up('tablet_768')]: {
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
    fontWeight: 400,
    paddingTop: 0,
    marginBottom: 0,
    paddingLeft: 16,
    lineHeight: '16.94px',
    fontSize: 14,
    svg: {
      display: 'none',
    },
  },
  [theme.breakpoints.up('desktop_1024')]: {
    lineHeight: '24px',
    fontSize: 16,
  },

  '&.advanced-table__cell-row--category': {
    svg: {
      display: 'none',
    },
  },
}));
