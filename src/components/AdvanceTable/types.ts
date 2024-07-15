import type { breakpoints } from '@ses/styles/theme/themes';
export type DefaultRenderer = 'basicHeader' | 'boldText' | 'total' | 'text' | 'number' | 'incomeNumber';
export type Alignment = 'left' | 'center' | 'right';

export interface Border {
  color?: string;
  width?: number | string;
  style?: 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset';
}

export interface BorderConfig {
  top?: boolean | Border;
  bottom?: boolean | Border;
  left?: boolean | Border;
  right?: boolean | Border;
}

export type CellPadding = string | number | Record<keyof typeof breakpoints, number | string>;

export interface GenericCell {
  // value to be rendered in the cell
  value: unknown;
  // inherit border, alignment, rowSpan, colSpan and border form another cell if not set in this cell
  inherit?: GenericCell;
  // cell level border
  border?: BorderConfig | Border;
  // cell level alignment. Defaulted to: 'left'
  alignment?: Alignment;
  // padding of this cell. Defaulted to: '16px'
  cellPadding?: CellPadding;
  // width of this cell. The cell in a table takes the maximum value of the cell width in the col.
  // Defaulted to: 'auto'
  width?: number | string | Record<keyof typeof breakpoints, number | string>;
  // how many cols this cell should span. Default 1
  colSpan?: number;
  // how many rows this cell should span. Default 1
  rowSpan?: number;
  // 0-based index of the row this cell belongs to. Automatically set by the table on render time
  rowIndex?: number;
  // 0-based index of the column this cell belongs to. Automatically set by the table on render time
  colIndex?: number;
  // is this cell a header cell? Defaulted to: false
  isHeader?: boolean;
  // is this cell hidden? Defaulted to: false
  isHidden?: boolean;
  // builtin renderer to use for this cell. Defaulted to: 'text'
  defaultRenderer?: DefaultRenderer;
  // extra props at cell level (very useful for custom render methods)
  extraProps?: unknown;
  // render function to use for this cell. It will override the `defaultRenderer` if set
  render?: React.FC<GenericCell>;
  // in mobile, this cell should be the header of the card
  isCardHeader?: boolean;
}

export type CardType = 'normal' | 'total' | 'title' | 'groupTitle';
export type CardPadding = number | string;
export interface CardRenderProps {
  type?: CardType;
  cells?: GenericCell[];
  cardPadding?: CardPadding;
}

export interface CardConfiguration {
  type?: CardType;
  render?: React.FC<CardRenderProps>;
  cardPadding?: CardPadding;
}

export interface RowProps {
  // array of cells for this row
  cells: GenericCell[];
  // add some padding to the cells if the `cellPadding` is not set in the cell
  cellPadding?: CellPadding;
  // use this default render for all the cells in the row that does not have a `defaultRenderer`
  cellDefaultRenderer?: DefaultRenderer;
  // border setup for the entire row (can be configured at cell level too)
  border?: BorderConfig | Border;
  // extra props to be passed to custom render to customize row with extra data
  extraProps?: unknown;
  // custom render for the entire `tr` row element (it does not affect how the cell
  // of this row are being rendered as the cells are rendered with it own renderer)
  render?: React.FC<RowProps & React.PropsWithChildren>;
  // === How will looks like this row on mobile? ===
  rowToCardConfig?: CardConfiguration;
  // allow hover styles on each row
  hover?: boolean;
}

export interface TableProps {
  className?: string;
  header?: RowProps[];
  body?: RowProps[];
  headerRender?: React.FC<{ header: TableProps['header'] } & React.PropsWithChildren>;
  bodyRender?: React.FC<{ body: TableProps['body'] } & React.PropsWithChildren>;
  toCardsOnMobile?: boolean;
}

export interface NumberCellExtraProps {
  isBold?: boolean;
}

export const isBorder = (border: BorderConfig | Border): border is Border => {
  const keys = Object.keys(border);
  return typeof border === 'object' && (keys.includes('width') || keys.includes('style') || keys.includes('color'));
};
