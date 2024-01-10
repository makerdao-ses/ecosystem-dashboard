import { useThemeContext } from '@ses/core/context/ThemeContext';

const useRoadmapMilestonesContainer = () => {
  const { isLight } = useThemeContext();

  return { isLight };
};

export default useRoadmapMilestonesContainer;
