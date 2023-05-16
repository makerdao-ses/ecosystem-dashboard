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
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                budgetCap={getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], firstMonth)}
                forecast={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonth)}
              />
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[2],
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                budgetCap={getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], secondMonth)}
                forecast={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonth)}
              />
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[3],
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                budgetCap={getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], thirdMonth)}
                forecast={getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonth)}
              />
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
              <ProgressiveIndicator
                budgetCap={getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ])}
                forecast={getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ])}
              />
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
              <ProgressiveIndicator
                isTotal
                budgetCap={getBudgetCapForMonthOnWalletOnBudgetStatement(
                  budgetStatements,
                  currentWalletAddress,
                  currentMonth,
                  firstMonth
                )}
                forecast={getForecastForMonthOnWalletOnBudgetStatement(
                  budgetStatements,
                  currentWalletAddress,
                  currentMonth,
                  firstMonth
                )}
              />
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[2],
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                isTotal
                budgetCap={getBudgetCapForMonthOnWalletOnBudgetStatement(
                  budgetStatements,
                  currentWalletAddress,
                  currentMonth,
                  secondMonth
                )}
                forecast={getForecastForMonthOnWalletOnBudgetStatement(
                  budgetStatements,
                  currentWalletAddress,
                  currentMonth,
                  secondMonth
                )}
              />
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: breakdownColumns[3],
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                budgetCap={getBudgetCapForMonthOnWalletOnBudgetStatement(
                  budgetStatements,
                  currentWalletAddress,
                  currentMonth,
                  thirdMonth
                )}
                forecast={getForecastForMonthOnWalletOnBudgetStatement(
                  budgetStatements,
                  currentWalletAddress,
                  currentMonth,
                  thirdMonth
                )}
                isTotal
              />
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
              <ProgressiveIndicator
                budgetCap={getBudgetCapSumOfMonthsOnWallet(budgetStatements, currentWalletAddress, currentMonth, [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ])}
                forecast={getForecastSumOfMonthsOnWallet(budgetStatements, currentWalletAddress, currentMonth, [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ])}
                isTotal
              />
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
