import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { DateTime } from 'luxon';
import { capitalizeSentence } from '../../../../core/utils/string.utils';
import { API_MONTH_FORMAT } from '../../../../core/utils/date.utils';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';
import { InnerTableColumn } from '../../../components/advanced-inner-table/advanced-inner-table';

export const useTransparencyActualsMvvm2 = (propsCurrentMonth: DateTime, budgetStatements: BudgetStatementDto[] | undefined, code: string) => {
  const currentMonth = useMemo(() => propsCurrentMonth.toFormat(API_MONTH_FORMAT), [propsCurrentMonth]);

  const wallets: BudgetStatementWalletDto[] = useMemo(() => {
    const dict: {[id: string]: BudgetStatementWalletDto} = {};

    const budgetStatement = budgetStatements?.find(bs => bs.month === propsCurrentMonth.toFormat(API_MONTH_FORMAT));

    if (!budgetStatement || !budgetStatement.budgetStatementWallet) return [];

    budgetStatement.budgetStatementWallet.forEach(wallet => {
      if (wallet.address) {
        if (!dict[wallet.address.toLowerCase()]) {
          wallet.name = capitalizeSentence(wallet.name);
          dict[wallet.address.toLowerCase()] = wallet;
        }
      }
    });

    return _.sortBy(Object.values(dict), 'id');
  }, [propsCurrentMonth, budgetStatements, code]);

  const getWalletForecast = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === currentMonth), i => i.forecast ?? 0);
  };

  const getWalletActual = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === currentMonth), i => i.actual ?? 0);
  };

  const getWalletPayment = (wallet: BudgetStatementWalletDto) => {
    return _.sumBy(wallet?.budgetStatementLineItem.filter(item => item.month === currentMonth), i => i.payment ?? 0);
  };

  const getWalletDifference = (wallet: BudgetStatementWalletDto) => {
    return (getWalletForecast(wallet) - getWalletActual(wallet));
  };

  const currentBudgetStatement = useMemo(() => {
    return budgetStatements?.find(x => x.month === currentMonth) ?? null;
  }, [propsCurrentMonth, code, budgetStatements]);

  const breakdownTabs = useMemo(() => {
    return wallets.map(wallet => wallet.name);
  }, [currentBudgetStatement, code]);

  const budgetTotalForecast = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet.budgetStatementLineItem.filter(item => item.month === currentMonth), item => item?.forecast ?? 0));
  }, [currentBudgetStatement, code]);

  const budgetTotalActual = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet.budgetStatementLineItem.filter(item => item.month === currentMonth), item => item?.actual ?? 0));
  }, [currentBudgetStatement, code]);

  const budgetTotalPayment = useMemo(() => {
    return _.sumBy(currentBudgetStatement?.budgetStatementWallet, wallet => _.sumBy(wallet.budgetStatementLineItem.filter(item => item.month === currentMonth), item => item?.payment ?? 0));
  }, [currentBudgetStatement, code]);

  const budgetTotalDifference = useMemo(() => {
    return budgetTotalForecast - budgetTotalActual;
  }, [currentBudgetStatement, code]);

  const getGroupForecast = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(group.filter(item => item.month === currentMonth), item => item.forecast ?? 0);
  };

  const getGroupActual = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(group.filter(item => item.month === currentMonth), item => item.actual ?? 0);
  };

  const getGroupDifference = (group: BudgetStatementLineItemDto[]) => {
    return getGroupForecast(group) - getGroupActual(group);
  };

  const getCommentsFromCategory = (group: BudgetStatementLineItemDto[]) => {
    return group.filter(item => item.month === currentMonth).reduce((current, next) => `${current} ${next.comments}`, '');
  };

  const getGroupPayment = (group: BudgetStatementLineItemDto[]) => {
    return _.sumBy(group.filter(item => item.month === currentMonth), item => item.payment ?? 0);
  };

  const [headerIds, setHeaderIds] = useState<string[]>([]);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const anchor = useUrlAnchor();

  const thirdIndex = useMemo(() => {
    return Math.max(headerIds?.indexOf(anchor ?? ''), 0);
  }, [headerIds, anchor]);

  const currentWallet = useMemo(
    () => wallets[thirdIndex],
    [thirdIndex, wallets]
  );

  const hasGroups = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return currentWallet?.budgetStatementLineItem?.some((item) => {
      return item.group && item.actual;
    });
  }, [thirdIndex, currentBudgetStatement]);

  const headerToId = (header: string): string => {
    const id = header.toLowerCase().trim().replaceAll(/ /g, '-');
    return `actuals-${id}`;
  };
  const breakdownTitleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header: string) => headerToId(header)));
  }, [breakdownTabs]);

  useEffect(() => {
    if (
      !scrolled &&
      anchor &&
      !_.isEmpty(headerIds) &&
      headerIds.includes(anchor)
    ) {
      setScrolled(true);
      let offset = (breakdownTitleRef?.current?.offsetTop || 0) - 260;
      const windowsWidth = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      if (windowsWidth < 834) {
        offset += 90;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor, headerIds]);

  const mainTableItems = useMemo(() => {
    return [];
  }, []);

  const mainTableColumns: InnerTableColumn[] = [
    {
      header: 'Budget',
      align: 'left',
      type: 'text',
    },
    {
      header: 'Forecast',
      align: 'left',
      type: 'number',
    },
    {
      header: 'Actuals',
      align: 'left',
      type: 'number',
    },
    {
      header: 'Difference',
      align: 'left',
      type: 'number',
    },
    {
      header: 'Payments',
      align: 'left',
      type: 'number',
    },
    {
      header: 'External Links',
      align: 'left',
      type: 'text',
    },
  ];

  return {
    headerIds,
    thirdIndex,
    breakdownTitleRef,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
    wallets,
  };
};
