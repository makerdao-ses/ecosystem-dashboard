import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';
import { API_MONTH_TO_FORMAT } from '../../../../core/utils/date.utils';
import { capitalizeSentence, getWalletWidthForWallets } from '../../../../core/utils/string.utils';
import { renderLinks, renderWallet } from '../transparency-report.utils';
import type {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
} from '../../../../core/models/dto/core-unit.dto';
import type {
  InnerTableColumn,
  InnerTableRow,
  RowType,
} from '../../../components/advanced-inner-table/advanced-inner-table';
import type { DateTime } from 'luxon';

export const useTransparencyActualsMvvm2 = (
  propsCurrentMonth: DateTime,
  budgetStatements: BudgetStatementDto[] | undefined
) => {
  const currentMonth = useMemo(() => propsCurrentMonth.toFormat(API_MONTH_TO_FORMAT), [propsCurrentMonth]);
  const anchor = useUrlAnchor();

  const wallets: BudgetStatementWalletDto[] = useMemo(() => {
    const dict: { [id: string]: BudgetStatementWalletDto } = {};

    const budgetStatement = budgetStatements?.find(
      (bs) => bs.month === propsCurrentMonth.toFormat(API_MONTH_TO_FORMAT)
    );

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return [];

    budgetStatement.budgetStatementWallet.forEach((wallet) => {
      if (wallet.address) {
        if (!dict[wallet.address.toLowerCase()]) {
          wallet.name = capitalizeSentence(wallet.name);
          dict[wallet.address.toLowerCase()] = wallet;
        }
      }
    });

    return _.sortBy(Object.values(dict), 'id');
  }, [propsCurrentMonth, budgetStatements]);

  const getWalletForecast = useMemo(() => {
    const getWalletForecast = (wallet: BudgetStatementWalletDto) =>
      _.sumBy(
        wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
        (i) => i.forecast ?? 0
      );
    return getWalletForecast;
  }, [currentMonth]);

  const getWalletActual = useMemo(() => {
    const getWalletActual = (wallet: BudgetStatementWalletDto) =>
      _.sumBy(
        wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
        (i) => i.actual ?? 0
      );
    return getWalletActual;
  }, [currentMonth]);

  const getWalletPayment = useMemo(() => {
    const getWalletPayment = (wallet: BudgetStatementWalletDto) =>
      _.sumBy(
        wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth),
        (i) => i.payment ?? 0
      );
    return getWalletPayment;
  }, [currentMonth]);

  const getWalletDifference = useMemo(() => {
    const getWalletDifference = (wallet: BudgetStatementWalletDto) =>
      getWalletForecast(wallet) - getWalletActual(wallet);
    return getWalletDifference;
  }, [getWalletActual, getWalletForecast]);

  const currentBudgetStatement = useMemo(
    () => budgetStatements?.find((x) => x.month === currentMonth) ?? null,
    [budgetStatements, currentMonth]
  );

  const breakdownTabs = useMemo(() => wallets.map((wallet) => wallet.name), [wallets]);

  const budgetTotalForecast = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item?.forecast ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalActual = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item?.actual ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalPayment = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item?.payment ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalDifference = useMemo(
    () => budgetTotalForecast - budgetTotalActual,
    [budgetTotalForecast, budgetTotalActual]
  );

  const getGroupForecast = useCallback(
    (group: BudgetStatementLineItemDto[]) =>
      _.sumBy(
        group.filter((item) => item.month === currentMonth),
        (item) => item.forecast ?? 0
      ),
    [currentMonth]
  );

  const getGroupActual = useCallback(
    (group: BudgetStatementLineItemDto[]) =>
      _.sumBy(
        group.filter((item) => item.month === currentMonth),
        (item) => item.actual ?? 0
      ),
    [currentMonth]
  );

  const getGroupDifference = useCallback(
    (group: BudgetStatementLineItemDto[]) => getGroupForecast(group) - getGroupActual(group),
    [getGroupActual, getGroupForecast]
  );

  const getCommentsFromCategory = useCallback(
    (group: BudgetStatementLineItemDto[]) =>
      group
        .filter((item) => item.month === currentMonth && item.comments !== undefined)
        .reduce((current, next) => `${current} ${next.comments !== '' ? next.comments : ''}`, ''),
    [currentMonth]
  );

  const getGroupPayment = useCallback(
    (group: BudgetStatementLineItemDto[]) =>
      _.sumBy(
        group.filter((item) => item.month === currentMonth),
        (item) => item.payment ?? 0
      ),
    [currentMonth]
  );

  const [headerIds, setHeaderIds] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const thirdIndex = useMemo(() => Math.max(headerIds?.indexOf(anchor ?? ''), 0), [headerIds, anchor]);

  const currentWallet = useMemo(() => wallets[thirdIndex], [thirdIndex, wallets]);

  const hasGroups = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return currentWallet?.budgetStatementLineItem?.some((item) => item.group && item.actual);
  }, [wallets, thirdIndex]);

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
    setHeaderIds(breakdownTabs.map((header: string) => headerToId(header)));
  }, [breakdownTabs]);

  useEffect(() => {
    if (!scrolled && anchor && !_.isEmpty(headerIds) && headerIds.includes(anchor)) {
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
  }, [anchor, headerIds, scrolled]);

  const mainTableColumns = useMemo(() => {
    const mainTableColumns: InnerTableColumn[] = [
      {
        header: 'Wallet',
        align: 'left',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        width: getWalletWidthForWallets(wallets),
        minWidth: getWalletWidthForWallets(wallets),
      },
      {
        header: 'Forecast',
        align: 'right',
        type: 'number',
      },
      {
        header: 'Actuals',
        align: 'right',
        type: 'number',
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
      {
        header: 'External Links',
        align: 'left',
        type: 'custom',
        cellRender: renderLinks,
        isCardFooter: true,
      },
    ];
    return mainTableColumns;
  }, [wallets]);

  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (currentBudgetStatement) {
      wallets.forEach((wallet) => {
        const numberCellData = [
          getWalletForecast(wallet),
          getWalletActual(wallet),
          getWalletDifference(wallet),
          getWalletPayment(wallet),
        ];

        if (numberCellData.some((n) => n !== 0)) {
          result.push({
            type: 'normal',
            items: [
              {
                column: mainTableColumns[0],
                value: wallet,
              },
              {
                column: mainTableColumns[1],
                value: numberCellData[0],
              },
              {
                column: mainTableColumns[2],
                value: numberCellData[1],
              },
              {
                column: mainTableColumns[3],
                value: numberCellData[2],
              },
              {
                column: mainTableColumns[4],
                value: numberCellData[3],
              },
              {
                column: mainTableColumns[5],
                value: wallet.address,
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
              column: mainTableColumns[0],
              value: 'Total',
            },
            {
              column: mainTableColumns[1],
              value: budgetTotalForecast,
            },
            {
              column: mainTableColumns[2],
              value: budgetTotalActual,
            },
            {
              column: mainTableColumns[3],
              value: budgetTotalDifference,
            },
            {
              column: mainTableColumns[4],
              value: budgetTotalPayment,
            },
          ],
          hideMobile: result.length < 2,
        });
      }
    }

    return result;
  }, [
    budgetTotalActual,
    budgetTotalDifference,
    budgetTotalForecast,
    budgetTotalPayment,
    currentBudgetStatement,
    getWalletActual,
    getWalletDifference,
    getWalletForecast,
    getWalletPayment,
    mainTableColumns,
    wallets,
  ]);

  const breakdownColumns = useMemo(() => {
    const breakdownColumns: InnerTableColumn[] = [
      {
        header: 'Group',
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
      },
      {
        header: 'Forecast',
        align: 'right',
        type: 'number',
      },
      {
        header: 'Actuals',
        align: 'right',
        type: 'number',
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
    (items: BudgetStatementLineItemDto[], type?: RowType) => {
      const result: InnerTableRow[] = [];
      const grouped = _.groupBy(items, (item) => item.group);

      for (const groupedKey in grouped) {
        if (Math.abs(getGroupForecast(grouped[groupedKey])) + Math.abs(getGroupActual(grouped[groupedKey])) === 0) {
          continue;
        }

        const groupedCategory = _.groupBy(grouped[groupedKey], (item) => item.budgetCategory);

        let i = 1;
        for (const groupedCatKey in groupedCategory) {
          if (
            Math.abs(getGroupForecast(groupedCategory[groupedCatKey])) +
              Math.abs(getGroupActual(groupedCategory[groupedCatKey])) ===
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
                value: getGroupForecast(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumns[3],
                value: getGroupActual(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumns[4],
                value: getGroupDifference(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumns[5],
                value: getCommentsFromCategory(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumns[6],
                value: getGroupPayment(groupedCategory[groupedCatKey]),
              },
            ],
          });

          i++;
        }
      }

      return result;
    },
    [breakdownColumns, getCommentsFromCategory, getGroupActual, getGroupDifference, getGroupForecast, getGroupPayment]
  );

  const getLineItemsSubtotal = useCallback(
    (items: BudgetStatementLineItemDto[], title: string) =>
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

  const breakdownItems = useMemo(() => {
    const result: InnerTableRow[] = [];
    if (!wallets) {
      return result;
    }

    if (hasExpenses(true)) {
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
            column: breakdownColumns[0],
            value: hasGroups ? 'Total' : '',
          },
          {
            column: breakdownColumns[1],
            value: hasGroups ? '' : 'Total',
          },
          {
            column: breakdownColumns[2],
            value: getWalletForecast(currentWallet),
          },
          {
            column: breakdownColumns[3],
            value: getWalletActual(currentWallet),
          },
          {
            column: breakdownColumns[4],
            value: getWalletDifference(currentWallet),
          },
          {
            column: breakdownColumns[5],
            value: '',
          },
          {
            column: breakdownColumns[6],
            value: getWalletPayment(currentWallet),
          },
        ],
      });
    }

    return result;
  }, [
    breakdownColumns,
    currentWallet,
    getBreakdownItems,
    getLineItemsSubtotal,
    getWalletActual,
    getWalletDifference,
    getWalletForecast,
    getWalletPayment,
    hasExpenses,
    hasGroups,
    wallets,
  ]);

  return {
    headerIds,
    thirdIndex,
    breakdownTitleRef,
    breakdownColumns,
    breakdownItems,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
    wallets,
  };
};
