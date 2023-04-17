import _ from 'lodash';
import {
  getCommentsFromCategory,
  getGroupActual,
  getGroupDifference,
  getGroupForecast,
  getGroupPayment,
  getLineItemsSubtotal,
  getWalletActual,
  getWalletDifference,
  getWalletForecast,
  getWalletPayment,
  hasExpenses,
  hasWalletGroups,
} from './budgetStatementsUtils';
import type { InnerTableColumn, InnerTableRow, RowType } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatementLineItemDto, BudgetStatementWalletDto } from '@ses/core/models/dto/coreUnitDTO';

export const getActualsBreakdownColumns = (wallet: BudgetStatementWalletDto) => {
  const hasGroups = hasWalletGroups(wallet);

  return [
    {
      header: 'Group',
      align: 'left',
      type: 'text',
      hidden: !hasGroups,
      isCardHeader: true,
      width: '240px',
    },
    {
      header: 'Expense Category',
      align: 'left',
      type: 'text',
      isCardHeader: true,
      width: hasGroups ? '220px' : '240px',
    },
    {
      header: 'Forecast',
      align: 'right',
      type: 'incomeNumber',
    },
    {
      header: 'Actuals',
      align: 'right',
      type: 'incomeNumber',
    },
    {
      header: 'Difference',
      align: 'right',
      type: 'number',
    },
    {
      header: 'Comments',
      align: 'left',
      type: 'text',
      width: '300px',
    },
    {
      header: 'Payments',
      align: 'right',
      type: 'number',
    },
  ] as InnerTableColumn[];
};

export const getActualsBreakdownItems = (
  items: BudgetStatementLineItemDto[],
  month: string,
  breakdownColumns: InnerTableColumn[],
  type?: RowType
) => {
  const result: InnerTableRow[] = [];
  const grouped = _.groupBy(items, (item) => item.group);

  for (const groupedKey in grouped) {
    if (
      Math.abs(getGroupForecast(grouped[groupedKey], month)) + Math.abs(getGroupActual(grouped[groupedKey], month)) ===
      0
    ) {
      continue;
    }

    const groupedCategory = _.groupBy(grouped[groupedKey], (item) => item.budgetCategory);

    let i = 1;
    for (const groupedCatKey in groupedCategory) {
      if (
        Math.abs(getGroupForecast(groupedCategory[groupedCatKey], month)) +
          Math.abs(getGroupActual(groupedCategory[groupedCatKey], month)) ===
        0
      ) {
        continue;
      }

      result.push({
        type: type || 'normal',
        items: [
          {
            column: breakdownColumns[0],
            value: i === 1 && groupedKey !== 'null' ? groupedKey : '',
          },
          {
            column: breakdownColumns[1],
            value: groupedCategory[groupedCatKey][0].budgetCategory,
          },
          {
            column: breakdownColumns[2],
            value: getGroupForecast(groupedCategory[groupedCatKey], month),
          },
          {
            column: breakdownColumns[3],
            value: getGroupActual(groupedCategory[groupedCatKey], month),
          },
          {
            column: breakdownColumns[4],
            value: getGroupDifference(groupedCategory[groupedCatKey], month),
          },
          {
            column: breakdownColumns[5],
            value: getCommentsFromCategory(groupedCategory[groupedCatKey], month),
          },
          {
            column: breakdownColumns[6],
            value: getGroupPayment(groupedCategory[groupedCatKey], month),
          },
        ],
      });

      i++;
    }
  }

  return result;
};

export const getActualsBreakdownItemsForWallet = (
  walletAddress: string,
  wallets: BudgetStatementWalletDto[],
  breakdownColumns: InnerTableColumn[],
  month: string
) => {
  const result: InnerTableRow[] = [];

  const wallet = wallets?.find((w) => w.address === walletAddress);
  if (!wallet) {
    return result;
  }

  const hasGroups = hasWalletGroups(wallet);
  if (hasExpenses(wallet, month, true)) {
    result.push({
      items: [
        {
          column: breakdownColumns[0],
          value: 'Headcount Expenses',
        },
        {
          column: breakdownColumns[1],
          value: hasGroups ? '' : 'Headcount Expenses',
        },
      ],
      type: 'section',
    });

    result.push(
      ...getActualsBreakdownItems(
        wallet?.budgetStatementLineItem?.filter((item) => item.headcountExpense),
        month,
        breakdownColumns
      )
    );

    result.push(
      ...getActualsBreakdownItems(
        [getLineItemsSubtotal(wallet, true, month, 'Subtotal')],
        month,
        breakdownColumns,
        'subTotal'
      )
    );
  }

  if (hasExpenses(wallet, month, false)) {
    result.push({
      items: [
        {
          column: breakdownColumns[0],
          value: 'Non-Headcount Expenses',
        },
        {
          column: breakdownColumns[1],
          value: hasGroups ? '' : 'Non-Headcount Expenses',
        },
      ],
      type: 'section',
    });

    const headcountExpenseItems = getActualsBreakdownItems(
      wallet?.budgetStatementLineItem?.filter((item) => !item.headcountExpense),
      month,
      breakdownColumns
    );

    result.push(...headcountExpenseItems);

    result.push(
      ...getActualsBreakdownItems(
        [getLineItemsSubtotal(wallet, false, month, 'Subtotal')],
        month,
        breakdownColumns,
        'subTotal'
      )
    );
  }

  if (result.length > 0) {
    result.push({
      type: 'total',
      items: [
        {
          column: breakdownColumns[0],
          value: hasGroups ? 'Total' : '',
        },
        {
          column: breakdownColumns[1],
          value: hasGroups ? '' : 'Total',
        },
        {
          column: breakdownColumns[2],
          value: getWalletForecast(wallet, month),
        },
        {
          column: breakdownColumns[3],
          value: getWalletActual(wallet, month),
        },
        {
          column: breakdownColumns[4],
          value: getWalletDifference(wallet, month),
        },
        {
          column: breakdownColumns[5],
          value: '',
        },
        {
          column: breakdownColumns[6],
          value: getWalletPayment(wallet, month),
        },
      ],
    });
  }

  return result;
};
