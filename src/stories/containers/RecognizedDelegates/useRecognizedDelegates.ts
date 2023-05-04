import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { ExpenseDto } from '@ses/core/models/dto/expensesDTO';

export const useRecognizedDelegates = (delegates: RecognizedDelegatesDto[], delegatesNumbers: ExpenseDto[]) => {
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };

  const totalDAI = delegatesNumbers
    .map((delegate: ExpenseDto) => delegate.budgetCap)
    .reduce((prev, next) => prev + next, 0);

  const handleResetFilter = () => {
    setActiveElements([]);
  };

  const startDate = DateTime.fromISO('2021-11-01');
  const endDate = DateTime.fromISO('2023-03-01');
  const differenceMonths = endDate.diff(startDate, 'months').months + 1;
  const emptyExpense: ExpenseDto = {
    category: '',
    actuals: 0,
    budget: '',
    budgetCap: 0,
    discontinued: null,
    period: '',
    prediction: 0,
  };

  const recognizedDelegates = delegates.length;
  const shadowTotal = 178;
  const mediaAnnual = 89928;
  const percent = 4.22;
  const delegatesExpenses = 2160000;
  const otherExpenses = 50500000;

  const amountDelegates = delegates.length;
  const selectElements = useMemo(
    () =>
      sortBy(delegates, (del) => del.name).map((delegates) => ({
        id: delegates.name,
        content: delegates.name,
        params: {
          url: delegates.image,
        },
      })) as MultiSelectItem[],
    [delegates]
  );
  const filteredCardsDelegates = delegates.filter((delegate) => activeElements.includes(delegate.name));
  const resultFiltered = activeElements.length === 0 ? delegates : filteredCardsDelegates;

  const newArray: number[] = new Array(differenceMonths).fill(emptyExpense.prediction);

  return {
    totalDAI,
    recognizedDelegates,
    shadowTotal,
    percent,
    mediaAnnual,
    delegatesExpenses,
    otherExpenses,
    amountDelegates,
    startDate,
    endDate,
    selectElements,
    handleSelectChange,
    activeElements,
    handleResetFilter,
    resultFiltered,
    newArray,
  };
};
