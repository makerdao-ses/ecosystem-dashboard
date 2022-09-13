import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';
import { API_MONTH_FORMAT } from '../../../../core/utils/date.utils';
import { useMemo } from 'react';
import { useTransparencyForecastMvvm2 } from '../transparency-forecast/transparency-forecast-2.mvvm';
import { InnerTableColumn, InnerTableRow } from '../../../components/advanced-inner-table/advanced-inner-table';
import { renderLinks, renderWallet } from '../transparency-report.utils';

export const useTransparencyTransferRequestMvvm2 = (
  currentMonth: DateTime,
  budgetStatements: BudgetStatementDto[]
) => {
  const {
    firstMonth,
    secondMonth,
    thirdMonth,
    getForecastSumOfMonthsOnWallet,
    getForecastSumForMonths,
    wallets,
  } = useTransparencyForecastMvvm2(currentMonth, budgetStatements);

  const getTransferRequestForMonthOnWallet = (
    walletAddress: string | undefined
  ) => {
    if (!walletAddress) return 0;

    let result = 0;
    const budgetStatement = budgetStatements?.find(
      (x) => x.month === currentMonth.toFormat(API_MONTH_FORMAT)
    );

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) { return result; }

    const wallet = budgetStatement.budgetStatementWallet.find(
      (wallet) => wallet.address?.toLowerCase() === walletAddress.toLowerCase()
    );

    if (!wallet) return result;

    wallet.budgetStatementTransferRequest?.forEach((item) => {
      result += item.requestAmount;
    });

    return result;
  };

  const getTransferRequestForMonth = useMemo(() => {
    let result = 0;
    const budgetStatement = budgetStatements?.find(
      (x) => x.month === currentMonth.toFormat(API_MONTH_FORMAT)
    );

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) { return result; }

    budgetStatement.budgetStatementWallet.forEach((wallet) => {
      wallet.budgetStatementTransferRequest?.forEach((item) => {
        result += item.requestAmount;
      });
    });

    return result;
  }, [currentMonth, budgetStatements]);

  const getCurrentBalanceForMonthOnWallet = (
    walletAddress: string | undefined
  ) => {
    if (!walletAddress) return 0;

    const budgetStatement = budgetStatements?.find(
      (x) => x.month === currentMonth.toFormat(API_MONTH_FORMAT)
    );

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return 0;

    const wallet = budgetStatement.budgetStatementWallet.find(
      (wallet) => wallet.address?.toLowerCase() === walletAddress.toLowerCase()
    );

    if (!wallet) return 0;

    return wallet.currentBalance ?? 0;
  };

  const getCurrentBalanceForMonth = useMemo(() => {
    let result = 0;

    const budgetStatement = budgetStatements?.find(
      (x) => x.month === currentMonth.toFormat(API_MONTH_FORMAT)
    );

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return 0;

    budgetStatement.budgetStatementWallet?.forEach((wallet) => {
      result += wallet?.currentBalance ?? 0;
    });

    return result;
  }, [currentMonth, budgetStatements]);

  const mainTableColumns: InnerTableColumn[] = [
    {
      header: 'Wallet',
      type: 'custom',
      width: '240px',
      cellRender: renderWallet,
      isCardHeader: true,
    },
    {
      header: '3 Month Forecast',
      type: 'number',
      align: 'right',
    },
    {
      header: 'Current Balance',
      type: 'number',
      align: 'right',
    },
    {
      header: 'Transfer Request',
      type: 'number',
      align: 'right',
    },
    {
      header: 'External Links',
      type: 'custom',
      width: '240px',
      cellRender: renderLinks,
      isCardFooter: true,
    }
  ];

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
            value: getForecastSumOfMonthsOnWallet(
              budgetStatements,
              wallet?.address,
              currentMonth,
              [firstMonth, secondMonth, thirdMonth]
            )
          },
          {
            column: mainTableColumns[2],
            value: getCurrentBalanceForMonthOnWallet(wallet?.address)
          }, {
            column: mainTableColumns[3],
            value: getTransferRequestForMonthOnWallet(wallet?.address)
          },
          {
            column: mainTableColumns[4],
            value: wallet.address
          }
        ]
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
            value: getForecastSumForMonths(
              budgetStatements,
              currentMonth,
              [firstMonth, secondMonth, thirdMonth]
            )
          },
          {
            column: mainTableColumns[2],
            value: getCurrentBalanceForMonth
          }, {
            column: mainTableColumns[3],
            value: getTransferRequestForMonth
          }
        ]
      });
    }

    return result;
  }, [currentMonth, budgetStatements]);

  return {
    mainTableColumns,
    mainTableItems
  };
};
