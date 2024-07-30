import { useState } from 'react';

const useFinancesLineChartCard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTab = (index: number) => {
    setActiveTab(index);
  };

  return {
    activeTab,
    handleActiveTab,
  };
};

export default useFinancesLineChartCard;
