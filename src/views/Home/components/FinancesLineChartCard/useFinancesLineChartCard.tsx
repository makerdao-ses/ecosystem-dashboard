import { useState } from 'react';

export enum ExpenseBreakdownFilterOptions {
  REALIZED_EXPENSES = 1,
  OPERATIONAL_RESERVES = 2,
  FORECAST = 3,
}

const useFinancesLineChartCard = () => {
  const [activeTab, setActiveTab] = useState<ExpenseBreakdownFilterOptions>(
    ExpenseBreakdownFilterOptions.REALIZED_EXPENSES
  );
  const handleActiveTab = (index: ExpenseBreakdownFilterOptions) => {
    setActiveTab(index);
  };

  return {
    activeTab,
    handleActiveTab,
  };
};

export default useFinancesLineChartCard;
