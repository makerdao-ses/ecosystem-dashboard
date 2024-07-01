import {
  budgetTotalActual,
  budgetTotalDifference,
  budgetTotalForecast,
  budgetTotalPayment,
  currentBudgetStatementWorking,
  getAllWallets,
  getGroupActual,
  getGroupForecast,
  getWalletActual,
  getWalletDifference,
  getWalletForecast,
  getWalletPayment,
} from '@ses/core/utils/finances';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { renderWallet } from '@/views/CoreUnitBudgetStatement/transparencyReportUtils';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';
import { API_MONTH_TO_FORMAT } from '../../../../core/utils/date';
import { getWalletWidthForWallets } from '../../../../core/utils/string';
import type {
  InnerTableColumn,
  InnerTableRow,
  RowType,
} from '../../../components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementLineItem } from '@ses/core/models/interfaces/budgetStatementWallet';
import type { DateTime } from 'luxon';

export const useDelegatesActuals = (propsCurrentMonth: DateTime, budgetStatements: BudgetStatement[] | undefined) => {
  const currentMonth = useMemo(() => propsCurrentMonth.toFormat(API_MONTH_TO_FORMAT), [propsCurrentMonth]);
  const anchor = useUrlAnchor();

  const walletsActuals = useMemo(
    () => getAllWallets(budgetStatements, propsCurrentMonth),
    [budgetStatements, propsCurrentMonth]
  );

  const currentBudgetStatement = useMemo(
    () => currentBudgetStatementWorking(budgetStatements, currentMonth),
    [budgetStatements, currentMonth]
  );
  const breakdownTabsActuals = useMemo(() => walletsActuals.map((wallet) => wallet.name), [walletsActuals]);
  const getGroupDifference = useCallback(
    (group: BudgetStatementLineItem[]) => getGroupForecast(group, currentMonth) - getGroupActual(group, currentMonth),
    [currentMonth]
  );

  const getCommentsFromCategory = useCallback(
    (group: BudgetStatementLineItem[]) =>
      group
        .filter((item) => item.month === currentMonth && item.comments !== undefined)
        .reduce((current, next) => `${current} ${next.comments !== '' ? next.comments : ''}`, ''),
    [currentMonth]
  );

  const getGroupPayment = useCallback(
    (group: BudgetStatementLineItem[]) =>
      _.sumBy(
        group.filter((item) => item.month === currentMonth),
        (item) => item.payment ?? 0
      ),
    [currentMonth]
  );

  const [headerIdsActuals, setHeaderIdsActuals] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const thirdIndexActuals = useMemo(
    () => Math.max(headerIdsActuals?.indexOf(anchor ?? ''), 0),
    [headerIdsActuals, anchor]
  );

  const currentWallet = useMemo(() => walletsActuals[thirdIndexActuals], [thirdIndexActuals, walletsActuals]);

  const hasGroups = useMemo(() => {
    const currentWallet = walletsActuals[thirdIndexActuals];

    return currentWallet?.budgetStatementLineItem?.some((item) => item.group && item.actual);
  }, [walletsActuals, thirdIndexActuals]);

  const breakdownTitleRef = useRef<HTMLDivElement>(null);

  const hasExpenses = useCallback(
    (headCount = true) =>
      currentWallet?.budgetStatementLineItem
        ?.filter((item) => (headCount ? item.headcountExpense : !item.headcountExpense))
        .some((x) => (x.actual || x.forecast) && x.month === currentBudgetStatement?.month),
    [currentBudgetStatement?.month, currentWallet?.budgetStatementLineItem]
  );

  const headerToId = (header: string): string => {
    const id = header.toLowerCase().trim().replaceAll(/ /g, '-');
    return `actuals-${id}`;
  };

  useEffect(() => {
    setHeaderIdsActuals(breakdownTabsActuals.map((header: string) => headerToId(header)));
  }, [breakdownTabsActuals]);

  useEffect(() => {
    if (!scrolled && anchor && !_.isEmpty(headerIdsActuals) && headerIdsActuals.includes(anchor)) {
      setScrolled(true);
      let offset = (breakdownTitleRef?.current?.offsetTop || 0) - 260;
      const windowsWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (windowsWidth < 834) {
        offset += 90;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor, headerIdsActuals, scrolled]);

  const mainTableColumnsActuals = useMemo(() => {
    const mainTableColumnsActuals: InnerTableColumn[] = [
      {
        header: 'Budget',
        align: 'left',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        width: getWalletWidthForWallets(walletsActuals),
        minWidth: getWalletWidthForWallets(walletsActuals),
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
        header: 'Payments',
        align: 'right',
        type: 'number',
      },
    ];
    return mainTableColumnsActuals;
  }, [walletsActuals]);

  const mainTableItemsActuals = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (currentBudgetStatement) {
      walletsActuals.forEach((wallet) => {
        const numberCellData = [
          getWalletForecast(wallet, currentMonth),
          getWalletActual(wallet, currentMonth),
          getWalletDifference(wallet, currentMonth),
          getWalletPayment(wallet, currentMonth),
        ];

        if (numberCellData.some((n) => n !== 0)) {
          result.push({
            type: 'normal',
            items: [
              {
                column: mainTableColumnsActuals[0],
                value: wallet,
              },
              {
                column: mainTableColumnsActuals[1],
                value: numberCellData[0],
              },
              {
                column: mainTableColumnsActuals[2],
                value: numberCellData[1],
              },
              {
                column: mainTableColumnsActuals[3],
                value: numberCellData[2],
              },
              {
                column: mainTableColumnsActuals[4],
                value: numberCellData[3],
              },
            ],
          });
        }
      });

      if (result.length > 0) {
        result.push({
          type: 'total',
          items: [
            {
              column: mainTableColumnsActuals[0],
              value: 'Total',
            },
            {
              column: mainTableColumnsActuals[1],
              value: budgetTotalForecast(currentBudgetStatement, currentMonth),
            },
            {
              column: mainTableColumnsActuals[2],
              value: budgetTotalActual(currentBudgetStatement, currentMonth),
            },
            {
              column: mainTableColumnsActuals[3],
              value: budgetTotalDifference(currentBudgetStatement, currentMonth),
            },
            {
              column: mainTableColumnsActuals[4],
              value: budgetTotalPayment(currentBudgetStatement, currentMonth),
            },
          ],
          hideMobile: result.length < 2,
        });
      }
    }

    return result;
  }, [currentBudgetStatement, currentMonth, mainTableColumnsActuals, walletsActuals]);

  const breakdownColumnsActuals = useMemo(() => {
    const breakdownColumns: InnerTableColumn[] = [
      {
        header: 'Recognized delegates',
        align: 'left',
        type: 'text',
        hidden: !hasGroups,
        isCardHeader: true,
        width: '240px',
      },
      {
        header: 'Budget Category',
        align: 'left',
        type: 'text',
        isCardHeader: true,
        width: hasGroups ? '220px' : '240px',
        hidden: true,
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
    ];
    return breakdownColumns;
  }, [hasGroups]);

  const getBreakdownItems = useCallback(
    (items: BudgetStatementLineItem[], type?: RowType) => {
      const result: InnerTableRow[] = [];
      const grouped = _.groupBy(items, (item) => item.group);

      for (const groupedKey in grouped) {
        if (
          Math.abs(getGroupForecast(grouped[groupedKey], currentMonth)) +
            Math.abs(getGroupActual(grouped[groupedKey], currentMonth)) ===
          0
        ) {
          continue;
        }

        const groupedCategory = _.groupBy(grouped[groupedKey], (item) => item.budgetCategory);

        let i = 1;
        for (const groupedCatKey in groupedCategory) {
          if (
            Math.abs(getGroupForecast(groupedCategory[groupedCatKey], currentMonth)) +
              Math.abs(getGroupActual(groupedCategory[groupedCatKey], currentMonth)) ===
            0
          ) {
            continue;
          }

          result.push({
            type: type || 'normal',
            items: [
              {
                column: breakdownColumnsActuals[0],
                value: i === 1 && groupedKey !== 'null' ? groupedKey : '',
              },
              {
                column: breakdownColumnsActuals[1],
                value: groupedCategory[groupedCatKey][0].budgetCategory,
              },
              {
                column: breakdownColumnsActuals[2],
                value: getGroupForecast(groupedCategory[groupedCatKey], currentMonth),
              },
              {
                column: breakdownColumnsActuals[3],
                value: getGroupActual(groupedCategory[groupedCatKey], currentMonth),
              },
              {
                column: breakdownColumnsActuals[4],
                value: getGroupDifference(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumnsActuals[5],
                value: getCommentsFromCategory(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumnsActuals[6],
                value: getGroupPayment(groupedCategory[groupedCatKey]),
              },
            ],
          });

          i++;
        }
      }

      return result;
    },
    [breakdownColumnsActuals, currentMonth, getCommentsFromCategory, getGroupDifference, getGroupPayment]
  );

  const getLineItemsSubtotal = useCallback(
    (items: BudgetStatementLineItem[], title: string) =>
      items?.reduce(
        (prv, curr) =>
          curr.month === currentBudgetStatement?.month
            ? {
                group: hasGroups ? title : '',
                budgetCategory: !hasGroups ? title : '',
                actual: prv.actual + curr.actual,
                forecast: (prv?.forecast ?? 0) + (curr?.forecast ?? 0),
                payment: (prv?.payment ?? 0) + (curr?.payment ?? 0),
                month: currentBudgetStatement?.month,
              }
            : prv,
        {
          actual: 0,
          forecast: 0,
          payment: 0,
        }
      ) ?? {},
    [currentBudgetStatement?.month, hasGroups]
  );

  const breakdownItemsActuals = useMemo(() => {
    const result: InnerTableRow[] = [];
    if (!walletsActuals) {
      return result;
    }

    if (hasExpenses(true)) {
      result.push(
        ...getBreakdownItems(currentWallet?.budgetStatementLineItem?.filter((item) => item.headcountExpense))
      );

      result.push(
        ...getBreakdownItems(
          [
            getLineItemsSubtotal(
              currentWallet?.budgetStatementLineItem?.filter((item) => item.headcountExpense),
              'Subtotal'
            ),
          ],
          'subTotal'
        )
      );
    }

    if (hasExpenses(false)) {
      result.push({
        items: [
          {
            column: breakdownColumnsActuals[0],
            value: 'Non-Headcount Expenses',
          },
          {
            column: breakdownColumnsActuals[1],
            value: hasGroups ? '' : 'Non-Headcount Expenses',
          },
        ],
        type: 'section',
      });

      const headcountExpenseItems = getBreakdownItems(
        currentWallet?.budgetStatementLineItem?.filter((item) => !item.headcountExpense)
      );

      result.push(...headcountExpenseItems);

      result.push(
        ...getBreakdownItems(
          [
            getLineItemsSubtotal(
              currentWallet?.budgetStatementLineItem?.filter((item) => !item.headcountExpense),
              'Subtotal'
            ),
          ],
          'subTotal'
        )
      );
    }

    if (result.length > 0) {
      result.push({
        type: 'total',
        items: [
          {
            column: breakdownColumnsActuals[0],
            value: hasGroups ? 'Total' : '',
          },
          {
            column: breakdownColumnsActuals[1],
            value: hasGroups ? '' : 'Total',
          },
          {
            column: breakdownColumnsActuals[2],
            value: getWalletForecast(currentWallet, currentMonth),
          },
          {
            column: breakdownColumnsActuals[3],
            value: getWalletActual(currentWallet, currentMonth),
          },
          {
            column: breakdownColumnsActuals[4],
            value: getWalletDifference(currentWallet, currentMonth),
          },
          {
            column: breakdownColumnsActuals[5],
            value: '',
          },
          {
            column: breakdownColumnsActuals[6],
            value: getWalletPayment(currentWallet, currentMonth),
          },
        ],
      });
    }

    return result;
  }, [
    breakdownColumnsActuals,
    currentMonth,
    currentWallet,
    getBreakdownItems,
    getLineItemsSubtotal,
    hasExpenses,
    hasGroups,
    walletsActuals,
  ]);

  return {
    headerIdsActuals,
    thirdIndexActuals,
    breakdownTitleRef,
    breakdownColumnsActuals,
    breakdownItemsActuals,
    mainTableColumnsActuals,
    mainTableItemsActuals,
    breakdownTabsActuals,
    walletsActuals,
    currentBudgetStatement,
  };
};
