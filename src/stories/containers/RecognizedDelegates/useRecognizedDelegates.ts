import { delegateWithActuals } from '@ses/core/businessLogic/reconizedDelegate';
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

  const resultDelegatesWithActuals = delegateWithActuals(delegates, delegatesNumbers);
  const totalDAI = delegatesNumbers
    .map((delegate: ExpenseDto) => delegate.budgetCap)
    .reduce((prev, next) => prev + next, 0);

  const handleResetFilter = () => {
    setActiveElements([]);
  };

  const startDate = DateTime.fromISO('2021-11-01');
  const endDate = DateTime.fromISO('2023-03-01');

  const recognizedDelegates = delegates.length;
  const shadowTotal = 178;
  // TODO: This data is mock, so when the api es ready should be remove
  const mediaAnnual = 89928;
  const percent = 4.22;
  const delegatesExpenses = 2160000;
  const otherExpenses = 50500000;

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
  const resultFiltered = activeElements.length === 0 ? resultDelegatesWithActuals : filteredCardsDelegates;

  const newArray: number[] = resultFiltered.map((delegate) => delegate.actuals);

  return {
    totalDAI,
    recognizedDelegates,
    shadowTotal,
    percent,
    mediaAnnual,
    delegatesExpenses,
    otherExpenses,
    startDate,
    endDate,
    selectElements,
    handleSelectChange,
    activeElements,
    handleResetFilter,
    resultFiltered,
    newArray,
    resultDelegatesWithActuals,
  };
};
