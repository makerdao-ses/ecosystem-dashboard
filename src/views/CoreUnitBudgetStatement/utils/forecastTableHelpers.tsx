import groupBy from 'lodash/groupBy';
import ProgressiveIndicator from '../components/TransparencyForecast/ProgresiveIndicator';
import { ContainerProgressiveIndicator } from '../components/TransparencyForecast/useTransparencyForecast';
import {
  getBudgetCapForMonthOnLineItem,
  getBudgetCapForMonthOnWalletOnBudgetStatement,
  getBudgetCapSumOfMonthsOnWallet,
  getExtraEmptyColumnsForHeaders,
  getForecastForMonthOnWalletOnBudgetStatement,
  getForecastSumOfMonthsOnWallet,
  getLineItemForecastSumForMonth,
  getLineItemForecastSumForMonths,
  getLineItemsForWalletOnMonth,
  getTotalQuarterlyBudgetCapOnLineItem,
  hasExpensesInRange,
  hasWalletGroups,
} from './budgetStatementsUtils';
import {
  getBudgetCapForMonthOnLineItemForeCast,
  getBudgetCapForMonthOnWalletOnBudgetStatementForeCast,
  sumAllMonths,
} from './forecastHelper';
import type { InnerTableColumn, InnerTableRow, RowType } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementLineItem, BudgetStatementWallet } from '@ses/core/models/interfaces/budgetStatementWallet';
import type { DateTime } from 'luxon';

export const getForecastBreakdownColumns = (
  wallet: BudgetStatementWallet,
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
      type: 'custom',
      align: 'right',
    },
    {
      header: secondMonth.toFormat('MMMM'),
      type: 'custom',
      align: 'right',
    },
    {
      header: thirdMonth.toFormat('MMMM'),
      type: 'custom',
      align: 'right',
      hasBorderRight: true,
    },
    {
      header: 'Mthly Budget',
      type: 'number',
      align: 'right',
      hasBorderRight: true,
      hidden: true,
    },
    {
      header: 'Totals',
      type: 'custom',
      align: 'right',
    },
    {
      header: 'Qtly Budget',
      type: 'number',
      align: 'right',
      hidden: true,
    },
  ] as InnerTableColumn[];
};

