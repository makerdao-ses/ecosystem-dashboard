import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { getLastUpdateForBudgetStatement } from '@ses/core/business-logic/core-units';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { LinkTypeEnum } from '@ses/core/enums/link-type.enum';
import useBudgetStatementPager from '@ses/core/hooks/useBudgetStatementPager';
import { useUrlAnchor } from '@ses/core/hooks/useUrlAnchor';
import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date.utils';
import { capitalizeSentence, getWalletWidthForWallets } from '@ses/core/utils/string.utils';
import lightTheme from '@ses/styles/theme/light';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CommentsTab from '../../components/tabs/comments-tab/comments-tab';
import { renderLinks, renderWallet } from '../transparency-report/transparency-report.utils';
import type { TableItems } from '../transparency-report/transparency-report';
import type {
  InnerTableColumn,
  InnerTableRow,
  RowType,
} from '@ses/components/advanced-inner-table/advanced-inner-table';
import type { BudgetStatementLineItemDto, BudgetStatementWalletDto } from '@ses/core/models/dto/core-unit.dto';
import type { DelegatesDto } from '@ses/core/models/dto/delegates.dto';

export enum DELEGATES_IDS_ENUM {
  ACTUALS = 'actuals',
  FORECAST = 'forecast',
  COMMENTS = 'comments',
}

const links = [
  {
    linkType: LinkTypeEnum.WWW,
    href: 'https://vote.makerdao.com/delegates',
  },
  {
    linkType: LinkTypeEnum.Forum,
    href: 'https://forum.makerdao.com/c/governance/delegates/43',
  },
  {
    linkType: LinkTypeEnum.Discord,
    href: 'https://discord.com/invite/uZxdmZcS',
  },
  {
    linkType: LinkTypeEnum.Youtube,
    href: 'https://www.youtube.com/@MakerDAO/videos',
  },
];

const itemsBreadcrumb = [
  {
    label: 'Finances',
    url: siteRoutes.financesOverview,
  },
  {
    label: 'Recognized Delegates',
    url: siteRoutes.recognizedDelegate,
  },
];

