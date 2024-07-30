import { useRef } from 'react';

import type { EChartsOption } from 'echarts-for-react';

const useFinancesBarChart = () => {
  const financesBarChartRef = useRef<EChartsOption>(null);

  return {
    financesBarChartRef,
  };
};

export default useFinancesBarChart;
