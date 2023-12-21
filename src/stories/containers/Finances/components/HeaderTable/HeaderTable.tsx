import { useMediaQuery } from '@mui/material';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import HeaderAnnually from './HeaderAnnually/HeaderAnnually';
import HeaderMonthly from './HeaderMonthly/HeaderMonthly';
import HeaderQuarterly from './HeaderQuarterly/HeaderQuarterly';
import HeaderSemiAnnual from './HeaderSemiAnnual/HeaderSemiAnnual';
import type { MetricValues, PeriodicSelectionFilter } from '../../utils/types';

interface Props {
  period: PeriodicSelectionFilter;
  title: string;
  year: string;
  headerTable: MetricValues[];
  activeMetrics: string[];
}

const HeaderTable: React.FC<Props> = ({ title, year, period, headerTable, activeMetrics }) => {
  const isPhone = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  if (isPhone && period === 'Semi-annual') {
    return (
      <HeaderSemiAnnual
        headerTable={headerTable}
        activeMetrics={activeMetrics}
        period={period}
        title={title}
        year={year}
      />
    );
  } else {
    if (period === 'Annually') {
      return <HeaderAnnually year={year} title={title} headerTable={headerTable} activeMetrics={activeMetrics} />;
    }
    if (period === 'Monthly') {
      return <HeaderMonthly headerTable={headerTable} activeMetrics={activeMetrics} title={title} />;
    }
    return <HeaderQuarterly headerTable={headerTable} activeMetrics={activeMetrics} title={title} year={year} />;
  }
};
export default HeaderTable;
