import { useThemeContext } from '@ses/core/context/ThemeContext';

const useRoadmapMilestonesView = () => {
  const { isLight } = useThemeContext();

  return { isLight };
};

export default useRoadmapMilestonesView;
