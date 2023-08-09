import type { InnerTableRow, InnerTableCell } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';

const replacePaymentTopup = (breakdownItems: InnerTableRow[]): InnerTableRow[] =>
  breakdownItems.map((innerRow) => ({
    ...innerRow,
    items: innerRow.items.map((item) => {
      if (item.value === 'payment topup') {
        return {
          ...item,
          value: {
            value: <div style={{ fontStyle: 'italic' }}>Uncategorised</div>,
            column: item.column, // Make sure to include other necessary properties here
          } as InnerTableCell,
        };
      } else {
        return item;
      }
    }),
  }));

export default replacePaymentTopup;
