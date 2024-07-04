import { getAllWallets } from '@ses/core/utils/finances';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import type { InnerTableColumn, InnerTableRow, RowType } from '@/components/AdvancedInnerTable/types';
import { renderWallet } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils';
import { useUrlAnchor } from '../../../../core/hooks/useUrlAnchor';
import { API_MONTH_TO_FORMAT } from '../../../../core/utils/date';
import { getWalletWidthForWallets } from '../../../../core/utils/string';

import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementLineItem } from '@ses/core/models/interfaces/budgetStatementWallet';
import type { DateTime } from 'luxon';

export const useDelegatesForecast = (currentMonth: DateTime, propBudgetStatements: BudgetStatement[]) => {
  const firstMonthForecast = useMemo(() => currentMonth.plus({ month: 1 }), [currentMonth]);
  const secondMonthForecast = useMemo(() => currentMonth.plus({ month: 2 }), [currentMonth]);
  const thirdMonthForecast = useMemo(() => currentMonth.plus({ month: 3 }), [currentMonth]);
  const [thirdIndexForecast, setThirdIndexForecast] = useState(0);
  const walletsForecast = useMemo(
    () => getAllWallets(propBudgetStatements, currentMonth),
    [currentMonth, propBudgetStatements]
  );

  const getForecastForMonthOnWalletOnBudgetStatement = (
    budgetStatements: BudgetStatement[],
    walletAddress: string | undefined,
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

    if (!budgetStatement || !walletAddress) return 0;

    const wallet =
      budgetStatement?.budgetStatementWallet?.find((x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ??
      null;

    if (!wallet) return 0;

    return _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (i) => i.forecast ?? 0
    );
  };

  const getBudgetCapForMonthOnWalletOnBudgetStatement = (
    budgetStatements: BudgetStatement[],
    walletAddress: string | undefined,
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find((x) => x.month === currentMonth?.toFormat(API_MONTH_TO_FORMAT)) ?? null;

    if (!budgetStatement || !walletAddress) return 0;

    const wallet =
      budgetStatement?.budgetStatementWallet?.find((x) => x.address?.toLowerCase() === walletAddress?.toLowerCase()) ??
      null;

    if (!wallet) return 0;

    return _.sumBy(
      wallet?.budgetStatementLineItem.filter((item) => item.month === month?.toFormat(API_MONTH_TO_FORMAT)),
      (i) => i.budgetCap ?? 0
    );
  };

  const getForecastSumOfMonthsOnWalletForecast = useCallback(
    (
      budgetStatements: BudgetStatement[],
      walletAddress: string | undefined,
      currentMonth: DateTime,
      months: DateTime[]
    ) => {
      let result = 0;

      if (!walletAddress) return result;

      months.forEach((month) => {
        result += getForecastForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, currentMonth, month);
      });

      return result;
    },
    []
  );

  const getBudgetCapSumOfMonthsOnWallet = useCallback(
    (
      budgetStatements: BudgetStatement[],
      walletAddress: string | undefined,
      currentMonth: DateTime,
      months: DateTime[]
    ) => {
      let result = 0;

      if (!walletAddress) return result;

      months.forEach((month) => {
        result += getBudgetCapForMonthOnWalletOnBudgetStatement(budgetStatements, walletAddress, currentMonth, month);
      });

      return result;
    },
    []
  );

  const getForecastSumForMonth = (budgetStatements: BudgetStatement[], currentMonth: DateTime, month: DateTime) => {
    const budgetStatement =
      budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet?.budgetStatementLineItem?.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
        (item) => item.forecast ?? 0
      )
    );
  };

  const getForecastSumForMonthsForecast = useCallback(
    (budgetStatements: BudgetStatement[], currentMonth: DateTime, months: DateTime[]) => {
      let result = 0;

      months.forEach((month) => {
        result += getForecastSumForMonth(budgetStatements, currentMonth, month);
      });

      return result;
    },
    []
  );

  const getBudgetCapForMonthOnBudgetStatement = (
    budgetStatements: BudgetStatement[],
    currentMonth: DateTime,
    month: DateTime
  ) => {
    const budgetStatement =
      budgetStatements?.find((x) => x.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)) ?? null;

    return _.sumBy(budgetStatement?.budgetStatementWallet, (wallet) =>
      _.sumBy(
        wallet?.budgetStatementLineItem?.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
        (item) => item.budgetCap ?? 0
      )
    );
  };

  const getTotalQuarterlyBudgetCapOnBudgetStatement = useCallback(
    (budgetStatements: BudgetStatement[], months: DateTime[]) => {
      let result = 0;

      walletsForecast.forEach((wallet) => {
        result += getBudgetCapSumOfMonthsOnWallet(
          budgetStatements,
          wallet?.address?.toLowerCase() || '',
          currentMonth,
          months
        );
      });

      return result;
    },
    [currentMonth, getBudgetCapSumOfMonthsOnWallet, walletsForecast]
  );

  const breakdownTabsForecast = useMemo(() => {
    if (!propBudgetStatements || propBudgetStatements.length === 0) return [];
    return walletsForecast?.map((wallet) => wallet.name);
  }, [propBudgetStatements, walletsForecast]);

  const getLineItemsForWalletOnMonth = (
    budgetStatements: BudgetStatement[],
    currentMonth: DateTime,
    month: DateTime,
    walletAddress: string
  ) => {
    const budgetStatement = budgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));

    if (!budgetStatement) return [];

    return (
      budgetStatement.budgetStatementWallet
        ?.find((wallet) => wallet.address?.toLowerCase() === walletAddress?.toLowerCase())
        ?.budgetStatementLineItem.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)) ?? []
    );
  };

  const getLineItemForecastSumForMonth = (items: BudgetStatementLineItem[], month: DateTime) =>
    _.sumBy(
      items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (item) => item.forecast ?? 0
    );

  const getLineItemForecastSumForMonths = (items: BudgetStatementLineItem[], months: DateTime[]) => {
    const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
    return _.sumBy(
      items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
      (item) => item.forecast ?? 0
    );
  };

  const getBudgetCapForMonthOnLineItem = (items: BudgetStatementLineItem[], month: DateTime) =>
    _.sumBy(
      items.filter((item) => item.month === month.toFormat(API_MONTH_TO_FORMAT)),
      (item) => item.budgetCap ?? 0
    );

  const getTotalQuarterlyBudgetCapOnLineItem = (items: BudgetStatementLineItem[], months: DateTime[]) => {
    const formattedMonths = months.map((x) => x.toFormat(API_MONTH_TO_FORMAT));
    return _.sumBy(
      items.filter((item) => formattedMonths.indexOf(item.month ?? '') > -1),
      (item) => item.budgetCap ?? 0
    );
  };

  const headerToId = (header: string): string => {
    const id = header.toLowerCase().trim().replaceAll(/ /g, '-');
    return `forecast-${id}`;
  };

  const [headerIdsForecast, setHeaderIdsForecast] = useState<string[]>([]);
  useEffect(() => {
    setHeaderIdsForecast(breakdownTabsForecast.map((header) => headerToId(header)));
  }, [breakdownTabsForecast]);

  const anchor = useUrlAnchor();
  const breakdownTitleRefForecast = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (!scrolled && anchor && !_.isEmpty(headerIdsForecast) && headerIdsForecast.includes(anchor)) {
      setScrolled(true);
      let offset = (breakdownTitleRefForecast?.current?.offsetTop || 0) - 260;
      const windowsWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (windowsWidth < 834) {
        offset += 90;
      }
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, Math.max(0, offset));
    }
  }, [anchor, headerIdsForecast, scrolled]);

  useEffect(() => {
    if (anchor && !_.isEmpty(headerIdsForecast)) {
      setThirdIndexForecast(Math.max(headerIdsForecast.indexOf(anchor), 0));
    }
  }, [anchor, headerIdsForecast]);

  const hasGroups = useMemo(() => {
    const currentWallet = walletsForecast[thirdIndexForecast];

    return currentWallet?.budgetStatementLineItem?.some((item) => item.group && item.actual);
  }, [thirdIndexForecast, walletsForecast]);

  const mainTableColumnsForecast: InnerTableColumn[] = useMemo(
    () => [
      {
        header: 'BUDGET',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        width: getWalletWidthForWallets(walletsForecast),
        minWidth: getWalletWidthForWallets(walletsForecast),
      },
      {
        header: firstMonthForecast.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: secondMonthForecast.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: thirdMonthForecast.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: 'Mthly Budget',
        type: 'number',
        align: 'right',
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
    ],
    [firstMonthForecast, secondMonthForecast, thirdMonthForecast, walletsForecast]
  );

  const mainTableItemsForecast = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (!propBudgetStatements || !propBudgetStatements.length) {
      return result;
    }

    let emptyWallets = 0;

    walletsForecast.forEach((wallet) => {
      const numberCellData = [
        getForecastForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          firstMonthForecast
        ),
        getForecastForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          secondMonthForecast
        ),
        getForecastForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          thirdMonthForecast
        ),

        getBudgetCapForMonthOnWalletOnBudgetStatement(
          propBudgetStatements,
          wallet?.address,
          currentMonth,
          currentMonth
        ),
        getForecastSumOfMonthsOnWalletForecast(propBudgetStatements, wallet?.address, currentMonth, [
          firstMonthForecast,
          secondMonthForecast,
          thirdMonthForecast,
        ]),
        getBudgetCapSumOfMonthsOnWallet(propBudgetStatements, wallet?.address, currentMonth, [
          firstMonthForecast,
          secondMonthForecast,
          thirdMonthForecast,
        ]),
      ];

      if (numberCellData.every((n) => n === 0)) {
        emptyWallets++;
      }

      result.push({
        type: 'normal',
        items: [
          {
            column: mainTableColumnsForecast[0],
            value: wallet,
          },
          {
            column: mainTableColumnsForecast[1],
            value: numberCellData[0],
          },
          {
            column: mainTableColumnsForecast[2],
            value: numberCellData[1],
          },
          {
            column: mainTableColumnsForecast[3],
            value: numberCellData[2],
          },
          {
            column: mainTableColumnsForecast[4],
            value: numberCellData[3],
          },
          {
            column: mainTableColumnsForecast[5],
            value: numberCellData[4],
          },
          {
            column: mainTableColumnsForecast[6],
            value: numberCellData[5],
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
          column: mainTableColumnsForecast[0],
          value: 'Total',
        },
        {
          column: mainTableColumnsForecast[1],
          value: getForecastSumForMonth(propBudgetStatements, currentMonth, firstMonthForecast),
        },
        {
          column: mainTableColumnsForecast[2],
          value: getForecastSumForMonth(propBudgetStatements, currentMonth, secondMonthForecast),
        },
        {
          column: mainTableColumnsForecast[3],
          value: getForecastSumForMonth(propBudgetStatements, currentMonth, thirdMonthForecast),
        },

        {
          column: mainTableColumnsForecast[5],
          value: getBudgetCapForMonthOnBudgetStatement(propBudgetStatements, currentMonth, currentMonth),
        },
        {
          column: mainTableColumnsForecast[4],
          value: getForecastSumForMonthsForecast(propBudgetStatements, currentMonth, [
            firstMonthForecast,
            secondMonthForecast,
            thirdMonthForecast,
          ]),
        },
        {
          column: mainTableColumnsForecast[6],
          value: getTotalQuarterlyBudgetCapOnBudgetStatement(propBudgetStatements, [
            firstMonthForecast,
            secondMonthForecast,
            thirdMonthForecast,
          ]),
        },
      ],
      hideMobile: result.length < 2,
    });

    return result;
  }, [
    propBudgetStatements,
    walletsForecast,
    mainTableColumnsForecast,
    currentMonth,
    firstMonthForecast,
    secondMonthForecast,
    thirdMonthForecast,
    getForecastSumForMonthsForecast,
    getTotalQuarterlyBudgetCapOnBudgetStatement,
    getForecastSumOfMonthsOnWalletForecast,
    getBudgetCapSumOfMonthsOnWallet,
  ]);

  const breakdownHeadersForecast = useMemo(() => {
    const result: InnerTableColumn[] = [
      {
        header: 'recognized delegates',
        hidden: !hasGroups,
        isCardHeader: true,
        width: '240px',
        type: 'text',
      },
      {
        header: 'Budget Category',
        isCardHeader: true,
        width: hasGroups ? '220px' : '240px',
        type: 'text',
        hidden: true,
      },
      {
        header: firstMonthForecast.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: secondMonthForecast.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: thirdMonthForecast.toFormat('MMMM'),
        type: 'number',
        align: 'right',
      },
      {
        header: 'Mthly Budget',
        type: 'number',
        align: 'right',
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
    ];

    return result;
  }, [hasGroups, firstMonthForecast, secondMonthForecast, thirdMonthForecast]);

  const getBreakdownItemsForGroup = useCallback(
    (grouped: { [id: string]: BudgetStatementLineItem[] }, type?: RowType) => {
      const result: InnerTableRow[] = [];
      const subTotal = {
        0: 'Sub-Total',
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
      };

      for (const groupedKey in grouped) {
        const groupedCategory = _.groupBy(grouped[groupedKey], (item) => item.budgetCategory);

        let i = 1;
        for (const groupedCatKey in groupedCategory) {
          if (
            Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonthForecast)) +
              Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonthForecast)) +
              Math.abs(getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonthForecast)) +
              Math.abs(
                getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
                  firstMonthForecast,
                  secondMonthForecast,
                  thirdMonthForecast,
                ])
              ) +
              Math.abs(getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth)) +
              Math.abs(
                getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
                  firstMonthForecast,
                  secondMonthForecast,
                  thirdMonthForecast,
                ])
              ) ===
            0
          ) {
            continue;
          }

          subTotal[2] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonthForecast);

          subTotal[3] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonthForecast);

          subTotal[4] += getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonthForecast);

          subTotal[5] += getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth);

          subTotal[6] += getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
            firstMonthForecast,
            secondMonthForecast,
            thirdMonthForecast,
          ]);

          subTotal[7] += getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
            firstMonthForecast,
            secondMonthForecast,
            thirdMonthForecast,
          ]);

          result.push({
            type: 'normal',
            items: [
              {
                column: breakdownHeadersForecast[0],
                value: i === 1 ? groupedKey : '',
              },
              {
                column: breakdownHeadersForecast[1],
                value: groupedCatKey,
              },
              {
                column: breakdownHeadersForecast[2],
                value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], firstMonthForecast),
              },
              {
                column: breakdownHeadersForecast[3],
                value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], secondMonthForecast),
              },
              {
                column: breakdownHeadersForecast[4],
                value: getLineItemForecastSumForMonth(groupedCategory[groupedCatKey], thirdMonthForecast),
              },
              {
                column: breakdownHeadersForecast[6],
                value: getBudgetCapForMonthOnLineItem(groupedCategory[groupedCatKey], currentMonth),
              },
              {
                column: breakdownHeadersForecast[5],
                value: getLineItemForecastSumForMonths(groupedCategory[groupedCatKey], [
                  firstMonthForecast,
                  secondMonthForecast,
                  thirdMonthForecast,
                ]),
              },
              {
                column: breakdownHeadersForecast[7],
                value: getTotalQuarterlyBudgetCapOnLineItem(groupedCategory[groupedCatKey], [
                  firstMonthForecast,
                  secondMonthForecast,
                  thirdMonthForecast,
                ]),
              },
            ],
          });

          i++;
        }
      }

      result.push({
        type: type || 'normal',
        items: [
          {
            column: breakdownHeadersForecast[0],
            value: hasGroups ? 'Subtotal' : '',
          },
          {
            column: breakdownHeadersForecast[1],
            value: hasGroups ? '' : 'Subtotal',
          },
          {
            column: breakdownHeadersForecast[2],
            value: subTotal[2],
          },
          {
            column: breakdownHeadersForecast[3],
            value: subTotal[3],
          },
          {
            column: breakdownHeadersForecast[4],
            value: subTotal[4],
          },
          {
            column: breakdownHeadersForecast[5],
            value: subTotal[5],
          },
          {
            column: breakdownHeadersForecast[6],
            value: subTotal[6],
          },
          {
            column: breakdownHeadersForecast[7],
            value: subTotal[7],
          },
        ],
      });

      return result;
    },
    [breakdownHeadersForecast, currentMonth, firstMonthForecast, hasGroups, secondMonthForecast, thirdMonthForecast]
  );

  const breakdownItemsForecast = useMemo(() => {
    const result: InnerTableRow[] = [];

    if (!propBudgetStatements || propBudgetStatements.length === 0) {
      return result;
    }
    if (!walletsForecast.length) {
      return result;
    }

    const currentWalletAddress = walletsForecast[thirdIndexForecast]?.address ?? '';

    const ungrouped = [
      ...getLineItemsForWalletOnMonth(propBudgetStatements, currentMonth, currentMonth, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(propBudgetStatements, currentMonth, firstMonthForecast, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(propBudgetStatements, currentMonth, secondMonthForecast, currentWalletAddress),
      ...getLineItemsForWalletOnMonth(propBudgetStatements, currentMonth, thirdMonthForecast, currentWalletAddress),
    ];

    result.push({
      type: 'section',
      items: [
        {
          column: breakdownHeadersForecast[0],
          value: 'Headcount Expenses',
        },
        {
          column: breakdownHeadersForecast[1],
          value: hasGroups ? '' : 'Headcount Expenses',
        },
      ],
    });

    const groupedHeadCount = _.groupBy(
      ungrouped.filter((x) => x.headcountExpense),
      (item) => item.group
    );

    result.push(...getBreakdownItemsForGroup(groupedHeadCount, 'subTotal'));

    result.push({
      type: 'section',
      items: [
        {
          column: breakdownHeadersForecast[0],
          value: 'Non-Headcount Expenses',
        },
        {
          column: breakdownHeadersForecast[1],
          value: hasGroups ? '' : 'Non-Headcount Expenses',
        },
      ],
    });

    const groupedNonHeadCount = _.groupBy(
      ungrouped.filter((x) => !x.headcountExpense),
      (item) => item.group
    );

    result.push(...getBreakdownItemsForGroup(groupedNonHeadCount, 'subTotal'));

    if (result.length <= 4) {
      return [];
    }

    result.push({
      type: 'total',
      items: [
        {
          column: breakdownHeadersForecast[0],
          value: hasGroups ? 'Total' : '',
        },
        {
          column: breakdownHeadersForecast[1],
          value: hasGroups ? '' : 'Total',
        },
        {
          column: breakdownHeadersForecast[2],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            propBudgetStatements,
            currentWalletAddress,
            currentMonth,
            firstMonthForecast
          ),
        },
        {
          column: breakdownHeadersForecast[3],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            propBudgetStatements,
            currentWalletAddress,
            currentMonth,
            secondMonthForecast
          ),
        },
        {
          column: breakdownHeadersForecast[4],
          value: getForecastForMonthOnWalletOnBudgetStatement(
            propBudgetStatements,
            currentWalletAddress,
            currentMonth,
            thirdMonthForecast
          ),
        },
        {
          column: breakdownHeadersForecast[6],
          value: getBudgetCapForMonthOnWalletOnBudgetStatement(
            propBudgetStatements,
            currentWalletAddress,
            currentMonth,
            currentMonth
          ),
        },
        {
          column: breakdownHeadersForecast[5],
          value: getForecastSumOfMonthsOnWalletForecast(propBudgetStatements, currentWalletAddress, currentMonth, [
            firstMonthForecast,
            secondMonthForecast,
            thirdMonthForecast,
          ]),
        },
        {
          column: breakdownHeadersForecast[7],
          value: getBudgetCapSumOfMonthsOnWallet(propBudgetStatements, currentWalletAddress, currentMonth, [
            firstMonthForecast,
            secondMonthForecast,
            thirdMonthForecast,
          ]),
        },
      ],
    });

    return result;
  }, [
    propBudgetStatements,
    walletsForecast,
    thirdIndexForecast,
    currentMonth,
    firstMonthForecast,
    secondMonthForecast,
    thirdMonthForecast,
    breakdownHeadersForecast,
    hasGroups,
    getBreakdownItemsForGroup,
    getForecastSumOfMonthsOnWalletForecast,
    getBudgetCapSumOfMonthsOnWallet,
  ]);

  return {
    thirdIndexForecast,
    mainTableItemsForecast,
    mainTableColumnsForecast,
    headerIdsForecast,
    breakdownTabsForecast,
    breakdownHeadersForecast,
    breakdownItemsForecast,
    breakdownTitleRefForecast,
    firstMonthForecast,
    secondMonthForecast,
    thirdMonthForecast,
    getForecastSumOfMonthsOnWalletForecast,
    getForecastSumForMonthsForecast,
    walletsForecast,
  };
};
