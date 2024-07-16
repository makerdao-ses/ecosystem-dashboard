import { useState } from 'react';

const useHeaderCard = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const handleIsExpanded = (expanded: boolean) => {
    setIsExpanded(expanded);
  };

  const [activeButtonIndex, setActiveButtonIndex] = useState(0);
  const handleActiveButtonIndex = (index: number) => {
    setActiveButtonIndex(index);
  };

  return {
    isExpanded,
    handleIsExpanded,
    activeButtonIndex,
    handleActiveButtonIndex,
  };
};

export default useHeaderCard;
