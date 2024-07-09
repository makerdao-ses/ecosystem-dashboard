import type { InnerTableCell, InnerTableRow } from '@/components/AdvancedInnerTable/types';

export class InnerTableRowBuilder {
  private readonly _innerTableRow: InnerTableRow;

  constructor() {
    this._innerTableRow = {
      type: 'normal',
      items: [] as InnerTableCell[],
    } as InnerTableRow;
  }

  withType(type: 'normal' | 'total'): InnerTableRowBuilder {
    this._innerTableRow.type = type;
    return this;
  }

  withSubHeader(subHeader: string): InnerTableRowBuilder {
    this._innerTableRow.subHeader = subHeader;
    return this;
  }

  withCategory(category: string): InnerTableRowBuilder {
    this._innerTableRow.category = category;
    return this;
  }

  withCategoryGroup(categoryGroup: string): InnerTableRowBuilder {
    this._innerTableRow.categoryGroup = categoryGroup;
    return this;
  }

  addItem(item: InnerTableCell): InnerTableRowBuilder {
    this._innerTableRow.items.push(item);
    return this;
  }

  withBorderTop(borderTop: boolean): InnerTableRowBuilder {
    this._innerTableRow.borderTop = borderTop;
    return this;
  }

  withBorderBottom(borderBottom: boolean): InnerTableRowBuilder {
    this._innerTableRow.borderBottom = borderBottom;
    return this;
  }

  withHideMobile(hideMobile: boolean): InnerTableRowBuilder {
    this._innerTableRow.hideMobile = hideMobile;
    return this;
  }

  build(): InnerTableRow {
    return this._innerTableRow;
  }
}
