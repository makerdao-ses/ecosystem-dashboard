import { styled } from '@mui/material';
import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { capitalizeSentence, getWalletWidthForWallets, toKebabCase } from '@ses/core/utils/string';

import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';

import HeaderWithIcon from '@/components/BudgetStatement/BudgetStatementForecast/HeaderWithIcon/HeaderWithIcon';
import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import {
  getBudgetCapForMonthOnBudgetStatement,
  getBudgetCapForMonthOnWalletOnBudgetStatement,
  getBudgetCapSumOfMonthsOnWallet,
  getForecastSumForMonth,
  getForecastSumForMonths,
  getTotalQuarterlyBudgetCapOnBudgetStatement,
} from '@/views/CoreUnitBudgetStatement/utils/budgetStatementsUtils';
import { FORECAST_BREAKDOWN_QUERY_PARAM } from '@/views/CoreUnitBudgetStatement/utils/constants';
import {
  getBudgetCapForMonthOnBudgetStatementForeCast,
  getForecastForMonthOnWalletOnBudgetStatementOrNA,
  getForecastSumOfMonthsOnWalletForeCast,
  getTransferRequestSource,
  getWalletMonthlyBudgetForeCast,
  sumAllMonths,
} from '@/views/CoreUnitBudgetStatement/utils/forecastHelper';
import {
  getBreakdownItemsForWallet,
  getForecastBreakdownColumns,
} from '@/views/CoreUnitBudgetStatement/utils/forecastTableHelpers';
import replacePaymentTopup from '@/views/CoreUnitBudgetStatement/utils/helpers';
import ProgressiveIndicator from './ProgresiveIndicator';

import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementWallet } from '@ses/core/models/interfaces/budgetStatementWallet';
import type { DateTime } from 'luxon';

