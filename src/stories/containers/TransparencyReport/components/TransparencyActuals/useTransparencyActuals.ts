import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';
import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { capitalizeSentence, getWalletWidthForWallets, toKebabCase } from '@ses/core/utils/string';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { renderLinks, renderWallet } from '../../transparencyReportUtils';
import { getActualsBreakdownColumns, getActualsBreakdownItemsForWallet } from '../../utils/actualsTableHelpers';
import {
  getWalletActual,
  getWalletDifference,
  getWalletForecast,
  getWalletPayment,
} from '../../utils/budgetStatementsUtils';
import type { InnerTableColumn, InnerTableRow } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatementDto, BudgetStatementWalletDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

export const useTransparencyActuals = (
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

  const [headerIds, setHeaderIds] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState<boolean>(false);

  const thirdIndex = useMemo(() => Math.max(headerIds?.indexOf(anchor ?? ''), 0), [headerIds, anchor]);

  const currentWallet = useMemo(() => wallets[thirdIndex], [thirdIndex, wallets]);

  const breakdownTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header: string) => toKebabCase(header)));
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
    currentMonth,
    mainTableColumns,
    wallets,
  ]);

  const [breakdownColumnsForActiveTab, allBreakdownColumns] = useMemo(() => {
    const allBreakdownColumns: { [key: string]: InnerTableColumn[] } = {};
    for (const wallet of wallets) {
      allBreakdownColumns[wallet?.name] = getActualsBreakdownColumns(wallet);
    }

    return [allBreakdownColumns[currentWallet?.name], allBreakdownColumns];
  }, [currentWallet, wallets]);

  const allBreakdownItems = useMemo(() => {
    const result: { [key: string]: InnerTableRow[] } = {};

    for (const wallet of wallets) {
      result[wallet?.name] = getActualsBreakdownItemsForWallet(
        wallet.address as string,
        wallets,
        allBreakdownColumns[wallet?.name],
        currentMonth
      );
    }

    return result;
  }, [allBreakdownColumns, currentMonth, wallets]);

  const breakdownItemsForActiveTab = useMemo(
    () => allBreakdownItems[currentWallet?.name as string],
    [allBreakdownItems, currentWallet]
  );

  return {
    headerIds,
    breakdownTitleRef,
    breakdownColumnsForActiveTab,
    allBreakdownColumns,
    breakdownItemsForActiveTab,
    allBreakdownItems,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
    wallets,
    tabQuery: 'actual-account',
  };
};
