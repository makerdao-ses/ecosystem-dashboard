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
  subHeader?: string;
  category?: string;
  categoryGroup?: string;
  items: InnerTableCell[];
  borderTop?: boolean;
  borderBottom?: boolean;
  hideMobile?: boolean;
}

export interface AdvancedInnerTableProps {
  columns: InnerTableColumn[];
  items: InnerTableRow[];
  style?: React.CSSProperties;
  cardsTotalPosition?: 'top' | 'bottom';
  tablePlaceholder?: JSX.Element;
  longCode: string;
  className?: string;
  cardSpacingSize?: CardSpacingSize;
  showSubHeader?: boolean;
}

export type Alignment = 'left' | 'center' | 'right';
export type ItemType = RowType;
