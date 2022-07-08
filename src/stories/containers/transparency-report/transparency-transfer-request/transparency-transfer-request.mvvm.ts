import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';
import { API_MONTH_FORMAT } from '../../../../core/utils/date.utils';
import { useMemo } from 'react';

export const useTransparencyTransferRequestMvvm = (currentMonth: DateTime, budgetStatements: BudgetStatementDto[]) => {
  const getTransferRequestForMonthOnWallet = (walletAddress: string | undefined) => {
    if (!walletAddress) return 0;

    let result = 0;
    const budgetStatement = budgetStatements.find(x => x.month === currentMonth.toFormat(API_MONTH_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return result;

    const wallet = budgetStatement.budgetStatementWallet.find(wallet => wallet.address?.toLowerCase() === walletAddress.toLowerCase());

    if (!wallet) return result;

    wallet.budgetStatementTransferRequest?.forEach(item => {
      result += item.requestAmount;
    });

    return result;
  };

  const getTransferRequestForMonth = useMemo(() => {
    let result = 0;
    const budgetStatement = budgetStatements.find(x => x.month === currentMonth.toFormat(API_MONTH_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return result;

    budgetStatement.budgetStatementWallet.forEach(wallet => {
      wallet.budgetStatementTransferRequest?.forEach(item => {
        result += item.requestAmount;
      });
    });

    return result;
  }, [currentMonth, budgetStatements]);

  const getCurrentBalanceForMonthOnWallet = (walletAddress: string | undefined) => {
    if (!walletAddress) return 0;

    const budgetStatement = budgetStatements.find(x => x.month === currentMonth.toFormat(API_MONTH_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return 0;

    const wallet = budgetStatement.budgetStatementWallet.find(wallet => wallet.address?.toLowerCase() === walletAddress.toLowerCase());

    if (!wallet) return 0;

    return wallet.currentBalance ?? 0;
  };

  const getCurrentBalanceForMonth = useMemo(() => {
    let result = 0;

    const budgetStatement = budgetStatements.find(x => x.month === currentMonth.toFormat(API_MONTH_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return 0;

    budgetStatement.budgetStatementWallet?.forEach(wallet => {
      result += wallet?.currentBalance ?? 0;
    });

    return result;
  }, [currentMonth, budgetStatements]);

  return {
    getCurrentBalanceForMonthOnWallet,
    getTransferRequestForMonth,
    getTransferRequestForMonthOnWallet,
    getCurrentBalanceForMonth
  };
};
