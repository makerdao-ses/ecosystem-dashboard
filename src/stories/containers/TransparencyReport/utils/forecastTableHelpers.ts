import groupBy from 'lodash/groupBy';
import {
  getBudgetCapForMonthOnLineItem,
  getBudgetCapForMonthOnWalletOnBudgetStatement,
  getBudgetCapSumOfMonthsOnWallet,
  getForecastForMonthOnWalletOnBudgetStatement,
  getForecastSumOfMonthsOnWallet,
  getLineItemForecastSumForMonth,
  getLineItemForecastSumForMonths,
  getLineItemsForWalletOnMonth,
  getTotalQuarterlyBudgetCapOnLineItem,
  hasExpensesInRange,
  hasWalletGroups,
} from './budgetStatementsUtils';
import type { InnerTableColumn, InnerTableRow, RowType } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
} from '@ses/core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

export const getForecastBreakdownColumns = (
  wallet: BudgetStatementWalletDto,
  firstMonth: DateTime,
  secondMonth: DateTime,
  thirdMonth: DateTime
) => {
  const hasGroups = hasWalletGroups(wallet);

  return [
    {
      header: 'Budget Category',
      isCardHeader: true,
      width: hasGroups ? '220px' : '240px',
      type: 'text',
    },
    {
      header: firstMonth.toFormat('MMMM'),
      type: 'number',
      align: 'right',
    },
    {
      header: secondMonth.toFormat('MMMM'),
      type: 'number',
      align: 'right',
    },
    {
      header: thirdMonth.toFormat('MMMM'),
      type: 'number',
      align: 'right',
    },
    {
      header: 'Mthly Budget',
      type: 'number',
      align: 'right',
    },
    {
      header: '3 Months',
      type: 'number',
      align: 'right',
    },
    {
      header: 'Qtly Budget',
      type: 'number',
      align: 'right',
    },
  ] as InnerTableColumn[];
};

export const getBreakdownItemsForGroup = (
  lineItems: BudgetStatementLineItemDto[],
  breakdownColumns: InnerTableColumn[],
  currentMonth: DateTime,
  firstMonth: DateTime,
  secondMonth: DateTime,
  thirdMonth: DateTime,
  type?: RowType
) => {
  const result: InnerTableRow[] = [];

  const groupedCategory = groupBy(lineItems, (item) => item.budgetCategory);

  for (const groupedCatKey in groupedCategory) {
    if (
      Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth)) +
        Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth)) +
        Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth)) +
        Math.abs(
          getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [firstMonth, secondMonth, thirdMonth])
        ) +
        Math.abs(getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth)) +
        Math.abs(
          getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [firstMonth, secondMonth, thirdMonth])
        ) ===
      0
    ) {
      continue;
    }

    result.push({
      type: type ?? 'normal',
      ...(type === 'subTotal'
        ? {
            borderTop: true,
            borderBottom: true,
          }
        : {}),
      items: [
        {
          column: breakdownColumns[0],
          value: groupedCatKey,
        },
        {
          column: breakdownColumns[1],
          value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth),
        },
        {
          column: breakdownColumns[2],
          value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth),
        },
        {
          column: breakdownColumns[3],
          value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth),
        },

        {
          column: breakdownColumns[4],
          value: getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth),
        },
        {
          column: breakdownColumns[5],
          value: getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [firstMonth, secondMonth, thirdMonth]),
        },
        {
          column: breakdownColumns[6],
          value: getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]),
        },
      ],
    });
  }

  return result;
};

