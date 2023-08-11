import type { InnerTableRow } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';

const replacePaymentTopup = (breakdownItems: InnerTableRow[]): InnerTableRow[] =>
  breakdownItems.map((innerRow) => ({
    ...innerRow,
    items: innerRow.items.map((item) => {
      if (item.value === 'payment topup') {
        return {
          ...item,
          value: <div style={{ fontStyle: 'italic' }}>Uncategorised</div>,
        };
      } else {
        return item;
      }
    }),
  }));

export default replacePaymentTopup;