export const getBreakdownItemsForGroup = (
  lineItems: BudgetStatementLineItem[],
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
    const resultFirstMonth = getBudgetCapForMonthOnLineItemForeCast(groupedCategory[groupedCatKey], firstMonth);
    const resultSecondMonth = getBudgetCapForMonthOnLineItemForeCast(groupedCategory[groupedCatKey], secondMonth);
    const resultThirdMonth = getBudgetCapForMonthOnLineItemForeCast(groupedCategory[groupedCatKey], thirdMonth);
    const sumTotal = sumAllMonths([resultFirstMonth, resultSecondMonth, resultThirdMonth]);
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
          value: (
            <ContainerProgressiveIndicator>
              {typeof resultFirstMonth === 'number' ? (
                <ProgressiveIndicator
                  budgetCap={resultFirstMonth}
                  forecast={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth)}
                  month={firstMonth}
                />
              ) : (
                <div>N/A</div>
              )}
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[2],
          value: (
            <ContainerProgressiveIndicator>
              {typeof resultSecondMonth === 'number' ? (
                <ProgressiveIndicator
                  budgetCap={resultSecondMonth}
                  forecast={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth)}
                  month={secondMonth}
                />
              ) : (
                <div>N/A</div>
              )}
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[3],
          value: (
            <ContainerProgressiveIndicator>
              {typeof resultThirdMonth === 'number' ? (
                <ProgressiveIndicator
                  budgetCap={resultThirdMonth}
                  forecast={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth)}
                  month={thirdMonth}
                />
              ) : (
                <div>N/A</div>
              )}
            </ContainerProgressiveIndicator>
          ),
        },

        {
          column: breakdownColumns[4],
          value: getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth),
        },
        {
          column: breakdownColumns[5],
          value: (
            <ContainerProgressiveIndicator>
              {typeof sumTotal === 'number' ? (
                <ProgressiveIndicator
                  budgetCap={sumTotal}
                  forecast={getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
                    firstMonth,
                    secondMonth,
                    thirdMonth,
                  ])}
                />
              ) : (
                <div>N/A</div>
              )}
            </ContainerProgressiveIndicator>
          ),
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
  budgetStatements: BudgetStatement[] | undefined,
  wallet: BudgetStatementWallet,
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

  for (const groupedKey in grouped) {
    const hasHeadcount = hasExpensesInRange(grouped[groupedKey], currentMonth, threeMonths, true);
    const hasNonHeadcount = hasExpensesInRange(grouped[groupedKey], currentMonth, threeMonths, false);
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
          ...getExtraEmptyColumnsForHeaders(breakdownColumns),
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
          ...getExtraEmptyColumnsForHeaders(breakdownColumns),
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
      groupItemsCount += items.length;
      result.push(...items);
      if (!hasGroups && items.length > 1) {
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
          ...getExtraEmptyColumnsForHeaders(breakdownColumns),
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
      groupItemsCount += items.length;
      result.push(...items);

      if (!hasGroups && items.length > 1) {
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

    if ((hasHeadcount || hasNonHeadcount) && hasGroups && groupItemsCount > 1) {
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

  if (result.length > 0) {
    const totalFirstMonthBudgetCap = getBudgetCapForMonthOnWalletOnBudgetStatementForeCast(
      budgetStatements,
      currentWalletAddress,
      currentMonth,
      firstMonth
    );
    const totalSecondMonthBudgetCap = getBudgetCapForMonthOnWalletOnBudgetStatementForeCast(
      budgetStatements,
      currentWalletAddress,
      currentMonth,
      secondMonth
    );
    const totalThirdMonthBudgetCap = getBudgetCapForMonthOnWalletOnBudgetStatementForeCast(
      budgetStatements,
      currentWalletAddress,
      currentMonth,
      thirdMonth
    );
    const totalOfThreeMonths = sumAllMonths([
      totalFirstMonthBudgetCap,
      totalSecondMonthBudgetCap,
      totalThirdMonthBudgetCap,
    ]);
    result.push({
      type: 'total',
      items: [
        {
          column: breakdownColumns[0],
          value: 'Total',
        },
        {
          column: breakdownColumns[1],
          value: (
            <ContainerProgressiveIndicator>
              {typeof totalFirstMonthBudgetCap === 'number' ? (
                <ProgressiveIndicator
                  isTotal
                  month={firstMonth}
                  budgetCap={totalFirstMonthBudgetCap}
                  forecast={getForecastForMonthOnWalletOnBudgetStatement(
                    budgetStatements,
                    currentWalletAddress,
                    currentMonth,
                    firstMonth
                  )}
                />
              ) : (
                <div>N/A</div>
              )}
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[2],
          value: (
            <ContainerProgressiveIndicator>
              {typeof totalSecondMonthBudgetCap === 'number' ? (
                <ProgressiveIndicator
                  isTotal
                  month={secondMonth}
                  budgetCap={totalSecondMonthBudgetCap}
                  forecast={getForecastForMonthOnWalletOnBudgetStatement(
                    budgetStatements,
                    currentWalletAddress,
                    currentMonth,
                    secondMonth
                  )}
                />
              ) : (
                <div>N/A</div>
              )}
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[3],
          value: (
            <ContainerProgressiveIndicator>
              {typeof totalThirdMonthBudgetCap === 'number' ? (
                <ProgressiveIndicator
                  month={thirdMonth}
                  budgetCap={totalThirdMonthBudgetCap}
                  forecast={getForecastForMonthOnWalletOnBudgetStatement(
                    budgetStatements,
                    currentWalletAddress,
                    currentMonth,
                    thirdMonth
                  )}
                  isTotal
                />
              ) : (
                <div>N/A</div>
              )}
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[4],
          value: getBudgetCapForMonthOnWalletOnBudgetStatement(
            budgetStatements,
            currentWalletAddress,
            currentMonth,
            currentMonth
          ),
        },
        {
          column: breakdownColumns[5],
          value: (
            <ContainerProgressiveIndicator>
              {typeof totalOfThreeMonths === 'number' ? (
                <ProgressiveIndicator
                  budgetCap={totalOfThreeMonths}
                  forecast={getForecastSumOfMonthsOnWallet(budgetStatements, currentWalletAddress, currentMonth, [
                    firstMonth,
                    secondMonth,
                    thirdMonth,
                  ])}
                  isTotal
                />
              ) : (
                <div>N/A</div>
              )}
            </ContainerProgressiveIndicator>
          ),
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
