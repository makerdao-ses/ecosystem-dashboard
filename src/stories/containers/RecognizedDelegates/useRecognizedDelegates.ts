import {
  delegateWithActuals,
  filteredDelegatesChart,
  sumActualsByPeriod,
} from '@ses/core/businessLogic/recognizedDelegate';
import orderBy from 'lodash/orderBy';
import sortBy from 'lodash/sortBy';

import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { RecognizedDelegatesDto, TotalDelegateDto } from '@ses/core/models/dto/delegatesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

export const useRecognizedDelegates = (
  delegates: RecognizedDelegatesDto[],
  delegatesNumbers: ExpenseDto[],
  totalQuarterlyExpenses: TotalDelegateDto,
  totalMonthlyExpenses: ExpenseDto[]
) => {
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const orderAllMonthExpense = orderBy(totalMonthlyExpenses, ['period']);
  const totalDelegateMonthly = sumActualsByPeriod(orderAllMonthExpense);

  const resultDelegatesWithActuals = delegateWithActuals(delegates, delegatesNumbers);
  const totalDAI = delegatesNumbers
    .map((delegate: ExpenseDto) => delegate.actuals)
    .reduce((prev, next) => prev + next, 0);

  const handleResetFilter = () => {
    setActiveElements([]);
  };

  const maxValuesRelative = Math.max(...resultDelegatesWithActuals.map((item) => item.actuals ?? 0));
  const startDate = DateTime.fromISO('2021-11-01');
  const endDate = DateTime.fromISO('2023-03-01');

  const recognizedDelegates = delegates.length;
  // TODO: Those number will be delete next release
  const shadowTotal = 178;
  const mediaAnnual = 73254.1;
  const delegatesExpenses = totalQuarterlyExpenses.delegatesExpenses[0]?.actuals ?? 0;

  const otherExpenses =
    totalQuarterlyExpenses.totalExpenses[0].actuals - (totalQuarterlyExpenses.delegatesExpenses[0]?.actuals ?? 0);

  const selectElements = useMemo(
    () =>
      sortBy(resultDelegatesWithActuals, (del) => del.name).map((delegates) => ({
        id: delegates.name,
        content: delegates.name,
        params: {
          url: delegates.image,
        },
      })) as MultiSelectItem[],
    [resultDelegatesWithActuals]
  );
  const filteredCardsDelegates = resultDelegatesWithActuals.filter((delegate: RecognizedDelegatesDto) =>
    activeElements.includes(delegate.name)
  );
  const resultFilteredCards =
    activeElements.length === 0
      ? sortBy(resultDelegatesWithActuals, (items) => -items.actuals)
      : sortBy(filteredCardsDelegates, (items) => -items.actuals);

  const resultFilteredChart =
    activeElements.length === 0 ? totalDelegateMonthly : filteredDelegatesChart(orderAllMonthExpense, activeElements);

  return {
    totalDAI,
    recognizedDelegates,
    shadowTotal,
    mediaAnnual,
    delegatesExpenses,
    otherExpenses,
    startDate,
    endDate,
    selectElements,
    handleSelectChange,
    activeElements,
    handleResetFilter,
    resultFilteredCards,
    totalDelegateMonthly,
    resultDelegatesWithActuals,
    resultFilteredChart,
    maxValuesRelative,
  };
};
