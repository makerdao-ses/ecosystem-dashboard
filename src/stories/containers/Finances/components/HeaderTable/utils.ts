export const defaultOrder = ['Budget', 'Forecast', 'Net Protocol Outflow', 'Net Expenses On-chain', 'Actuals'];
export const orderMetrics = (metricOrder = defaultOrder, metricsToOrder: string[]) => {
  const orderedMetrics: string[] = [];

  metricOrder.forEach((metric) => {
    if (metricsToOrder.includes(metric)) {
      orderedMetrics.push(metric);
    }
  });

  return orderedMetrics;
};
