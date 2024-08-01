import { useState } from 'react';

const useRoadmap = () => {
  const [activeTab, setActiveTab] = useState('1');
  const handleActiveTab = (id: string) => {
    setActiveTab(id);
  };

  return {
    activeTab,
    handleActiveTab,
  };
};

export default useRoadmap;
