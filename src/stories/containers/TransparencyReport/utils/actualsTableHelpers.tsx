import groupBy from 'lodash/groupBy';
import { OpenModalTransparency } from '../transparencyReportUtils';
import {
  getCommentsFromCategory,
  getGroupActual,
  getGroupDifference,
  getGroupForecast,
  getGroupMonthlyBudget,
  getGroupPayment,
  getWalletActual,
  getWalletDifference,
  getWalletForecast,
  getWalletMonthlyBudget,
  getWalletPayment,
  hasGroupExpenses,
  hasWalletGroups,
  reduceLineItemsToTotals,
} from './budgetStatementsUtils';
import type { InnerTableColumn, InnerTableRow, RowType } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatementLineItemDto, BudgetStatementWalletDto } from '@ses/core/models/dto/coreUnitDTO';

export const filterRowsByNonZeroValue = (rows: InnerTableRow[]): InnerTableRow[] =>
  rows.filter((row) =>
    row.items.some((item) => {
      if (typeof item.value === 'number') {
        return item.value !== 0;
      } else {
        return false;
      }
    })
  );

export const getActualsBreakdownItems = (
  items: BudgetStatementLineItemDto[],
  month: string,
  breakdownColumns: InnerTableColumn[],
  type?: RowType
) => {
  const result: InnerTableRow[] = [];
  const grouped = groupBy(items, (item) => item.group);

  for (const groupedKey in grouped) {
    if (
      Math.abs(getGroupForecast(grouped[groupedKey], month)) === 0 &&
      Math.abs(getGroupActual(grouped[groupedKey], month)) === 0 &&
      Math.abs(getGroupMonthlyBudget(grouped[groupedKey], month)) === 0 &&
      Math.abs(getGroupDifference(grouped[groupedKey], month)) === 0 &&
      Math.abs(getGroupPayment(grouped[groupedKey], month)) === 0
    ) {
      continue;
    }

    const groupedCategory = groupBy(grouped[groupedKey], (item) => item.budgetCategory);

    for (const groupedCatKey in groupedCategory) {
      if (
        Math.abs(getGroupForecast(groupedCategory[groupedCatKey], month)) === 0 &&
        Math.abs(getGroupActual(groupedCategory[groupedCatKey], month)) === 0 &&
        Math.abs(getGroupMonthlyBudget(grouped[groupedKey], month)) === 0 &&
        Math.abs(getGroupDifference(grouped[groupedKey], month)) === 0 &&
        Math.abs(getGroupPayment(grouped[groupedKey], month)) === 0
      ) {
        continue;
      }

      result.push({
        type: type || 'normal',
        ...(type === 'subTotal'
          ? {
              borderTop: true,
              borderBottom: true,
            }
          : {}),
        items: [
          {
            column: breakdownColumns[0],
            value: groupedCategory[groupedCatKey][0].budgetCategory,
          },
          {
            column: breakdownColumns[1],
            value: getGroupMonthlyBudget(groupedCategory[groupedCatKey], month),
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
    }
  }

  return result;
};

export const getActualsBreakdownColumns = (wallet: BudgetStatementWalletDto, handleOpenModal: () => void) => {
  const hasGroups = hasWalletGroups(wallet);

  return [
    {
      header: <OpenModalTransparency name="Expense Category" handleOpenModal={handleOpenModal} />,
      align: 'left',
      type: 'text',
      isCardHeader: true,
      width: hasGroups ? '220px' : '240px',
      handleOpenModal,
    },
    {
      header: 'Mthly Budget',
      align: 'right',
      type: 'number',
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

export const getActualsBreakdownItemsForWallet = (
  wallet: BudgetStatementWalletDto,
  breakdownColumns: InnerTableColumn[],
  month: string
) => {
  const hasGroups = hasWalletGroups(wallet);
  const grouped = groupBy(wallet.budgetStatementLineItem, (item) => (item.group?.trim() ? item.group : ''));

  const result: InnerTableRow[] = [];

  for (const groupedKey in grouped) {
    const hasHeadcount = hasGroupExpenses(wallet, groupedKey, month, true);
    const hasNonHeadcount = hasGroupExpenses(wallet, groupedKey, month, false);
    if (!hasHeadcount && !hasNonHeadcount) {
      continue;
    }
    let groupItemsCount = 0;

    if (hasGroups) {
      // it is a project group
      result.push({
        type: 'groupTitle',
        borderTop: true,
        items: [
          {
            column: breakdownColumns[0],
            value: groupedKey === '' ? 'General' : groupedKey,
          },
        ],
      });
    }

    if (hasHeadcount) {
      result.push({
        items: [
          {
            column: breakdownColumns[0],
            value: 'Headcount Expenses',
          },
        ],
        type: 'section',
      });

      const items = getActualsBreakdownItems(
        wallet?.budgetStatementLineItem?.filter(
          (item) => item.headcountExpense && (item.group === groupedKey || (!item.group && !groupedKey))
        ),
        month,
        breakdownColumns,
        'category'
      );
      groupItemsCount += items.length;
      const newItemsNoZroValues = filterRowsByNonZeroValue(items);
      result.push(...newItemsNoZroValues);
      if (!hasGroups && newItemsNoZroValues.length > 1) {
        // subtotal when it is a headcount without a group
        result.push(
          ...getActualsBreakdownItems(
            [
              {
                ...reduceLineItemsToTotals(
                  wallet.budgetStatementLineItem.filter(
                    (item) =>
                      item.month === month &&
                      ['', 'null', null].includes(item.group?.trim() ?? '') &&
                      item.headcountExpense
                  )
                ),
                budgetCategory: 'Subtotal',
              },
            ],
            month,
            breakdownColumns,
            'subTotal'
          )
        );
      }
    }

    if (hasNonHeadcount) {
      result.push({
        items: [
          {
            column: breakdownColumns[0],
            value: 'Non-Headcount Expenses',
          },
        ],
        type: 'section',
      });

      const items = getActualsBreakdownItems(
        wallet?.budgetStatementLineItem?.filter(
          (item) => !item.headcountExpense && (item.group === groupedKey || (!item.group && !groupedKey))
        ),
        month,
        breakdownColumns,
        'category'
      );
      groupItemsCount += items.length;
      const newItemsNoZroValues = filterRowsByNonZeroValue(items);
      result.push(...newItemsNoZroValues);

      if (!hasGroups && newItemsNoZroValues.length > 1) {
        // subtotal when it is a non headcount without a group
        result.push(
          ...getActualsBreakdownItems(
            [
              {
                ...reduceLineItemsToTotals(
                  wallet.budgetStatementLineItem.filter(
                    (item) =>
                      item.month === month &&
                      ['', undefined, null].includes(item.group?.trim() ?? '') &&
                      !item.headcountExpense
                  )
                ),
                budgetCategory: 'Subtotal',
              },
            ],
            month,
            breakdownColumns,
            'subTotal'
          )
        );
      }
    }

    if ((hasHeadcount || hasNonHeadcount) && hasGroups && groupItemsCount > 1) {
      // subtotal of the whole group (headcount and non headcount)
      result.push(
        ...getActualsBreakdownItems(
          [
            {
              ...reduceLineItemsToTotals(
                wallet.budgetStatementLineItem.filter((item) => item.month === month && item.group === groupedKey)
              ),
              budgetCategory: 'Subtotal',
            },
          ],
          month,
          breakdownColumns,
          'subTotal'
        )
      );
    }
  }

  if (result.length > 0) {
    result.push({
      type: 'total',
      items: [
        {
          column: breakdownColumns[0],
          value: 'Total',
        },
        {
          column: breakdownColumns[1],
          value: getWalletMonthlyBudget(wallet, month),
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
