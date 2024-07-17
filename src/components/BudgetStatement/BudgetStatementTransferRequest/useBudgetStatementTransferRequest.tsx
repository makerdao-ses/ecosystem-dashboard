import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { formatNumber } from '@ses/core/utils/string';
import { DateTime } from 'luxon';
import { useCallback, useMemo } from 'react';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import { TotalTargetBalance, renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import { useBudgetStatementForecast } from '../BudgetStatementForecast/useBudgetStatementForecast';
import { TargetValueThreeMoths } from './components/TargetValueThreeMoths/TargetValueThreeMoths';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type {
  BudgetStatementTransferRequest,
  BudgetStatementWallet,
} from '@ses/core/models/interfaces/budgetStatementWallet';

export const useTransparencyTransferRequest = (
  currentMonth: DateTime,
  budgetStatements: BudgetStatement[] | undefined
) => {
  const { wallets } = useBudgetStatementForecast(currentMonth, budgetStatements);

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

  const getTransferRequestTargetBalanceColumn = useCallback((wallet: BudgetStatementWallet) => {
    const targetWithTimeSpan: Pick<BudgetStatementTransferRequest, 'target' | 'walletBalanceTimeStamp'> =
      {} as BudgetStatementTransferRequest;

    const lastIndex = (wallet.budgetStatementTransferRequest ?? []).length - 1;
    if (wallet.budgetStatementTransferRequest && wallet.budgetStatementTransferRequest.length > 0) {
      targetWithTimeSpan.target = wallet.budgetStatementTransferRequest[lastIndex].target;
      targetWithTimeSpan.walletBalanceTimeStamp =
        wallet.budgetStatementTransferRequest[lastIndex]?.walletBalanceTimeStamp;
    }

    return targetWithTimeSpan;
  }, []);

  const getWalletBalanceTimeStamp = useCallback(() => {
    if (!wallets || !wallets[0]?.budgetStatementTransferRequest) return '';
    const timeStampAnyWallet = wallets[0]?.budgetStatementTransferRequest[0]?.walletBalanceTimeStamp;

    if (!DateTime.fromISO(timeStampAnyWallet).isValid) {
      return '';
    }

    const dateTime = DateTime.fromISO(timeStampAnyWallet);
    const formatData = dateTime.toFormat('dd - LLL');

    return formatData;
  }, [wallets]);

  const transferRequestTargetBalanceColumnTotal = useMemo(() => {
    let result = 0;
    if (!wallets) return result;

    wallets.forEach((wallet: BudgetStatementWallet) => {
      wallet.budgetStatementTransferRequest?.forEach((item: BudgetStatementTransferRequest) => {
        result += item.target.amount || 0;
      });
    });

    return result;
  }, [wallets]);

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
        align: 'right',
      },
      {
        header: `${getWalletBalanceTimeStamp()}  Balance`,
        type: 'number',
        align: 'right',
      },
      {
        header: 'Transfer Request',
        type: 'number',
        align: 'right',
      },
    ];
    return mainTableColumns;
  }, [getWalletBalanceTimeStamp]);

  const mainTableItems: InnerTableRow[] = useMemo(() => {
    const result: InnerTableRow[] = [];

    wallets.forEach((wallet) => {
      const { target } = getTransferRequestTargetBalanceColumn(wallet);
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
              <TargetValueThreeMoths
                balance={target?.amount || 0}
                months={target?.calculation || ''}
                link={target?.source.url || ''}
                description={target?.description || ''}
                name={target?.source.title || ''}
                mipNumber={target?.source.code || ''}
              />
            ),
          },
          {
            column: mainTableColumns[2],
            value: getCurrentBalanceForMonthOnWallet(wallet?.address),
          },
          {
            column: mainTableColumns[3],
            value: getTransferRequestForMonthOnWallet(wallet?.address),
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
            value: <TotalTargetBalance>{formatNumber(transferRequestTargetBalanceColumnTotal)}</TotalTargetBalance>,
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
    getTransferRequestTargetBalanceColumn,
    getCurrentBalanceForMonthOnWallet,
    getTransferRequestForMonthOnWallet,
    transferRequestTargetBalanceColumnTotal,
    getCurrentBalanceForMonth,
    getTransferRequestForMonth,
  ]);

  return {
    mainTableColumns,
    mainTableItems,
  };
};
