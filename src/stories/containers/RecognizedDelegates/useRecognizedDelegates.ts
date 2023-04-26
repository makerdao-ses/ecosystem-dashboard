import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';

export const useRecognizedDelegates = (delegates: RecognizedDelegatesDto[], totalDaiDelegates: number) => {
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const totalDAI = totalDaiDelegates;
  const handleResetFilter = () => {
    setActiveElements([]);
  };

  const expensesMock = [
    64523, 72053, 91478, 105432, 78823, 46823, 23456, 98765, 78964, 86543, 93021, 110540, 100032, 120032, 88023, 97321,
    120453, 105432, 87654, 99432, 65023, 100021, 89054, 105032, 78965, 93021,
  ];
  const startDate = DateTime.fromISO('2021-11-01');
  const endDate = DateTime.fromISO('2023-06-01');
  const totalDelegates = 23;
  const shadowTotal = 43;
  const mediaAnnual = 89928;
  const percent = 4.22;
  const delegatesExpenses = 2160000;
  const otherExpenses = 50500000;
  const amountDelegates = 21;
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

  return {
    totalDAI,
    totalDelegates,
    shadowTotal,
    percent,
    mediaAnnual,
    delegatesExpenses,
    otherExpenses,
    amountDelegates,
    expensesMock,
    startDate,
    endDate,
    selectElements,
    handleSelectChange,
    activeElements,
    handleResetFilter,
    resultFiltered,
  };
};
