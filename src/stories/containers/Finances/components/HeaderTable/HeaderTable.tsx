import React from 'react';
import { monthAbbreviations } from '../../utils/utils';

import HeaderAnnually from './HeaderAnnually/HeaderAnnually';
import HeaderMonthly from './HeaderMonthly/HeaderMonthly';

import HeaderQuarterly from './HeaderQuarterly/HeaderQuarterly';
import type { MetricsWithAmount } from '../../utils/types';

interface Props {
  metrics: MetricsWithAmount[];
  period: string;
  title: string;
  year: string;
  metricTotal: MetricsWithAmount[];
}

const HeaderTable: React.FC<Props> = ({ title, metrics, year, period, metricTotal }) => {
  if (period === 'Annually') {
    return <HeaderAnnually metrics={metrics} year={year} title={title} />;
  }
  if (period === 'Monthly') {
    return <HeaderMonthly metrics={metrics} months={monthAbbreviations} title={title} />;
  }
  return <HeaderQuarterly metricTotal={metricTotal} metrics={metrics} title={title} year={year} />;
};

export default HeaderTable;
