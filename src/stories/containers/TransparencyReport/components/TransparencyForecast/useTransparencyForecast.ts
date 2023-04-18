import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { capitalizeSentence, getWalletWidthForWallets, toKebabCase } from '@ses/core/utils/string';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { renderLinks, renderWallet } from '../../transparencyReportUtils';
import {
  getBudgetCapForMonthOnBudgetStatement,
  getBudgetCapForMonthOnWalletOnBudgetStatement,
  getBudgetCapSumOfMonthsOnWallet,
  getForecastForMonthOnWalletOnBudgetStatement,
  getForecastSumForMonth,
  getForecastSumForMonths,
  getForecastSumOfMonthsOnWallet,
  getTotalQuarterlyBudgetCapOnBudgetStatement,
} from '../../utils/budgetStatementsUtils';
import { FORECAST_BREAKDOWN_QUERY_PARAM } from '../../utils/constants';
import { getBreakdownItemsForWallet, getForecastBreakdownColumns } from '../../utils/forecastTableHelpers';
import type { InnerTableColumn, InnerTableRow } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatementDto, BudgetStatementWalletDto } from '@ses/core/models/dto/coreUnitDTO';
import type { DateTime } from 'luxon';

export const useTransparencyForecast = (currentMonth: DateTime, budgetStatements: BudgetStatementDto[] | undefined) => {
  const firstMonth = useMemo(() => currentMonth.plus({ month: 1 }), [currentMonth]);
  const secondMonth = useMemo(() => currentMonth.plus({ month: 2 }), [currentMonth]);
  const thirdMonth = useMemo(() => currentMonth.plus({ month: 3 }), [currentMonth]);
  const [thirdIndex, setThirdIndex] = useState(0);

  const wallets: BudgetStatementWalletDto[] = useMemo(() => {
    const dict: { [id: string]: BudgetStatementWalletDto } = {};

    const budgetStatement = budgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

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
  }, [currentMonth, budgetStatements]);

  const breakdownTabs = useMemo(() => {
    if (!budgetStatements || budgetStatements.length === 0) return [];
    return wallets?.map((wallet) => wallet.name);
  }, [budgetStatements, wallets]);

  const [headerIds, setHeaderIds] = useState<string[]>([]);
  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header) => toKebabCase(header)));
  }, [breakdownTabs]);

  const query = useRouter().query;
  const selectedBreakdown = Array.isArray(query[FORECAST_BREAKDOWN_QUERY_PARAM])
    ? query[FORECAST_BREAKDOWN_QUERY_PARAM][0]
    : query[FORECAST_BREAKDOWN_QUERY_PARAM];
  const breakdownTitleRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (!scrolled && selectedBreakdown && !_.isEmpty(headerIds) && headerIds.includes(selectedBreakdown)) {
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
  }, [selectedBreakdown, headerIds, scrolled]);

  useEffect(() => {
    if (selectedBreakdown && !_.isEmpty(headerIds)) {
      setThirdIndex(Math.max(headerIds.indexOf(selectedBreakdown), 0));
    }
  }, [selectedBreakdown, headerIds]);

  const mainTableColumns: InnerTableColumn[] = useMemo(
    () => [
      {
        header: 'Wallet',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        width: getWalletWidthForWallets(wallets),
        minWidth: getWalletWidthForWallets(wallets),
        hasBorderRight: true,
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
        hasBorderRight: true,
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
      {
        header: 'External Links',
        type: 'custom',
        align: 'left',
        isCardFooter: true,
        cellRender: renderLinks,
      },
    ],
    [firstMonth, secondMonth, thirdMonth, wallets]
  );

  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (!budgetStatements || !budgetStatements.length) {
      return result;
    }

    let emptyWallets = 0;

    wallets.forEach((wallet) => {
      const numberCellData = [
        getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, wallet?.address, currentMonth, firstMonth),
        getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, wallet?.address, currentMonth, secondMonth),
        getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, wallet?.address, currentMonth, thirdMonth),
        getBudgetCapForMonthOnWalletOnBudgetStatement(budgetStatements, wallet?.address, currentMonth, currentMonth),
        getForecastSumOfMonthsOnWallet(budgetStatements, wallet?.address, currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ]),

        getBudgetCapSumOfMonthsOnWallet(budgetStatements, wallet?.address, currentMonth, [
          firstMonth,
          secondMonth,
          thirdMonth,
        ]),
      ];

      if (numberCellData.every((n) => n === 0)) {
        emptyWallets++;
      }

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
          {
            column: mainTableColumns[6],
            value: numberCellData[5],
          },
          {
            column: mainTableColumns[7],
            value: wallet.address,
          },
        ],
      });
    });

    if (result.length === emptyWallets) {
      return [];
    }

    result.push({
      type: 'total',
      items: [
        {
          column: mainTableColumns[0],
          value: 'Total',
        },
        {
          column: mainTableColumns[1],
          value: getForecastSumForMonth(budgetStatements, currentMonth, firstMonth),
        },
        {
          column: mainTableColumns[2],
          value: getForecastSumForMonth(budgetStatements, currentMonth, secondMonth),
        },
        {
          column: mainTableColumns[3],
          value: getForecastSumForMonth(budgetStatements, currentMonth, thirdMonth),
        },
        {
          column: mainTableColumns[4],
          value: getBudgetCapForMonthOnBudgetStatement(budgetStatements, currentMonth, currentMonth),
        },
        {
          column: mainTableColumns[5],
          value: getForecastSumForMonths(budgetStatements, currentMonth, [firstMonth, secondMonth, thirdMonth]),
        },
        {
          column: mainTableColumns[6],
          value: getTotalQuarterlyBudgetCapOnBudgetStatement(
            budgetStatements,
            [firstMonth, secondMonth, thirdMonth],
            wallets,
            currentMonth
          ),
        },
      ],
      hideMobile: result.length < 2,
    });

    return result;
  }, [budgetStatements, wallets, mainTableColumns, currentMonth, firstMonth, secondMonth, thirdMonth]);

  const [breakdownColumnsForActiveTab, allBreakdownColumns] = useMemo(() => {
    const allBreakdownColumns: { [key: string]: InnerTableColumn[] } = {};
    for (const wallet of wallets) {
      allBreakdownColumns[wallet.name] = getForecastBreakdownColumns(wallet, firstMonth, secondMonth, thirdMonth);
    }

    return [allBreakdownColumns[wallets[thirdIndex]?.name], allBreakdownColumns];
  }, [firstMonth, secondMonth, thirdIndex, thirdMonth, wallets]);

  const allBreakdownItems = useMemo(() => {
    const result: { [key: string]: InnerTableRow[] } = {};

    for (const wallet of wallets) {
      result[wallet?.name] = getBreakdownItemsForWallet(
        budgetStatements,
        wallet,
        allBreakdownColumns[wallet.name],
        currentMonth,
        firstMonth,
        secondMonth,
        thirdMonth
      );
    }

    return result;
  }, [allBreakdownColumns, currentMonth, firstMonth, budgetStatements, secondMonth, thirdMonth, wallets]);

  const breakdownItems = useMemo(
    () => allBreakdownItems[wallets[thirdIndex]?.name || ''],
    [allBreakdownItems, thirdIndex, wallets]
  );

  return {
    mainTableItems,
    mainTableColumns,
    headerIds,
    breakdownTabs,
    breakdownColumnsForActiveTab,
    allBreakdownColumns,
    breakdownItems,
    allBreakdownItems,
    breakdownTitleRef,
    firstMonth,
    secondMonth,
    thirdMonth,
    wallets,
  };
};
