import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import { getPeriodForFilters, getPeriodForSemiAnnual, monthAbbreviations } from '../../utils/utils';
import HeaderAnnually from './HeaderAnnually/HeaderAnnually';
import HeaderMonthly from './HeaderMonthly/HeaderMonthly';

import HeaderQuarterly from './HeaderQuarterly/HeaderQuarterly';
import HeaderSemiAnnual from './HeaderSemiAnnual/HeaderSemiAnnual';
import type { MetricsWithAmount, PeriodicSelectionFilter } from '../../utils/types';

interface Props {
  metrics: MetricsWithAmount[];
  period: PeriodicSelectionFilter;
  title: string;
  year: string;
  metricTotal: MetricsWithAmount[];
}

const HeaderTable: React.FC<Props> = ({ title, metrics, year, period, metricTotal }) => {
  const isPhone = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const quarterlyFormatted = getPeriodForFilters(year);

  const semiAnnual = getPeriodForSemiAnnual(year);
  // This values are fixed, should be replace with the formula
  if (isPhone && period === 'Semi-annual') {
    return (
      <HeaderSemiAnnual
        period={period}
        metricTotal={metricTotal}
        title={title}
        periods={semiAnnual}
        metrics={metrics}
      />
    );
  } else {
    if (period === 'Annually') {
      return <HeaderAnnually metrics={metrics} year={year} title={title} />;
    }
    if (period === 'Monthly') {
      return <HeaderMonthly metrics={metrics} months={monthAbbreviations} title={title} />;
    }
    return <HeaderQuarterly metricTotal={metricTotal} metrics={metrics} title={title} periods={quarterlyFormatted} />;
  }
};

export default HeaderTable;