const useRecognizedDelegates = (delegates: DelegatesDto) => {
  const { isLight } = useThemeContext();
  const [tabsIndex, setTabsIndex] = useState<DELEGATES_IDS_ENUM>(DELEGATES_IDS_ENUM.ACTUALS);
  const [tabsIndexNumber, setTabsIndexNumber] = useState<number>(0);
  const [headerIds, setHeaderIds] = useState<string[]>([]);
  const anchor = useUrlAnchor();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('table_834'));
  const { currentMonth, currentBudgetStatement, handleNextMonth, handlePreviousMonth, hasNextMonth, hasPreviousMonth } =
    useBudgetStatementPager(delegates);

  const hasNewComments = true;
  const numbersComments = 5;

  const tabItems: TableItems[] = [
    {
      item: 'Actuals',
      id: DELEGATES_IDS_ENUM.ACTUALS,
    },
    {
      item: 'Forecast',
      id: DELEGATES_IDS_ENUM.FORECAST,
    },
    {
      item: <CommentsTab hasNewComments={hasNewComments} numbersComments={numbersComments} />,
      id: DELEGATES_IDS_ENUM.COMMENTS,
    },
  ];

  useEffect(() => {
    // change the tabs when anchor changes
    if (anchor) {
      const index = Object.values(DELEGATES_IDS_ENUM).findIndex((id) => anchor.indexOf(id) > -1);
      if (index !== -1) {
        const indexKey = Object.keys(DELEGATES_IDS_ENUM)[index];

        setTabsIndex(DELEGATES_IDS_ENUM[indexKey as keyof typeof DELEGATES_IDS_ENUM]);
        setTabsIndexNumber(index);
      }
    }
  }, [anchor]);
  const wallets: BudgetStatementWalletDto[] = useMemo(() => {
    const dict: { [id: string]: BudgetStatementWalletDto } = {};
    if (!delegates.budgetStatements) return [];
    const budgetStatement = delegates.budgetStatements?.find(
      (bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)
    );
    console.log('budgetStatement', budgetStatement);

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
  }, [currentMonth, delegates.budgetStatements]);

  const breakdownTabs = useMemo(() => wallets.map((wallet) => wallet.name), [wallets]);
  const thirdIndex = useMemo(() => Math.max(headerIds?.indexOf(anchor ?? ''), 0), [headerIds, anchor]);

  const currentWallet = useMemo(() => wallets[thirdIndex], [thirdIndex, wallets]);
  const hasExpenses = useCallback(
    (headCount = true) =>
      currentWallet?.budgetStatementLineItem
        ?.filter((item) => (headCount ? item.headcountExpense : !item.headcountExpense))
        .some((x) => (x.actual || x.forecast) && x.month === currentBudgetStatement?.month),
    [currentBudgetStatement?.month, currentWallet?.budgetStatementLineItem]
  );
  const headerToId = (header: string): string => {
    const id = header.toLowerCase().trim().replaceAll(/ /g, '-');
    return `actuals-${id}`;
  };

  const hasGroups = useMemo(() => {
    const currentWallet = wallets[thirdIndex];

    return currentWallet?.budgetStatementLineItem?.some((item) => item.group && item.actual);
  }, [wallets, thirdIndex]);

  useEffect(() => {
    setHeaderIds(breakdownTabs.map((header: string) => headerToId(header)));
  }, [breakdownTabs]);

  const lastUpdateForBudgetStatement = useMemo(
    () => getLastUpdateForBudgetStatement(delegates, currentBudgetStatement?.id ?? '0'),
    [currentBudgetStatement, delegates]
  );

  const mainTableColumns = useMemo(() => {
    const mainTableColumns: InnerTableColumn[] = [
      {
        header: 'budget',
        align: 'left',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        width: getWalletWidthForWallets(wallets),
        minWidth: getWalletWidthForWallets(wallets),
      },
      {
        header: 'Forecast',
        align: 'right',
        type: 'number',
      },
      {
        header: 'Actuals',
        align: 'right',
        type: 'number',
      },
      {
        header: 'Difference',
        align: 'right',
        type: 'number',
      },
      {
        header: 'Payments',
        align: 'right',
        type: 'number',
      },
      {
        header: 'External Links',
        align: 'left',
        type: 'custom',
        cellRender: renderLinks,
        isCardFooter: true,
      },
    ];
    return mainTableColumns;
  }, [wallets]);

  const getWalletForecast = useMemo(() => {
    const getWalletForecast = (wallet: BudgetStatementWalletDto) =>
      _.sumBy(
        wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
        (i) => i.forecast ?? 0
      );
    return getWalletForecast;
  }, [currentMonth]);

  const getWalletActual = useMemo(() => {
    const getWalletActual = (wallet: BudgetStatementWalletDto) =>
      _.sumBy(
        wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
        (i) => i.actual ?? 0
      );
    return getWalletActual;
  }, [currentMonth]);

  const getWalletPayment = useMemo(() => {
    const getWalletPayment = (wallet: BudgetStatementWalletDto) =>
      _.sumBy(
        wallet?.budgetStatementLineItem.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
        (i) => i.payment ?? 0
      );
    return getWalletPayment;
  }, [currentMonth]);

  const getWalletDifference = useMemo(() => {
    const getWalletDifference = (wallet: BudgetStatementWalletDto) =>
      getWalletForecast(wallet) - getWalletActual(wallet);
    return getWalletDifference;
  }, [getWalletActual, getWalletForecast]);

  const budgetTotalForecast = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
          (item) => item?.forecast ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalActual = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
          (item) => item?.actual ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalPayment = useMemo(
    () =>
      _.sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        _.sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
          (item) => item?.payment ?? 0
        )
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth]
  );

  const budgetTotalDifference = useMemo(
    () => budgetTotalForecast - budgetTotalActual,
    [budgetTotalForecast, budgetTotalActual]
  );
  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = [];
    if (currentBudgetStatement) {
      wallets.forEach((wallet) => {
        const numberCellData = [
          getWalletForecast(wallet),
          getWalletActual(wallet),
          getWalletDifference(wallet),
          getWalletPayment(wallet),
        ];
        console.log('numberCellData', numberCellData[0], numberCellData[1]);
        if (numberCellData.some((n) => n !== 0)) {
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
                value: wallet.address,
              },
            ],
          });
        }
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
              value: budgetTotalForecast,
            },
            {
              column: mainTableColumns[2],
              value: budgetTotalActual,
            },
            {
              column: mainTableColumns[3],
              value: budgetTotalDifference,
            },
            {
              column: mainTableColumns[4],
              value: budgetTotalPayment,
            },
          ],
          hideMobile: result.length < 2,
        });
      }
    }

    return result;
  }, [
    budgetTotalActual,
    budgetTotalDifference,
    budgetTotalForecast,
    budgetTotalPayment,
    currentBudgetStatement,
    getWalletActual,
    getWalletDifference,
    getWalletForecast,
    getWalletPayment,
    mainTableColumns,
    wallets,
  ]);

  // Note:BreakDown Section
  const breakdownColumns = useMemo(() => {
    const breakdownColumns: InnerTableColumn[] = [
      {
        header: 'Group',
        align: 'left',
        type: 'text',
        hidden: !hasGroups,
        isCardHeader: true,
        width: '240px',
      },
      {
        header: 'Budget Category',
        align: 'left',
        type: 'text',
        isCardHeader: true,
        width: hasGroups ? '220px' : '240px',
      },
      {
        header: 'Forecast',
        align: 'right',
        type: 'number',
      },
      {
        header: 'Actuals',
        align: 'right',
        type: 'number',
      },
      {
        header: 'Difference',
        align: 'right',
        type: 'number',
      },
      {
        header: 'Comments',
        align: 'left',
        type: 'text',
        width: '300px',
      },
      {
        header: 'Payments',
        align: 'right',
        type: 'number',
      },
    ];
    return breakdownColumns;
  }, [hasGroups]);
  const getGroupForecast = useCallback(
    (group: BudgetStatementLineItemDto[]) =>
      _.sumBy(
        group.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
        (item) => item.forecast ?? 0
      ),
    [currentMonth]
  );

  const getGroupActual = useCallback(
    (group: BudgetStatementLineItemDto[]) =>
      _.sumBy(
        group.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
        (item) => item.actual ?? 0
      ),
    [currentMonth]
  );

  const getGroupDifference = useCallback(
    (group: BudgetStatementLineItemDto[]) => getGroupForecast(group) - getGroupActual(group),
    [getGroupActual, getGroupForecast]
  );

  const getCommentsFromCategory = useCallback(
    (group: BudgetStatementLineItemDto[]) =>
      group
        .filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT) && item.comments !== undefined)
        .reduce((current, next) => `${current} ${next.comments !== '' ? next.comments : ''}`, ''),
    [currentMonth]
  );

  const getGroupPayment = useCallback(
    (group: BudgetStatementLineItemDto[]) =>
      _.sumBy(
        group.filter((item) => item.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
        (item) => item.payment ?? 0
      ),
    [currentMonth]
  );

  const getBreakdownItems = useCallback(
    (items: BudgetStatementLineItemDto[], type?: RowType) => {
      const result: InnerTableRow[] = [];
      const grouped = _.groupBy(items, (item) => item.group);

      for (const groupedKey in grouped) {
        if (Math.abs(getGroupForecast(grouped[groupedKey])) + Math.abs(getGroupActual(grouped[groupedKey])) === 0) {
          continue;
        }

        const groupedCategory = _.groupBy(grouped[groupedKey], (item) => item.budgetCategory);

        let i = 1;
        for (const groupedCatKey in groupedCategory) {
          if (
            Math.abs(getGroupForecast(groupedCategory[groupedCatKey])) +
              Math.abs(getGroupActual(groupedCategory[groupedCatKey])) ===
            0
          ) {
            continue;
          }

          result.push({
            type: type || 'normal',
            items: [
              {
                column: breakdownColumns[0],
                value: i === 1 && groupedKey !== 'null' ? groupedKey : '',
              },
              {
                column: breakdownColumns[1],
                value: groupedCategory[groupedCatKey][0].budgetCategory,
              },
              {
                column: breakdownColumns[2],
                value: getGroupForecast(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumns[3],
                value: getGroupActual(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumns[4],
                value: getGroupDifference(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumns[5],
                value: getCommentsFromCategory(groupedCategory[groupedCatKey]),
              },
              {
                column: breakdownColumns[6],
                value: getGroupPayment(groupedCategory[groupedCatKey]),
              },
            ],
          });

          i++;
        }
      }

      return result;
    },
    [breakdownColumns, getCommentsFromCategory, getGroupActual, getGroupDifference, getGroupForecast, getGroupPayment]
  );

  const getLineItemsSubtotal = useCallback(
    (items: BudgetStatementLineItemDto[], title: string) =>
      items?.reduce(
        (prv, curr) =>
          curr.month === currentBudgetStatement?.month
            ? {
                group: hasGroups ? title : '',
                budgetCategory: !hasGroups ? title : '',
                actual: prv.actual + curr.actual,
                forecast: (prv?.forecast ?? 0) + (curr?.forecast ?? 0),
                payment: (prv?.payment ?? 0) + (curr?.payment ?? 0),
                month: currentBudgetStatement?.month,
              }
            : prv,
        {
          actual: 0,
          forecast: 0,
          payment: 0,
        }
      ) ?? {},
    [currentBudgetStatement?.month, hasGroups]
  );

  const breakdownItems = useMemo(() => {
    const result: InnerTableRow[] = [];
    if (!wallets) {
      return result;
    }

    if (hasExpenses(true)) {
      result.push({
        items: [
          {
            column: breakdownColumns[0],
            value: 'Headcount Expenses',
          },
          {
            column: breakdownColumns[1],
            value: hasGroups ? '' : 'Headcount Expenses',
          },
        ],
        type: 'section',
      });

      result.push(
        ...getBreakdownItems(currentWallet?.budgetStatementLineItem?.filter((item) => item.headcountExpense))
      );

      result.push(
        ...getBreakdownItems(
          [
            getLineItemsSubtotal(
              currentWallet?.budgetStatementLineItem?.filter((item) => item.headcountExpense),
              'Subtotal'
            ),
          ],
          'subTotal'
        )
      );
    }

    if (hasExpenses(false)) {
      result.push({
        items: [
          {
            column: breakdownColumns[0],
            value: 'Non-Headcount Expenses',
          },
          {
            column: breakdownColumns[1],
            value: hasGroups ? '' : 'Non-Headcount Expenses',
          },
        ],
        type: 'section',
      });

      const headcountExpenseItems = getBreakdownItems(
        currentWallet?.budgetStatementLineItem?.filter((item) => !item.headcountExpense)
      );

      result.push(...headcountExpenseItems);

      result.push(
        ...getBreakdownItems(
          [
            getLineItemsSubtotal(
              currentWallet?.budgetStatementLineItem?.filter((item) => !item.headcountExpense),
              'Subtotal'
            ),
          ],
          'subTotal'
        )
      );
    }

    if (result.length > 0) {
      result.push({
        type: 'total',
        items: [
          {
            column: breakdownColumns[0],
            value: hasGroups ? 'Total' : '',
          },
          {
            column: breakdownColumns[1],
            value: hasGroups ? '' : 'Total',
          },
          {
            column: breakdownColumns[2],
            value: getWalletForecast(currentWallet),
          },
          {
            column: breakdownColumns[3],
            value: getWalletActual(currentWallet),
          },
          {
            column: breakdownColumns[4],
            value: getWalletDifference(currentWallet),
          },
          {
            column: breakdownColumns[5],
            value: '',
          },
          {
            column: breakdownColumns[6],
            value: getWalletPayment(currentWallet),
          },
        ],
      });
    }

    return result;
  }, [
    breakdownColumns,
    currentWallet,
    getBreakdownItems,
    getLineItemsSubtotal,
    getWalletActual,
    getWalletDifference,
    getWalletForecast,
    getWalletPayment,
    hasExpenses,
    hasGroups,
    wallets,
  ]);

  // TODO: update when the CTA should be displayed according to the current budget statement
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showExpenseReportStatusCTA, setShowExpenseReportStatusCTA] = useState<boolean>(false);

  return {
    isLight,
    links,
    itemsBreadcrumb,
    isMobile,
    tabItems,
    tabsIndex,
    tabsIndexNumber,
    showExpenseReportStatusCTA,
    lastUpdateForBudgetStatement,
    // budget statement pager
    currentMonth,
    currentBudgetStatement,
    handleNextMonth,
    handlePreviousMonth,
    hasNextMonth,
    hasPreviousMonth,
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
    headerIds,
    thirdIndex,
    breakdownColumns,
    getBreakdownItems,
    breakdownItems,
  };
};

export default useRecognizedDelegates;
