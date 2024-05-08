import styled from '@emotion/styled';
import { OpenModalTransparency } from '@ses/containers/TransparencyReport/transparencyReportUtils';
import lightTheme from '@ses/styles/theme/themes';
import React, { useId } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { Title } from '../../containers/TransparencyReport/TransparencyReport';
import { TransparencyEmptyTable } from '../../containers/TransparencyReport/components/Placeholders/TransparencyEmptyTable';
import { NumberCell } from '../NumberCell/NumberCell';
import { TextCell } from '../TextCell/TextCell';
import { TransparencyCard } from '../TransparencyCard/TransparencyCard';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export interface InnerTableColumn {
  align?: string;
  header: string | JSX.Element;
  type?: 'number' | 'incomeNumber' | 'text' | 'custom';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cellRender?: (data: any) => JSX.Element;
  headerAlign?: string;
  isCardHeader?: boolean;
  isCardFooter?: boolean;
  width?: string;
  minWidth?: string;
  hidden?: boolean;
  hasBorderRight?: boolean;
  hasBorderBottomOnCard?: boolean;
  handleOpenModal?: () => void;
}

export interface InnerTableCell {
  column: InnerTableColumn;
  value: unknown | React.ReactElement | JSX.Element;
  isBold?: boolean;
}

export type RowType = 'normal' | 'total' | 'section' | 'groupTitle' | 'subTotal' | 'category';
export type CardSpacingSize = 'small' | 'large';

export interface InnerTableRow {
  type: RowType;
  items: InnerTableCell[];
  borderTop?: boolean;
  borderBottom?: boolean;
  hideMobile?: boolean;
}

interface AdvancedInnerTableProps {
  columns: InnerTableColumn[];
  items: InnerTableRow[];
  style?: React.CSSProperties;
  cardsTotalPosition?: 'top' | 'bottom';
  tablePlaceholder?: JSX.Element;
  longCode: string;
  className?: string;
  cardSpacingSize?: CardSpacingSize;
}

type Alignment = 'left' | 'center' | 'right';

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
    const columnType = rowType === 'total' && column?.type === 'custom' ? 'text' : column?.type;
    switch (columnType) {
      case 'number':
        return <NumberCell key={id} value={Number(value)} bold={isBold} />;
      case 'incomeNumber':
        return <NumberCell key={id} value={Number(value)} bold={isBold} isIncome={true} />;
      case 'text':
        return rowType === 'groupTitle' ? (
          <TextCell key={id} isHeader={true}>
            <GroupTitle isLight={isLight} className="table-groupTitle">
              {value as string}
            </GroupTitle>
          </TextCell>
        ) : rowType === 'category' ? (
          <StyledOpenModalTransparency
            isLight={isLight}
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
          <TextCell key={id} bold={isBold || rowType === 'subTotal'} isHeader={column.isCardHeader}>
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
      <TextCell key={id} bold={isBold} isHeader={column.isCardHeader}>
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
        <Container isLight={isLight} style={style} className={className}>
          <Table>
            <TableHead isLight={isLight}>
              <tr>
                {columns
                  ?.filter((x) => !x.hidden)
                  .map((column, i) => (
                    <HeadCell
                      isLight={isLight}
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
                <TableRow
                  key={i}
                  isLight={isLight}
                  borderTop={row.borderTop || row.type === 'total'}
                  borderBottom={row.borderBottom}
                >
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
            return (
              <TitleCard
                isLight={isLight}
                isGroupCard={true}
                cardSpacingSize={cardSpacingSize}
                className="advanced-table--group-section"
              >
                <GroupTitle isLight={isLight} key={`groupTitle-${i}`} className="advanced-table--table-groupTitle">
                  {item.items[0].value as string}
                </GroupTitle>
                {i + 1 < cardItems.length && cardItems[i + 1].type === 'section' && (
                  <Title isLight={isLight} fontSize="14px" className="advanced-table--table-section">
                    {cardItems[i + 1].items[0].value as string}
                  </Title>
                )}
              </TitleCard>
            );
          }

          if (item.type === 'section') {
            return i === 0 || (i > 0 && cardItems[i - 1].type !== 'groupTitle') ? (
              <TitleCard isLight={isLight} cardSpacingSize={cardSpacingSize} className="advanced-table--group-section">
                <Title isLight={isLight} fontSize="14px" key={`section-${i}`} className="advanced-table--table-section">
                  {item.items[0].value as string}
                </Title>
              </TitleCard>
            ) : null;
          }

          return (
            <TransparencyCard
              itemType={item.type}
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

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  background: isLight ? '#FFFFFF' : '#10191F',
  boxShadow: isLight
    ? '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
  borderRadius: '6px',
  overflowX: 'auto',
  msOverFlowStyle: 'none',
  scrollbarWidth: 'thin',
}));

const Table = styled.table({
  borderCollapse: 'collapse',
  flex: '1',
  width: '100%',
});

const TableCell = styled.td<{
  textAlign: 'left' | 'center' | 'right';
  isLight?: boolean;
  hasBorderRight?: boolean;
}>(({ textAlign, isLight, hasBorderRight }) => ({
  textAlign,
  borderRight: hasBorderRight ? (isLight ? '1px solid #D4D9E1' : '1px solid #405361') : 'none',
}));

const TableHead = styled.thead<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: '12px',
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontWeight: 600,
  color: '#708390',
  borderBottom: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
  whiteSpace: 'nowrap',
}));

