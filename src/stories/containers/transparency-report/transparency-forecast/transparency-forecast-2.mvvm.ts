import { DateTime } from 'luxon';
import {
  BudgetStatementDto,
  BudgetStatementLineItemDto,
  BudgetStatementWalletDto,
} from '../../../../core/models/dto/core-unit.dto';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { capitalizeSentence, headerToId } from '../../../../core/utils/string.utils';
import { API_MONTH_FORMAT } from '../../../../core/utils/date.utils';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';
import {
  InnerTableColumn,
  InnerTableRow,
} from '../../../components/advanced-inner-table/advanced-inner-table';
import { renderLinks, renderWallet } from '../transparency-report.utils';

export const useTransparencyForecastMvvm2 = (
  currentMonth: DateTime,
  propBudgetStatements: BudgetStatementDto[]
) => {
  const firstMonth = useMemo(
    () => currentMonth.plus({ month: 1 }),
    [currentMonth]
  );
  const secondMonth = useMemo(
    () => currentMonth.plus({ month: 2 }),
    [currentMonth]
  );
  const thirdMonth = useMemo(
    () => currentMonth.plus({ month: 3 }),
    [currentMonth]
  );
  const [thirdIndex, setThirdIndex] = useState(0);

  const wallets: BudgetStatementWalletDto[] = useMemo(() => {
    const dict: { [id: string]: BudgetStatementWalletDto } = {};

    const budgetStatement = propBudgetStatements?.find(
      (bs) => bs.month === currentMonth.toFormat(API_MONTH_FORMAT)
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
  }, [currentMonth, propBudgetStatements]);

  const getForecastForMonthOnWalletOnBudgetStatement = (
    budgetStatements: BudgetStatementDto[],
    walletAddress: string | undefined,
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find(
        (x) => x.month === currentMonth.toFormat(API_MONTH_FORMAT)
      ) ?? null;

    if (!budgetStatement || !walletAddress) return 0;

    const wallet =
      budgetStatement?.budgetStatementWallet?.find(
        (x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()
      ) ?? null;

    if (!wallet) return 0;

    return _.sumBy(
      wallet?.budgetStatementLineItem.filter(
        (item) => item.month === month.toFormat(API_MONTH_FORMAT)
      ),
      (i) => i.forecast ?? 0
    );
  };

  const getBudgetCapForMonthOnWalletOnBudgetStatement = (
    budgetStatements: BudgetStatementDto[],
    walletAddress: string | undefined,
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find(
        (x) => x.month === currentMonth?.toFormat(API_MONTH_FORMAT)
      ) ?? null;

    if (!budgetStatement || !walletAddress) return 0;

    const wallet =
      budgetStatement?.budgetStatementWallet?.find(
        (x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()
      ) ?? null;

    if (!wallet) return 0;

    return _.sumBy(
      wallet?.budgetStatementLineItem.filter(
        (item) => item.month === month?.toFormat(API_MONTH_FORMAT)
      ),
      (i) => i.budgetCap ?? 0
    );
  };

  const getForecastSumOfMonthsOnWallet = (
    budgetStatements: BudgetStatementDto[],
    walletAddress: string | undefined,
    currentMonth: DateTime,
    months: DateTime[]
  ) => {
    let result = 0;

    if (!walletAddress) return result;

    months.forEach((month) => {
      result += getForecastForMonthOnWalletOnBudgetStatement(
        budgetStatements,
        walletAddress,
        currentMonth,
        month
      );
    });

    return result;
  };

  const getBudgetCapSumOfMonthsOnWallet = (
    budgetStatements: BudgetStatementDto[],
    walletAddress: string | undefined,
    currentMonth: DateTime,
    months: DateTime[]
  ) => {
    let result = 0;

    if (!walletAddress) return result;

    months.forEach((month) => {
      result += getBudgetCapForMonthOnWalletOnBudgetStatement(
        budgetStatements,
        walletAddress,
        currentMonth,
        month
      );
    });

    return result;
  };

  const getForecastSumForMonth = (
    budgetStatements: BudgetStatementDto[],
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find(
        (x) => x.month === currentMonth.toFormat(API_MONTH_FORMAT)
      ) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet?.budgetStatementLineItem?.filter(
          (item) => item.month === month.toFormat(API_MONTH_FORMAT)
        ),
        (item) => item.forecast ?? 0
      )
    );
  };

  const getForecastSumForMonths = (
    budgetStatements: BudgetStatementDto[],
    currentMonth: DateTime,
    months: DateTime[]
  ) => {
    let result = 0;

    months.forEach((month) => {
      result += getForecastSumForMonth(budgetStatements, currentMonth, month);
    });

    return result;
  };

  const getBudgetCapForMonthOnBudgetStatement = (
    budgetStatements: BudgetStatementDto[],
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find(
        (x) => x.month === currentMonth.toFormat(API_MONTH_FORMAT)
      ) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet?.budgetStatementLineItem?.filter(
          (item) => item.month === month.toFormat(API_MONTH_FORMAT)
        ),
        (item) => item.budgetCap ?? 0
      )
    );
  };

  const getTotalQuarterlyBudgetCapOnBudgetStatement = (
    budgetStatements: BudgetStatementDto[],
    months: DateTime[]
  ) => {
    let result = 0;

    wallets.forEach((wallet) => {
      result += getBudgetCapSumOfMonthsOnWallet(
        budgetStatements,
        wallet?.address?.toLowerCase() || '',
        currentMonth,
        months
      );
    });

    return result;
  };

  const breakdownTabs = useMemo(() => {
    if (!propBudgetStatements || propBudgetStatements.length === 0) return [];
    return wallets?.map((wallet) => wallet.name);
  }, [propBudgetStatements, currentMonth]);

  const getLineItemsForWalletOnMonth = (
    budgetStatements: BudgetStatementDto[],
    currentMonth: DateTime,
    month: DateTime,
    walletAddress: string
  ) => {
    const budgetStatement = budgetStatements?.find(
      (bs) => bs.month === currentMonth.toFormat(API_MONTH_FORMAT)
    );

    if (!budgetStatement) return [];

    return (
      budgetStatement.budgetStatementWallet
        ?.find(
          (wallet) =>
            wallet.address?.toLowerCase() === walletAddress?.toLowerCase()
        )
        ?.budgetStatementLineItem.filter(
          (item) => item.month === month.toFormat(API_MONTH_FORMAT)
        ) ?? []
    );
  };

  const getLineItemForecastSumForMonth = (
    items: BudgetStatementLineItemDto[],
    month: DateTime
  ) => {
    return _.sumBy(
      items.filter((item) => item.month === month.toFormat(API_MONTH_FORMAT)),
      (item) => item.forecast ?? 0
    );
  };

  const getLineItemForecastSumForMonths = (
    items: BudgetStatementLineItemDto[],
    months: DateTime[]
  ) => {
    const formattedMonths = months.map((x) => x.toFormat(API_MONTH_FORMAT));
    return _.sumBy(
      items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
      (item) => item.forecast ?? 0
    );
  };

  const getBudgetCapForMonthOnLineItem = (
    items: BudgetStatementLineItemDto[],
    month: DateTime
  ) => {
    return _.sumBy(
      items.filter((item) => item.month === month.toFormat(API_MONTH_FORMAT)),
      (item) => item.budgetCap ?? 0
    );
  };

  const getTotalQuarterlyBudgetCapOnLineItem = (
    items: BudgetStatementLineItemDto[],
    months: DateTime[]
  ) => {
    const formattedMonths = months.map((x) => x.toFormat(API_MONTH_FORMAT));
    return _.sumBy(
      items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
      (item) => item.budgetCap ?? 0
    );
  };

  const [headerIds, setHeaderIds] = useState<string[]>([]);
  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header) => headerToId(header)));
  }, [breakdownTabs]);

  const anchor = useUrlAnchor();
  const breakdownTitleRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

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

  useEffect(() => {
    if (anchor && !_.isEmpty(headerIds)) {
      setThirdIndex(Math.max(headerIds.indexOf(anchor), 0));
    }
  }, [anchor, headerIds]);

  const hasGroups = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return currentWallet?.budgetStatementLineItem?.some(
      (item) => item.group && item.actual
    );
  }, [thirdIndex]);

  const breakdownHeaders = useMemo(() => {
    return [
      ...(hasGroups ? ['Group'] : []),
      'Budget Category',
      firstMonth.toFormat('MMMM'),
      secondMonth.toFormat('MMMM'),
      thirdMonth.toFormat('MMMM'),
      '3 Months',
      'Mthly Budget',
      'Qtly Budget',
    ];
  }, [currentMonth, propBudgetStatements, hasGroups]);

  const mainTableColumns: InnerTableColumn[] = useMemo(() => {
    return [
      {
        header: 'Wallet',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        minWidth: '180px',
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
        header: '3 Months',
        type: 'number',
        align: 'right',
      },
      {
        header: 'Mthly Budget',
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
        cellRender: renderLinks
      },
    ];
  }, [currentMonth]);

  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (!propBudgetStatements || !propBudgetStatements.length) {
      return result;
    }

    let emptyWallets = 0;

    wallets.forEach((wallet, i) => {
      const numberCellData = [
        getForecastForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          firstMonth
        ),
        getForecastForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          secondMonth
        ),
        getForecastForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          thirdMonth
        ),
        getForecastSumOfMonthsOnWallet(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          [firstMonth, secondMonth, thirdMonth]
        ),
        getBudgetCapForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          currentMonth
        ),
        getBudgetCapSumOfMonthsOnWallet(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          [firstMonth, secondMonth, thirdMonth]
        ),
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
          value: getForecastSumForMonth(
            propBudgetStatements,
            currentMonth,
            firstMonth
          ),
        },
        {
          column: mainTableColumns[2],
          value: getForecastSumForMonth(
            propBudgetStatements,
            currentMonth,
            secondMonth
          ),
        },
        {
          column: mainTableColumns[3],
          value: getForecastSumForMonth(
            propBudgetStatements,
            currentMonth,
            thirdMonth
          ),
        },
        {
          column: mainTableColumns[4],
          value: getForecastSumForMonths(propBudgetStatements, currentMonth, [
            firstMonth,
            secondMonth,
            thirdMonth,
          ]),
        },
        {
          column: mainTableColumns[5],
          value: getBudgetCapForMonthOnBudgetStatement(
            propBudgetStatements,
            currentMonth,
            currentMonth
          )
        },
        {
          column: mainTableColumns[6],
          value: getTotalQuarterlyBudgetCapOnBudgetStatement(
            propBudgetStatements,
            [firstMonth, secondMonth, thirdMonth]
          )
        }
      ],
    });

    return result;
  }, [propBudgetStatements, currentMonth]);

  return {
    mainTableItems,
    mainTableColumns,
    breakdownTitleRef,
  };
};
