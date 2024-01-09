import sortBy from 'lodash/sortBy';
import { DateTime } from 'luxon';
import { useMemo, useState } from 'react';
import type { MultiSelectItem } from '@ses/components/CustomMultiSelect/CustomMultiSelect';
import type { RecognizedDelegatesDto } from '@ses/core/models/dto/delegatesDTO';
import type { Analytic } from '@ses/core/models/interfaces/analytic';

export const useRecognizedDelegates = (
  delegates: RecognizedDelegatesDto[],
  totalMakerDAOExpenses: number,
  monthlyAnalytics: Analytic,
  totalAnalytics: Analytic
) => {
  // delegates selected on the bar chart
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const handleSelectChange = (value: string[]) => {
    setActiveElements(value);
  };
  const handleResetFilter = () => {
    setActiveElements([]);
  };

  // add to the delegates the actuals value coming from the "totalAnalytics"
  const resultDelegatesWithActuals = delegates.map(
    (delegate) =>
      ({
        ...delegate,
        actuals: totalAnalytics.series?.[0]?.rows?.find((row) =>
          row.dimensions.some((dimension) => dimension.path.replace('atlas/', '') === delegate.name)
        )?.value,
      } as RecognizedDelegatesDto)
  );

  // Total Reported Expenses using analytics
  const totalDAI = totalAnalytics.series.reduce(
    (acc, current) => acc + current.rows.reduce((rowAcc, rowCurrent) => rowCurrent.value + rowAcc, 0),
    0
  );

  const maxValuesRelative = Math.max(...resultDelegatesWithActuals.map((item) => item.actuals ?? 0));
  const startDate = DateTime.fromISO('2021-11-01');
  const endDate = DateTime.fromISO('2023-03-01');

  const recognizedDelegates = delegates.length;
  const shadowTotal = 178;
  const mediaAnnual = 73254.1;
  const delegatesExpenses = totalAnalytics.series.reduce(
    (acc, current) => acc + current.rows.reduce((rowAcc, rowCurrent) => rowCurrent.value + rowAcc, 0),
    0
  );
  const otherExpenses = totalMakerDAOExpenses - delegatesExpenses;

  // elements for the delegates select filter
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
  // element to render all the delegates in the UI
  const resultFilteredCards =
    activeElements.length === 0
      ? sortBy(resultDelegatesWithActuals, (items) => -items.actuals)
      : sortBy(filteredCardsDelegates, (items) => -items.actuals);

  // get the data for the chart filtering it if there are active elements
  const resultFilteredChart = useMemo(() => {
    const data: number[] = [];
    // each series item represent a month period
    monthlyAnalytics.series.forEach((item) => {
      const sum = item.rows
        .filter((element) =>
          // we only need the "Actuals" rows
          element.metric === 'Actuals' && activeElements.length === 0
            ? true
            : element.dimensions.some(
                // if there are active elements, then we can match its name with the dimension path
                // as it follow the pattern "atlas/<delegate name>"
                (dimension) => activeElements.includes(dimension.path.replace('atlas/', ''))
              )
        )
        .reduce((acc, current) => acc + current.value, 0);
      data.push(sum);
    });

    return data;
  }, [monthlyAnalytics, activeElements]);

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
    resultDelegatesWithActuals,
    resultFilteredChart,
    maxValuesRelative,
  };
};
