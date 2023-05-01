import _ from 'lodash';
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
      header: 'Group',
      hidden: !hasGroups,
      isCardHeader: true,
      width: '240px',
      type: 'text',
    },
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
  grouped: { [id: string]: BudgetStatementLineItemDto[] },
  wallet: BudgetStatementWalletDto,
  breakdownColumns: InnerTableColumn[],
  month: DateTime, // or currentMonth
  firstMonth: DateTime,
  secondMonth: DateTime,
  thirdMonth: DateTime,
  type?: RowType
) => {
  const result: InnerTableRow[] = [];
  const hasGroups = hasWalletGroups(wallet);
  const subTotal = {
    0: 'Sub-Total',
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  };

  for (const groupedKey in grouped) {
    const groupedCategory = _.groupBy(grouped[groupedKey], (item) => item.budgetCategory);

    let i = 1;
    for (const groupedCatKey in groupedCategory) {
      if (
        Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth)) +
          Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth)) +
          Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth)) +
          Math.abs(
            getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [firstMonth, secondMonth, thirdMonth])
          ) +
          Math.abs(getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], month)) +
          Math.abs(
            getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [firstMonth, secondMonth, thirdMonth])
          ) ===
        0
      ) {
        continue;
      }

      subTotal[2] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth);

      subTotal[3] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth);

      subTotal[4] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth);

      subTotal[5] += getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
        firstMonth,
        secondMonth,
        thirdMonth,
      ]);

      subTotal[6] += getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], month);

      subTotal[7] += getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
        firstMonth,
        secondMonth,
        thirdMonth,
      ]);

      result.push({
        type: 'normal',
        items: [
          {
            column: breakdownColumns[0],
            value: i === 1 ? groupedKey : '',
          },
          {
            column: breakdownColumns[1],
            value: groupedCatKey,
          },
          {
            column: breakdownColumns[2],
            value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth),
          },
          {
            column: breakdownColumns[3],
            value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth),
          },
          {
            column: breakdownColumns[4],
            value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth),
          },

          {
            column: breakdownColumns[6],
            value: getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], month),
          },
          {
            column: breakdownColumns[5],
            value: getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
              firstMonth,
              secondMonth,
              thirdMonth,
            ]),
          },
          {
            column: breakdownColumns[7],
            value: getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
              firstMonth,
              secondMonth,
              thirdMonth,
            ]),
          },
        ],
      });

      i++;
    }
  }

  result.push({
    type: type || 'normal',
    borderTop: true,
    borderBottom: true,
    items: [
      {
        column: breakdownColumns[0],
        value: hasGroups ? 'Subtotal' : '',
      },
      {
        column: breakdownColumns[1],
        value: hasGroups ? '' : 'Subtotal',
      },
      {
        column: breakdownColumns[2],
        value: subTotal[2],
      },
      {
        column: breakdownColumns[3],
        value: subTotal[3],
      },
      {
        column: breakdownColumns[4],
        value: subTotal[4],
      },
      {
        column: breakdownColumns[6],
        value: subTotal[6],
      },
      {
        column: breakdownColumns[5],
        value: subTotal[5],
      },
      {
        column: breakdownColumns[7],
        value: subTotal[7],
      },
    ],
  });

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

  result.push({
    type: 'section',
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
  });

  const groupedHeadCount = _.groupBy(
    ungrouped.filter((x) => x.headcountExpense),
    (item) => item.group
  );

  result.push(
    ...getBreakdownItemsForGroup(
      groupedHeadCount,
      wallet,
      breakdownColumns,
      currentMonth,
      firstMonth,
      secondMonth,
      thirdMonth,
      'subTotal'
    )
  );

  result.push({
    type: 'section',
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
  });

  const groupedNonHeadCount = _.groupBy(
    ungrouped.filter((x) => !x.headcountExpense),
    (item) => item.group?.trim() || ''
  );

  result.push(
    ...getBreakdownItemsForGroup(
      groupedNonHeadCount,
      wallet,
      breakdownColumns,
      currentMonth,
      firstMonth,
      secondMonth,
      thirdMonth,
      'subTotal'
    )
  );

  if (result.length <= 4) {
    return [];
  }

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
        value: getForecastForMonthOnWalletOnBudgetStatement(
          budgetStatements,
          currentWalletAddress,
          currentMonth,
          firstMonth
        ),
      },
      {
        column: breakdownColumns[3],
        value: getForecastForMonthOnWalletOnBudgetStatement(
          budgetStatements,
          currentWalletAddress,
          currentMonth,
          secondMonth
        ),
      },
      {
        column: breakdownColumns[4],
        value: getForecastForMonthOnWalletOnBudgetStatement(
          budgetStatements,
          currentWalletAddress,
          currentMonth,
          thirdMonth
        ),
      },
      {
        column: breakdownColumns[6],
        value: getBudgetCapForMonthOnWalletOnBudgetStatement(
          budgetStatements,
          currentWalletAddress,
          currentMonth,
          currentMonth
        ),
      },
      {
        column: breakdownColumns[5],
        value: getForecastSumOfMonthsOnWallet(budgetStatements, currentWalletAddress, currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ]),
      },
      {
        column: breakdownColumns[7],
        value: getBudgetCapSumOfMonthsOnWallet(budgetStatements, currentWalletAddress, currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ]),
      },
    ],
  });

  return result;
};
