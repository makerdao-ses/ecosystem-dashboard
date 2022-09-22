import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { API_MONTH_TO_FORMAT } from '../../../../core/utils/date.utils';
import _ from 'lodash';
import { InnerTableColumn, InnerTableRow } from '../../../components/advanced-inner-table/advanced-inner-table';

export const useTransparencyMkrVesting2 = (currentMonth: DateTime, budgetStatements: BudgetStatementDto[]) => {
  const currentBudgetStatement = useMemo(() => {
    return budgetStatements?.find((bs) => bs.month === currentMonth.toFormat(API_MONTH_TO_FORMAT));
  }, [currentMonth, budgetStatements]);

  const mkrVestings = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }

    return currentBudgetStatement?.budgetStatementMKRVest ?? [];
  }, [currentMonth, budgetStatements]);

  const totalAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }

    return _.sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], (mkr) => mkr.mkrAmount);
  }, [currentMonth, budgetStatements]);

  const totalOldAmount = useMemo(() => {
    if (!currentMonth || !budgetStatements || !budgetStatements.length) {
      return [];
    }

    return _.sumBy(currentBudgetStatement?.budgetStatementMKRVest ?? [], (mkr) => mkr.mkrAmountOld);
  }, [currentMonth, budgetStatements]);

  const FTEs = useMemo(() => {
    return _.first(currentBudgetStatement?.budgetStatementFTEs)?.ftes ?? 'N/A';
  }, [currentMonth, budgetStatements]);

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

  const mainTableItems: InnerTableRow[] = useMemo(() => {
    const result: InnerTableRow[] = [];

    mkrVestings.forEach((mkrVesting) => {
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
  }, [currentMonth, budgetStatements]);

  return {
    mainTableColumns,
    mainTableItems,
    FTEs,
  };
};
