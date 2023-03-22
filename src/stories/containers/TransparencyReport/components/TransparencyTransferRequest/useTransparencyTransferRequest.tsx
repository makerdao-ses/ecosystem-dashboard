import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import { formatNumber } from '@ses/core/utils/string';
import { DateTime } from 'luxon';
import { useCallback, useMemo } from 'react';
import { renderLinks, RenderNumberWithIcon, renderWallet, TotalTargetBalance } from '../../transparencyReportUtils';
import { useTransparencyForecast } from '../TransparencyForecast/useTransparencyForecast';
import type { InnerTableColumn, InnerTableRow } from '@ses/components/AdvancedInnerTable/AdvancedInnerTable';
import type {
  BudgetStatementDto,
  BudgetStatementWalletDto,
  BudgetStatementWalletTransferRequestDto,
} from '@ses/core/models/dto/coreUnitDTO';
import type { TargetBalanceTooltipInformation } from '@ses/core/utils/typesHelpers';

export const useTransparencyTransferRequest = (currentMonth: DateTime, budgetStatements: BudgetStatementDto[]) => {
  const { wallets } = useTransparencyForecast(currentMonth, budgetStatements);

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

  const getTransferRequestTargetBalanceColumn = useCallback((wallet: BudgetStatementWalletDto) => {
    const targetWithTimeSpan: Pick<BudgetStatementWalletTransferRequestDto, 'target' | 'walletBalanceTimeStamp'> =
      {} as BudgetStatementWalletTransferRequestDto;
    wallet.budgetStatementTransferRequest?.forEach((item: BudgetStatementWalletTransferRequestDto) => {
      targetWithTimeSpan.target = item.target;
      targetWithTimeSpan.walletBalanceTimeStamp = item.walletBalanceTimeStamp;
    });

    return targetWithTimeSpan;
  }, []);

  const getWalletBalanceTimeStamp = useCallback(() => {
    if (!wallets || !wallets[0].budgetStatementTransferRequest) return '';
    const timeStampAnyWallet = wallets[0]?.budgetStatementTransferRequest[0]?.walletBalanceTimeStamp;

    if (!DateTime.fromISO(timeStampAnyWallet).isValid) {
      return '';
    }

    const dateTime = DateTime.fromISO(timeStampAnyWallet);
    const formatData = dateTime.toFormat('dd-LLL');

    return formatData;
  }, [wallets]);

  const getTransferRequestTargetBalanceColumnTotal = useMemo(() => {
    let result = 0;
    if (!wallets) return result;

    wallets.forEach((wallet: BudgetStatementWalletDto) => {
      wallet.budgetStatementTransferRequest?.forEach((item: BudgetStatementWalletTransferRequestDto) => {
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
        cellRender: RenderNumberWithIcon,
      },
      {
        header: `${getWalletBalanceTimeStamp()} Balance`,
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
  }, [getWalletBalanceTimeStamp]);

  const mainTableItems: InnerTableRow[] = useMemo(() => {
    const result: InnerTableRow[] = [];

    wallets.forEach((wallet: BudgetStatementWalletDto) => {
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
              balance: getTransferRequestTargetBalanceColumn(wallet).target?.amount || 0,
              months: getTransferRequestTargetBalanceColumn(wallet).target?.calculation || '',
              link: getTransferRequestTargetBalanceColumn(wallet).target?.source.url || '',
              description: getTransferRequestTargetBalanceColumn(wallet).target?.description || '',
              name: getTransferRequestTargetBalanceColumn(wallet).target?.source.title || '',
              mipNumber: getTransferRequestTargetBalanceColumn(wallet).target?.source.code || '',
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
              <TotalTargetBalance hasMarginRight={true}>
                {formatNumber(getTransferRequestTargetBalanceColumnTotal)}
              </TotalTargetBalance>
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
    getTransferRequestTargetBalanceColumn,
    getCurrentBalanceForMonthOnWallet,
    getTransferRequestForMonthOnWallet,
    getTransferRequestTargetBalanceColumnTotal,
    getCurrentBalanceForMonth,
    getTransferRequestForMonth,
  ]);

  return {
    mainTableColumns,
    mainTableItems,
  };
};
