import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { formatNumber } from '@ses/core/utils/string';
import { useMemo } from 'react';
import { renderLinks, renderNumberWithIcon, renderWallet } from '../../transparencyReportUtils';
import { useTransparencyForecast } from '../TransparencyForecast/useTransparencyForecast';
import type { InnerTableColumn, InnerTableRow } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type { BudgetStatementDto } from '@ses/core/models/dto/coreUnitDTO';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

export const useTransparencyTransferRequest = (currentMonth: DateTime, budgetStatements: BudgetStatementDto[]) => {
  const { firstMonth, secondMonth, thirdMonth, getForecastSumOfMonthsOnWallet, getForecastSumForMonths, wallets } =
    useTransparencyForecast(currentMonth, budgetStatements);

  const getTransferRequestForMonthOnWallet = useMemo(() => {
    const getTransferRequestForMonthOnWalletFunction = (walletAddress: string | undefined) => {
      if (!walletAddress) return 0;

      let result = 0;
      const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

      if (!budgetStatement || !budgetStatement.budgetStatementWallet) {
        return result;
      }

      const wallet = budgetStatement.budgetStatementWallet.find(
        (wallet) => wallet.address?.toLowerCase() === walletAddress.toLowerCase()
      );

      if (!wallet) return result;

      wallet.budgetStatementTransferRequest?.forEach((item) => {
        result += item.requestAmount;
      });

      return result;
    };
    return getTransferRequestForMonthOnWalletFunction;
  }, [budgetStatements, currentMonth]);

  const getTransferRequestForMonth = useMemo(() => {
    let result = 0;
    const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) {
      return result;
    }

    budgetStatement.budgetStatementWallet.forEach((wallet) => {
      wallet.budgetStatementTransferRequest?.forEach((item) => {
        result += item.requestAmount;
      });
    });

    return result;
  }, [currentMonth, budgetStatements]);

  const getCurrentBalanceForMonthOnWallet = useMemo(() => {
    const getCurrentBalanceForMonthOnWallet = (walletAddress: string | undefined) => {
      if (!walletAddress) return 0;

      const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

      if (!budgetStatement || !budgetStatement.budgetStatementWallet) return 0;

      const wallet = budgetStatement.budgetStatementWallet.find(
        (wallet) => wallet.address?.toLowerCase() === walletAddress.toLowerCase()
      );

      if (!wallet || !wallet.budgetStatementTransferRequest) return 0;

      return wallet?.budgetStatementTransferRequest[0]?.walletBalance ?? 0;
    };
    return getCurrentBalanceForMonthOnWallet;
  }, [budgetStatements, currentMonth]);

  const getCurrentBalanceForMonth = useMemo(() => {
    let result = 0;

    const budgetStatement = budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return 0;

    budgetStatement?.budgetStatementWallet?.forEach((wallet) => {
      if (!wallet || !wallet.budgetStatementTransferRequest) return 0;
      result += wallet?.budgetStatementTransferRequest[0]?.walletBalance ?? 0;
    });

    return result;
  }, [currentMonth, budgetStatements]);

  const mainTableColumns = useMemo(() => {
    const mainTableColumns: InnerTableColumn[] = [
      {
        header: 'Wallet',
        type: 'custom',
        width: '240px',
        minWidth: '240px',
        cellRender: renderWallet,
        isCardHeader: true,
      },
      {
        header: 'Target Balance',
        type: 'custom',
        align: 'left',

        cellRender: renderNumberWithIcon,
      },
      {
        header: `${currentMonth.toFormat('dd-LLL')} Balance`,
        type: 'number',
        align: 'right',
      },
      {
        header: 'Transfer Request',
        type: 'number',
        align: 'right',
      },
      {
        header: 'multi-sig address',
        type: 'custom',
        width: '240px',
        cellRender: renderLinks,
        isCardFooter: true,
      },
    ];
    return mainTableColumns;
  }, [currentMonth]);

  const mainTableItems: InnerTableRow[] = useMemo(() => {
    const result: InnerTableRow[] = [];

    wallets.forEach((wallet) => {
      result.push({
        type: 'normal',
        items: [
          {
            column: mainTableColumns[0],
            value: wallet,
          },
          {
            column: mainTableColumns[1],
            value: {
              balance: getForecastSumOfMonthsOnWallet(budgetStatements, wallet?.address, currentMonth, [
                firstMonth,
                secondMonth,
                thirdMonth,
              ]),
              months: 'FEB + MAR Budget Cap',
              mipNumber: 'MIP40c3-SP14:',
              link: '#',
              description: '2 Month Budget Cap',
              longCode: 'SES-001',
              name: 'Sustainable Ecosystem Scaling',
            } as TargetBalanceTooltipInformation,
          },
          {
            column: mainTableColumns[2],
            value: getCurrentBalanceForMonthOnWallet(wallet?.address),
          },
          {
            column: mainTableColumns[3],
            value: getTransferRequestForMonthOnWallet(wallet?.address),
          },
          {
            column: mainTableColumns[4],
            value: wallet.address,
          },
        ],
      });
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

            value: (
              <b>
                {formatNumber(
                  getForecastSumForMonths(budgetStatements, currentMonth, [firstMonth, secondMonth, thirdMonth])
                )}
              </b>
            ),
          },
          {
            column: mainTableColumns[2],
            value: getCurrentBalanceForMonth,
          },
          {
            column: mainTableColumns[3],
            value: getTransferRequestForMonth,
          },
        ],
        hideMobile: result.length < 2,
      });
    }

    return result;
  }, [
    wallets,
    mainTableColumns,
    getForecastSumOfMonthsOnWallet,
    budgetStatements,
    currentMonth,
    firstMonth,
    secondMonth,
    thirdMonth,
    getCurrentBalanceForMonthOnWallet,
    getTransferRequestForMonthOnWallet,
    getForecastSumForMonths,
    getCurrentBalanceForMonth,
    getTransferRequestForMonth,
  ]);

  return {
    mainTableColumns,
    mainTableItems,
  };
};