const HeadCell = styled.th<{ hasBorderRight?: boolean; isLight: boolean }>(({ hasBorderRight, isLight }) => ({
  padding: '24px 16px',
  fontWeight: 600,
  borderRight: hasBorderRight ? (isLight ? '1px solid #D4D9E1' : '1px solid #405361') : 'none',
}));

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'block',
  },
});

const CardsWrapper = styled.div({
  display: 'block',
  '& .advance-table--transparency_item .advance-table--transparency-card_icon_hidden': {
    display: 'none',
  },
  '@media (min-width: 834px)': {
    display: 'none',
  },
});

const TitleCard = styled.div<{ isLight: boolean; cardSpacingSize?: CardSpacingSize; isGroupCard?: boolean }>(
  ({ isLight, cardSpacingSize = 'large', isGroupCard = false }) => ({
    padding: cardSpacingSize === 'large' ? '8px 24px' : '8px 16px',
    background: isLight ? 'rgba(255, 255, 255, 0.7)' : 'rgba(120, 122, 155, 0.3)',
    boxShadow: isLight
      ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
      : '0px 20px 40px -40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
    borderRadius: 6,
    marginBottom: 8,

    '&:not(:first-of-type)': {
      marginTop: isGroupCard ? 24 : 0,
    },

    '& > .advanced-table--table-groupTitle': {
      marginBottom: 16,
    },

    '& > .advanced-table--table-section': {
      margin: 0,
    },
  })
);

const GroupTitle = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  fontWeight: 600,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: isLight ? '#231536' : '#D2D4EF',
}));

const TableRow = styled.tr<WithIsLight & { borderTop?: boolean; borderBottom?: boolean }>(
  ({ isLight, borderTop = false, borderBottom = false }) => ({
    borderTop: borderTop ? `1px solid ${isLight ? '#D4D9E1' : '#405361'}` : 'none',
    borderBottom: borderBottom ? `1px solid ${isLight ? '#D4D9E1' : '#405361'}` : 'none',
  })
);

const StyledOpenModalTransparency = styled(OpenModalTransparency)<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#231536' : '#D2D4EF',
  fontSize: 16,
  lineHeight: '18px',
  fontWeight: 500,
  paddingLeft: 16,
  paddingTop: 16,
  marginBottom: 16,

  fontFamily: 'Inter, sans-serif',
  justifyContent: 'space-between',
  gap: 0,
  '&.advanced-table__cell-row--category--comments': {
    paddingTop: 0,
    fontSize: 14,
    lineHeight: '15px',
    marginBottom: 0,
    fontWeight: 400,
    svg: {
      display: 'none',
    },
    [lightTheme.breakpoints.up('table_834')]: {
      fontSize: 16,
      lineHeight: '19px',
      padding: '8px  0px 16px 16px',
    },
  },
  [lightTheme.breakpoints.up('table_834')]: {
    fontWeight: 400,
    paddingTop: 0,
    marginBottom: 0,
    svg: {
      display: 'none',
    },
  },
  '&.advanced-table__cell-row--category': {
    svg: {
      display: 'none',
    },
  },
}));
