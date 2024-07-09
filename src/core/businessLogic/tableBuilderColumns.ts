import type { InnerTableColumn } from '@/components/AdvancedInnerTable/types';
import type { BudgetStatementWalletDto } from '../models/dto/coreUnitDTO';

export class InnerTableColumnBuilder {
  private readonly _innerTableColumn: InnerTableColumn;

  constructor() {
    this._innerTableColumn = {} as InnerTableColumn;
  }

  withAlign(align: string): InnerTableColumnBuilder {
    this._innerTableColumn.align = align;
    return this;
  }

  withHeader(header: string | JSX.Element): InnerTableColumnBuilder {
    this._innerTableColumn.header = header;
    return this;
  }

  withType(type: 'number' | 'incomeNumber' | 'text' | 'custom'): InnerTableColumnBuilder {
    this._innerTableColumn.type = type;
    return this;
  }

  withCellRender(cellRender: (data: BudgetStatementWalletDto) => JSX.Element): InnerTableColumnBuilder {
    this._innerTableColumn.cellRender = cellRender;
    return this;
  }

  withHeaderAlign(headerAlign: string): InnerTableColumnBuilder {
    this._innerTableColumn.headerAlign = headerAlign;
    return this;
  }

  withIsCardHeader(isCardHeader: boolean): InnerTableColumnBuilder {
    this._innerTableColumn.isCardHeader = isCardHeader;
    return this;
  }

  withIsCardFooter(isCardFooter: boolean): InnerTableColumnBuilder {
    this._innerTableColumn.isCardFooter = isCardFooter;
    return this;
  }

  withWidth(width: string): InnerTableColumnBuilder {
    this._innerTableColumn.width = width;
    return this;
  }

  withMinWidth(minWidth: string): InnerTableColumnBuilder {
    this._innerTableColumn.minWidth = minWidth;
    return this;
  }

  withHidden(hidden: boolean): InnerTableColumnBuilder {
    this._innerTableColumn.hidden = hidden;
    return this;
  }

  withHasBorderRight(hasBorderRight: boolean): InnerTableColumnBuilder {
    this._innerTableColumn.hasBorderRight = hasBorderRight;
    return this;
  }

  withHasBorderBottomOnCard(hasBorderBottomOnCard: boolean): InnerTableColumnBuilder {
    this._innerTableColumn.hasBorderBottomOnCard = hasBorderBottomOnCard;
    return this;
  }

  withHandleOpenModal(handleOpenModal: () => void): InnerTableColumnBuilder {
    this._innerTableColumn.handleOpenModal = handleOpenModal;
    return this;
  }

  build(): InnerTableColumn {
    return this._innerTableColumn;
  }
}
