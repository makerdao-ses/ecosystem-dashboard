import React from 'react';
import HeaderQuarterly from './HeaderQuarterly/HeaderQuarterly';
import type { MetricsWithAmount } from '../../utils/types';

interface Props {
  metrics: MetricsWithAmount[];
  title: string;
  year: string;
  metricTotal: MetricsWithAmount[];
}

const HeaderTable: React.FC<Props> = ({ title, metrics, year, metricTotal }) => (
  <HeaderQuarterly metricTotal={metricTotal} metrics={metrics} title={title} year={year} />
);

export default HeaderTable;
