import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import HeaderAnnually from './HeaderAnnually/HeaderAnnually';
import HeaderMonthly from './HeaderMonthly/HeaderMonthly';

import HeaderQuarterly from './HeaderQuarterly/HeaderQuarterly';
import HeaderSemiAnnual from './HeaderSemiAnnual/HeaderSemiAnnual';
import type { MetricsWithAmount, PeriodicSelectionFilter } from '../../utils/types';

interface Props {
  metrics: Record<string, MetricsWithAmount[]>;
  period: PeriodicSelectionFilter;
  title: string;
  year: string;
  metricTotal: MetricsWithAmount[];
}

const HeaderTable: React.FC<Props> = ({ title, metrics, year, period, metricTotal }) => {
  const isPhone = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  if (isPhone && period === 'Semi-annual') {
    return <HeaderSemiAnnual period={period} metricTotal={metricTotal} title={title} metrics={metrics} />;
  } else {
    if (period === 'Annually') {
      return <HeaderAnnually metrics={metrics} year={year} title={title} />;
    }
    if (period === 'Monthly') {
      return <HeaderMonthly metrics={metrics} title={title} metricTotal={metricTotal} />;
    }
    return <HeaderQuarterly metricTotal={metricTotal} metrics={metrics} title={title} />;
  }
};
export default HeaderTable;
