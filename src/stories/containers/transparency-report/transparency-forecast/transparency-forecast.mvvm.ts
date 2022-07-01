import { DateTime } from 'luxon';
import { BudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { useMemo } from 'react';

export const useTransparencyForecastMvvm = (propsCurrentMonth: DateTime, budgetStatements?: BudgetStatementDto[]) => {
  const firstMonth = propsCurrentMonth.plus({ month: 1 });
  const secondMonth = propsCurrentMonth.plus({ month: 2 });
  const thirdMonth = propsCurrentMonth.plus({ month: 3 });

  const forecastTableHeaders: string[] = useMemo(() => {
    const result = [];

    result.push('Wallet');
    result.push(firstMonth.toFormat('MMMM'));
    result.push(secondMonth.toFormat('MMMM'));
    result.push(thirdMonth.toFormat('MMMM'));
    result.push('3 months');
    result.push('Monthly Budget');
    result.push('Quarterly Budget Cap');
    result.push('External Links');

    return result;
  }, [propsCurrentMonth]);

  return {
    forecastTableHeaders
  };
};