export const useBudgetStatementForecast = (currentMonth: DateTime, budgetStatements: BudgetStatement[] | undefined) => {
  const firstMonth = useMemo(() => currentMonth.plus({ month: 1 }), [currentMonth]);
  const secondMonth = useMemo(() => currentMonth.plus({ month: 2 }), [currentMonth]);
  const thirdMonth = useMemo(() => currentMonth.plus({ month: 3 }), [currentMonth]);
  const [thirdIndex, setThirdIndex] = useState(0);

  const wallets: BudgetStatementWallet[] = useMemo(() => {
    const dict: { [id: string]: BudgetStatementWallet } = {};

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

  useEffect(() => {
    if (selectedBreakdown && !_.isEmpty(headerIds)) {
      setThirdIndex(Math.max(headerIds.indexOf(selectedBreakdown), 0));
    }
  }, [selectedBreakdown, headerIds]);

  const mainTableColumns: InnerTableColumn[] = useMemo(() => {
    const source = getTransferRequestSource(wallets[0]);
    return [
      {
        header: 'Wallet',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        width: getWalletWidthForWallets(wallets),
        minWidth: getWalletWidthForWallets(wallets),
        hasBorderBottomOnCard: true,
      },
      {
        header: (
          <HeaderWithIcon
            description="1 Month Budget Cap"
            link={source.url || ''}
            mipNumber={source.code || ''}
            title={firstMonth.toFormat('MMMM') || ''}
            name={source.title || ''}
          />
        ),

        type: 'custom',
        align: 'right',
        hasBorderBottomOnCard: true,
      },
      {
        header: (
          <HeaderWithIcon
            description="1 Month Budget Cap"
            link={source.url}
            mipNumber={source.code}
            title={secondMonth.toFormat('MMMM')}
            name={source?.title}
          />
        ),

        type: 'custom',
        align: 'right',
        hasBorderBottomOnCard: true,
      },
      {
        header: (
          <HeaderWithIcon
            description="1 Month Budget Cap"
            link={source.url}
            mipNumber={source.code}
            title={thirdMonth.toFormat('MMMM')}
            name={source.title}
          />
        ),
        type: 'custom',
        align: 'right',
        hasBorderRight: true,
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Mthly Budget',
        type: 'number',
        align: 'right',
        hasBorderRight: true,
        hidden: true,
      },
      {
        header: (
          <HeaderWithIcon
            description="3 Month Budget Caps"
            link={source.url}
            mipNumber={source.code}
            title="Totals"
            name={source?.title}
          />
        ),
        type: 'custom',
        align: 'right',
      },
      {
        header: 'Qtly Budget',
        type: 'number',
        align: 'right',
        hidden: true,
      },
    ];
  }, [firstMonth, secondMonth, thirdMonth, wallets]);

  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (!budgetStatements || !budgetStatements.length) {
      return result;
    }

    let emptyWallets = 0;
    wallets.forEach((wallet, i) => {
      const firstMonthlyBudgetCap = getWalletMonthlyBudgetForeCast(wallet, firstMonth.toFormat(API_MONTH_TO_FORMAT));
      const secondMonthBudgetCap = getWalletMonthlyBudgetForeCast(wallet, secondMonth.toFormat(API_MONTH_TO_FORMAT));
      const thirdMonthBudgetCap = getWalletMonthlyBudgetForeCast(wallet, thirdMonth.toFormat(API_MONTH_TO_FORMAT));
      const totalMonthPerWallet = sumAllMonths([firstMonthlyBudgetCap, secondMonthBudgetCap, thirdMonthBudgetCap]);

      const numberCellData = [
        getForecastForMonthOnWalletOnBudgetStatementOrNA(budgetStatements, wallet?.address, currentMonth, firstMonth),
        getForecastForMonthOnWalletOnBudgetStatementOrNA(budgetStatements, wallet?.address, currentMonth, secondMonth),
        getForecastForMonthOnWalletOnBudgetStatementOrNA(budgetStatements, wallet?.address, currentMonth, thirdMonth),
        getBudgetCapForMonthOnWalletOnBudgetStatement(budgetStatements, wallet?.address, currentMonth, currentMonth),
        getForecastSumOfMonthsOnWalletForeCast(budgetStatements, wallet?.address, currentMonth, [
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
        // Hidden the header for wallet
        showHeader: result[i]?.items[0].column.header === 'Wallet',

        items: [
          {
            column: mainTableColumns[0],
            value: wallet,
          },
          {
            column: mainTableColumns[1],

            value: (
              <ProgressiveIndicator budgetCap={firstMonthlyBudgetCap} forecast={numberCellData[0]} month={firstMonth} />
            ),
          },
          {
            column: mainTableColumns[2],
            value: (
              <ProgressiveIndicator budgetCap={secondMonthBudgetCap} forecast={numberCellData[1]} month={secondMonth} />
            ),
          },
          {
            column: mainTableColumns[3],
            value: (
              <ProgressiveIndicator budgetCap={thirdMonthBudgetCap} forecast={numberCellData[2]} month={thirdMonth} />
            ),
          },
          {
            column: mainTableColumns[4],
            value: numberCellData[3],
          },
          {
            column: mainTableColumns[5],
            value: <ProgressiveIndicator budgetCap={totalMonthPerWallet} forecast={numberCellData[4]} />,
          },
          {
            column: mainTableColumns[6],
            value: numberCellData[5],
          },
        ],
      });
    });

    if (result.length === emptyWallets) {
      return [];
    }

    const totalFirstMonth = getForecastSumForMonth(budgetStatements, currentMonth, firstMonth);
    const totalSecondMonth = getForecastSumForMonth(budgetStatements, currentMonth, secondMonth);
    const totalThirdMonth = getForecastSumForMonth(budgetStatements, currentMonth, thirdMonth);
    const totalFirstMonthBudGetCap = getBudgetCapForMonthOnBudgetStatementForeCast(
      budgetStatements,
      currentMonth,
      firstMonth
    );
    const totalSecondMonthBudGetCap = getBudgetCapForMonthOnBudgetStatementForeCast(
      budgetStatements,
      currentMonth,
      secondMonth
    );
    const totalThirdMonthBudGetCap = getBudgetCapForMonthOnBudgetStatementForeCast(
      budgetStatements,
      currentMonth,
      thirdMonth
    );

    const TotalBudgetCap = sumAllMonths([
      totalFirstMonthBudGetCap,
      totalSecondMonthBudGetCap,
      totalThirdMonthBudGetCap,
    ]);

    if (result.length > 0) {
      result.push({
        type: 'total',
        showHeader: false,
        items: [
          {
            column: mainTableColumns[0],
            value: 'Total',
          },
          {
            column: mainTableColumns[1],
            value: (
              <ProgressiveIndicator
                budgetCap={totalFirstMonthBudGetCap === 'N/A' ? 'N/A' : totalFirstMonthBudGetCap}
                forecast={totalFirstMonth}
                isTotal
                month={firstMonth}
              />
            ),
          },
          {
            column: mainTableColumns[2],
            value: (
              <ProgressiveIndicator
                budgetCap={totalSecondMonthBudGetCap === 'N/A' ? 'N/A' : totalSecondMonthBudGetCap}
                forecast={totalSecondMonth}
                isTotal
                month={secondMonth}
              />
            ),
          },
          {
            column: mainTableColumns[3],
            value: (
              <ProgressiveIndicator
                budgetCap={totalThirdMonthBudGetCap === 'N/A' ? 'N/A' : totalThirdMonthBudGetCap}
                forecast={totalThirdMonth}
                isTotal
                month={thirdMonth}
              />
            ),
          },
          {
            column: mainTableColumns[4],
            value: getBudgetCapForMonthOnBudgetStatement(budgetStatements, currentMonth, currentMonth),
          },
          {
            column: mainTableColumns[5],
            value: (
              <ProgressiveIndicator
                isTotal
                budgetCap={TotalBudgetCap}
                forecast={getForecastSumForMonths(budgetStatements, currentMonth, [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ])}
              />
            ),
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
        // Hidden the total mobile when there is only one wallet
        hideMobile: result.length < 2,
      });

      return result;
    }
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
      result[wallet?.name] = replacePaymentTopup(
        getBreakdownItemsForWallet(
          budgetStatements,
          wallet,
          allBreakdownColumns[wallet.name],
          currentMonth,
          firstMonth,
          secondMonth,
          thirdMonth
        )
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

export const ContainerProgressiveIndicator = styled('div')(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end',
  [theme.breakpoints.up('tablet_768')]: {
    paddingRight: 8,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 0,
  },
}));
