import { API_MONTH_TO_FORMAT } from '@ses/core/utils/date';
import _ from 'lodash';
import { useMemo } from 'react';
import type { InnerTableColumn, InnerTableRow } from '@/components/AdvancedInnerTable/types';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { DateTime } from 'luxon';

export const useTransparencyMkrVesting = (currentMonth: DateTime, budgetStatements: BudgetStatement[] | undefined) => {
  const currentBudgetStatement = useMemo(
    () => budgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT)),
    [currentMonth, budgetStatements]
  );

  const mkrVestings = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }
    return currentBudgetStatement?.budgetStatementMKRVest ?? [];
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const totalAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }

    return _.sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], (mkr) => mkr.mkrAmount);
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const totalOldAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }

    return _.sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], (mkr) => mkr.mkrAmountOld);
  }, [currentMonth, budgetStatements, currentBudgetStatement?.budgetStatementMKRVest]);

  const FTEs = useMemo(
    () => _.first(currentBudgetStatement?.budgetStatementFTEs)?.ftes ?? 'N/A',
    [currentBudgetStatement?.budgetStatementFTEs]
  );

  const mainTableColumns = useMemo(() => {
    const mainTableColumns: InnerTableColumn[] = [
      {
        header: 'Vesting Date',
        isCardHeader: true,
      },
      {
        header: 'MKR Amount',
        type: 'number',
        align: 'right',
      },
      {
        header: 'Last month',
        type: 'number',
        align: 'right',
      },
      {
        header: 'Difference',
        type: 'number',
        align: 'right',
      },
      {
        header: 'Reasons(s)',
      },
    ];
    return mainTableColumns;
  }, []);

  const mainTableItems: InnerTableRow[] = useMemo(() => {
    const result: InnerTableRow[] = [];

    const mkrVestingsOrdered = _.orderBy(mkrVestings, 'vestingDate', 'asc');

    mkrVestingsOrdered.forEach((mkrVesting) => {
      result.push({
        type: 'normal',
        items: [
          {
            value: mkrVesting.vestingDate,
            column: mainTableColumns[0],
          },
          {
            value: mkrVesting.mkrAmount,
            column: mainTableColumns[1],
          },
          {
            value: mkrVesting.mkrAmountOld,
            column: mainTableColumns[2],
          },
          {
            value: Number(mkrVesting.mkrAmount) - Number(mkrVesting.mkrAmountOld),
            column: mainTableColumns[3],
          },
          {
            value: mkrVesting.comments,
            column: mainTableColumns[4],
          },
        ],
      });
    });

    if (result.length > 0) {
      result.push({
        type: 'total',
        items: [
          {
            value: 'Total',
            column: mainTableColumns[0],
          },
          {
            value: totalAmount,
            column: mainTableColumns[1],
          },
          {
            value: totalOldAmount,
            column: mainTableColumns[2],
          },
          {
            value: Number(totalAmount) - Number(totalOldAmount),
            column: mainTableColumns[3],
          },
          {
            value: '',
            column: mainTableColumns[4],
          },
        ],
      });
    }

    return result;
  }, [mkrVestings, mainTableColumns, totalAmount, totalOldAmount]);

  return {
    mainTableColumns,
    mainTableItems,
    FTEs,
  };
};
