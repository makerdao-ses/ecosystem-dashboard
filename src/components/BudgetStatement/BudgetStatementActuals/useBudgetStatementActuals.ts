import { useCategoriesModalContext } from '@ses/core/context/CategoryModalContext';
import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { capitalizeSentence, getWalletWidthForWallets, toKebabCase } from '@ses/core/utils/string';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';

import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import {
  getActualsBreakdownColumns,
  getActualsBreakdownItemsForWallet,
} from '@/views/CoreUnitBudgetStatement/utils/actualsTableHelpers';
import {
  getWalletActual,
  getWalletDifference,
  getWalletForecast,
  getWalletMonthlyBudget,
  getWalletPayment,
} from '@/views/CoreUnitBudgetStatement/utils/budgetStatementsUtils';
import { ACTUALS_BREAKDOWN_QUERY_PARAM } from '@/views/CoreUnitBudgetStatement/utils/constants';
import replacePaymentTopup from '@/views/CoreUnitBudgetStatement/utils/helpers';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementWallet } from '@ses/core/models/interfaces/budgetStatementWallet';
import type { DateTime } from 'luxon';

export const useTransparencyActuals = (
  propsCurrentMonth: DateTime,
  budgetStatements: BudgetStatement[] | undefined
) => {
  const { handleOpenModal } = useCategoriesModalContext();
  const currentMonth = useMemo(() => propsCurrentMonth.toFormat(API_MONTH_TO_FORMAT), [propsCurrentMonth]);
  const router = useRouter();
  const query = router.query;
  const selectedBreakdown = Array.isArray(query[ACTUALS_BREAKDOWN_QUERY_PARAM])
    ? query[ACTUALS_BREAKDOWN_QUERY_PARAM][0]
    : query[ACTUALS_BREAKDOWN_QUERY_PARAM];

  const wallets: BudgetStatementWallet[] = useMemo(() => {
    const dict: { [id: string]: BudgetStatementWallet } = {};

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

  const budgetTotalMonthlyBudget = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item?.budgetCap ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

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

  const thirdIndex = useMemo(
    () => Math.max(headerIds?.indexOf(selectedBreakdown ?? ''), 0),
    [headerIds, selectedBreakdown]
  );

  const currentWallet = useMemo(() => wallets[thirdIndex], [thirdIndex, wallets]);

  const breakdownTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header: string) => toKebabCase(header)));
  }, [breakdownTabs]);

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
        header: 'Mthly Budget',
        align: 'right',
        type: 'number',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Forecast',
        align: 'right',
        type: 'incomeNumber',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Actuals',
        align: 'right',
        type: 'incomeNumber',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Difference',
        align: 'right',
        type: 'number',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Payments',
        align: 'right',
        type: 'number',
        hasBorderBottomOnCard: true,
      },
    ];
    return mainTableColumns;
  }, [wallets]);

  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (currentBudgetStatement) {
      wallets.forEach((wallet) => {
        const numberCellData = [
          getWalletMonthlyBudget(wallet, currentMonth),
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
                value: numberCellData[4],
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
              value: budgetTotalMonthlyBudget,
            },
            {
              column: mainTableColumns[2],
              value: budgetTotalForecast,
            },
            {
              column: mainTableColumns[3],
              value: budgetTotalActual,
            },
            {
              column: mainTableColumns[4],
              value: budgetTotalDifference,
            },
            {
              column: mainTableColumns[5],
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
    budgetTotalMonthlyBudget,
    budgetTotalPayment,
    currentBudgetStatement,
    currentMonth,
    mainTableColumns,
    wallets,
  ]);

  const [breakdownColumnsForActiveTab, allBreakdownColumns] = useMemo(() => {
    const allBreakdownColumns: { [key: string]: InnerTableColumn[] } = {};
    for (const wallet of wallets) {
      allBreakdownColumns[wallet?.name] = getActualsBreakdownColumns(wallet, handleOpenModal);
    }

    return [allBreakdownColumns[currentWallet?.name], allBreakdownColumns];
  }, [currentWallet?.name, handleOpenModal, wallets]);

  const allBreakdownItems = useMemo(() => {
    const result: { [key: string]: InnerTableRow[] } = {};

    for (const wallet of wallets) {
      result[wallet?.name] = replacePaymentTopup(
        getActualsBreakdownItemsForWallet(wallet, allBreakdownColumns[wallet?.name], currentMonth)
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

    handleOpenModal,
  };
};
