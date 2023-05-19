import styled from '@emotion/styled';
import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { capitalizeSentence, getWalletWidthForWallets, toKebabCase } from '@ses/core/utils/string';
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { renderWallet } from '../../transparencyReportUtils';
import {
  getBudgetCapForMonthOnBudgetStatement,
  getBudgetCapForMonthOnWalletOnBudgetStatement,
  getBudgetCapSumOfMonthsOnWallet,
  getForecastForMonthOnWalletOnBudgetStatement,
  getForecastSumForMonth,
  getForecastSumForMonths,
  getForecastSumOfMonthsOnWallet,
  getTotalQuarterlyBudgetCapOnBudgetStatement,
  getWalletMonthlyBudget,
} from '../../utils/budgetStatementsUtils';

import { FORECAST_BREAKDOWN_QUERY_PARAM } from '../../utils/constants';
import { getTransferRequestSource } from '../../utils/forecastHelper';
import { getBreakdownItemsForWallet, getForecastBreakdownColumns } from '../../utils/forecastTableHelpers';
import HeaderWithIcon from '../HeaderWithIcon/HeaderWithIcon';
import ProgressiveIndicator from './ProgresiveIndicator';
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
      },
      {
        header: (
          <HeaderWithIcon
            description="1 Month Budget Cap"
            link={source.url}
            mipNumber={source.code}
            title={secondMonth.toFormat('MMMM')}
            name={source.title}
          />
        ),
        type: 'custom',
        align: 'right',
        hasBorderRight: true,
      },
      {
        header: 'Mthly Budget',
        type: 'number',
        align: 'right',
        hasBorderRight: true,
        hasBorderBottomOnCard: true,
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
  }, [firstMonth, secondMonth, wallets]);

  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (!budgetStatements || !budgetStatements.length) {
      return result;
    }

    let emptyWallets = 0;
    wallets.forEach((wallet) => {
      const firstMonthlyBudgetCap = getWalletMonthlyBudget(wallet, firstMonth.toFormat(API_MONTH_TO_FORMAT));
      const secondMonthBudgetCap = getWalletMonthlyBudget(wallet, secondMonth.toFormat(API_MONTH_TO_FORMAT));
      const thirdMonthBudgetCap = getWalletMonthlyBudget(wallet, thirdMonth.toFormat(API_MONTH_TO_FORMAT));
      const totalMonthPerWallet = firstMonthlyBudgetCap + secondMonthBudgetCap + thirdMonthBudgetCap;
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

            value: (
              <ContainerProgressiveIndicator>
                <ProgressiveIndicator
                  budgetCap={firstMonthlyBudgetCap}
                  forecast={numberCellData[0]}
                  month={firstMonth}
                />
              </ContainerProgressiveIndicator>
            ),
          },
          {
            column: mainTableColumns[2],
            value: (
              <ContainerProgressiveIndicator>
                <ProgressiveIndicator
                  budgetCap={secondMonthBudgetCap}
                  forecast={numberCellData[1]}
                  month={secondMonth}
                />
              </ContainerProgressiveIndicator>
            ),
          },
          {
            column: mainTableColumns[3],
            value: (
              <ContainerProgressiveIndicator>
                <ProgressiveIndicator budgetCap={thirdMonthBudgetCap} forecast={numberCellData[2]} month={thirdMonth} />
              </ContainerProgressiveIndicator>
            ),
          },
          {
            column: mainTableColumns[4],
            value: numberCellData[3],
          },
          {
            column: mainTableColumns[5],
            value: (
              <ContainerProgressiveIndicator>
                <ProgressiveIndicator budgetCap={totalMonthPerWallet} forecast={numberCellData[4]} />
              </ContainerProgressiveIndicator>
            ),
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
    result.push({
      type: 'total',
      items: [
        {
          column: mainTableColumns[0],
          value: 'Total',
        },
        {
          column: mainTableColumns[1],
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                budgetCap={getBudgetCapForMonthOnBudgetStatement(budgetStatements, currentMonth, firstMonth)}
                forecast={totalFirstMonth}
                isTotal
                month={firstMonth}
              />
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: mainTableColumns[2],
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                budgetCap={getBudgetCapForMonthOnBudgetStatement(budgetStatements, currentMonth, secondMonth)}
                forecast={totalSecondMonth}
                isTotal
                month={secondMonth}
              />
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: mainTableColumns[3],
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                budgetCap={getBudgetCapForMonthOnBudgetStatement(budgetStatements, currentMonth, thirdMonth)}
                forecast={totalThirdMonth}
                isTotal
                month={thirdMonth}
              />
            </ContainerProgressiveIndicator>
          ),
        },
        {
          column: mainTableColumns[4],
          value: getBudgetCapForMonthOnBudgetStatement(budgetStatements, currentMonth, currentMonth),
        },
        {
          column: mainTableColumns[5],
          value: (
            <ContainerProgressiveIndicator>
              <ProgressiveIndicator
                isTotal
                budgetCap={getTotalQuarterlyBudgetCapOnBudgetStatement(
                  budgetStatements,
                  [firstMonth, secondMonth, thirdMonth],
                  wallets,
                  currentMonth
                )}
                forecast={getForecastSumForMonths(budgetStatements, currentMonth, [
                  firstMonth,
                  secondMonth,
                  thirdMonth,
                ])}
              />
            </ContainerProgressiveIndicator>
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
      hideMobile: false,
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

export const ContainerProgressiveIndicator = styled.div({
  display: 'flex',
  flex: 1,
  paddingRight: 16,
  flexDirection: 'row',
  justifyContent: 'flex-end',
});
