import { useRef } from 'react';

import type { EChartsOption } from 'echarts-for-react';

const useFinancesLineChart = () => {
  const financesLineChartRef = useRef<EChartsOption>(null);

  return {
    financesLineChartRef,
  };
};

export default useFinancesLineChart;