export const getBreakdownItemsForWallet = (
  budgetStatements: BudgetStatementDto[] | undefined,
  wallet: BudgetStatementWalletDto,
  breakdownColumns: InnerTableColumn[],
  currentMonth: DateTime,
  firstMonth: DateTime,
  secondMonth: DateTime,
  thirdMonth: DateTime
) => {
  const result: InnerTableRow[] = [];

  if (!budgetStatements || budgetStatements.length === 0) {
    return result;
  }
  if (!wallet) {
    return result;
  }

  const currentWalletAddress = wallet.address ?? '';
  const hasGroups = hasWalletGroups(wallet);
  const ungrouped = [
    ...getLineItemsForWalletOnMonth(budgetStatements, currentMonth, currentMonth, currentWalletAddress),
    ...getLineItemsForWalletOnMonth(budgetStatements, currentMonth, firstMonth, currentWalletAddress),
    ...getLineItemsForWalletOnMonth(budgetStatements, currentMonth, secondMonth, currentWalletAddress),
    ...getLineItemsForWalletOnMonth(budgetStatements, currentMonth, thirdMonth, currentWalletAddress),
  ];
  const threeMonths = [firstMonth, secondMonth, thirdMonth];
  const grouped = groupBy(ungrouped, (item) => (item.group?.trim() ? item.group : ''));

  let linesWithActualData = 0;

  for (const groupedKey in grouped) {
    const hasHeadcount = hasExpensesInRange(grouped[groupedKey], currentMonth, threeMonths, true);
    const hasNonHeadcount = hasExpensesInRange(grouped[groupedKey], currentMonth, threeMonths, false);
    if (!hasHeadcount && !hasNonHeadcount) {
      continue;
    }

    if (hasGroups) {
      // it is a project group
      result.push({
        type: 'groupTitle',
        items: [
          {
            column: breakdownColumns[0],
            value: groupedKey === '' ? 'Core Unit' : groupedKey,
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

      const items = getBreakdownItemsForGroup(
        grouped[groupedKey].filter((item) => item.headcountExpense),
        breakdownColumns,
        currentMonth,
        firstMonth,
        secondMonth,
        thirdMonth
      );
      linesWithActualData += items.length;
      result.push(...items);

      if (!hasGroups) {
        // subtotal when it is a non headcount without a group
        result.push(
          ...getBreakdownItemsForGroup(
            [
              ...grouped[groupedKey]
                .filter((item) => item.headcountExpense)
                .map((item) => ({
                  ...item,
                  budgetCategory: 'Subtotal',
                })),
            ],
            breakdownColumns,
            currentMonth,
            firstMonth,
            secondMonth,
            thirdMonth,
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

      const items = getBreakdownItemsForGroup(
        grouped[groupedKey].filter((item) => !item.headcountExpense),
        breakdownColumns,
        currentMonth,
        firstMonth,
        secondMonth,
        thirdMonth
      );
      linesWithActualData += items.length;
      result.push(...items);

      if (!hasGroups) {
        // subtotal when it is a non headcount without a group
        result.push(
          ...getBreakdownItemsForGroup(
            [
              ...grouped[groupedKey]
                .filter((item) => !item.headcountExpense)
                .map((item) => ({
                  ...item,
                  budgetCategory: 'Subtotal',
                })),
            ],
            breakdownColumns,
            currentMonth,
            firstMonth,
            secondMonth,
            thirdMonth,
            'subTotal'
          )
        );
      }
    }

    if ((hasHeadcount || hasNonHeadcount) && hasGroups) {
      // subtotal of the whole group (headcount and non headcount)
      result.push(
        ...getBreakdownItemsForGroup(
          [
            ...grouped[groupedKey].map((item) => ({
              ...item,
              budgetCategory: 'Subtotal',
            })),
          ],
          breakdownColumns,
          currentMonth,
          firstMonth,
          secondMonth,
          thirdMonth,
          'subTotal'
        )
      );
    }
  }

  if (linesWithActualData > 0) {
    result.push({
      type: 'total',
      items: [
        {
          column: breakdownColumns[0],
          value: 'Total',
        },
        {
          column: breakdownColumns[1],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            budgetStatements,
            currentWalletAddress,
            currentMonth,
            firstMonth
          ),
        },
        {
          column: breakdownColumns[2],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            budgetStatements,
            currentWalletAddress,
            currentMonth,
            secondMonth
          ),
        },
        {
          column: breakdownColumns[3],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            budgetStatements,
            currentWalletAddress,
            currentMonth,
            thirdMonth
          ),
        },
        {
          column: breakdownColumns[5],
          value: getBudgetCapForMonthOnWalletOnBudgetStatement(
            budgetStatements,
            currentWalletAddress,
            currentMonth,
            currentMonth
          ),
        },
        {
          column: breakdownColumns[4],
          value: getForecastSumOfMonthsOnWallet(budgetStatements, currentWalletAddress, currentMonth, [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]),
        },
        {
          column: breakdownColumns[6],
          value: getBudgetCapSumOfMonthsOnWallet(budgetStatements, currentWalletAddress, currentMonth, [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]),
        },
      ],
    });
  }

  return result;
};
