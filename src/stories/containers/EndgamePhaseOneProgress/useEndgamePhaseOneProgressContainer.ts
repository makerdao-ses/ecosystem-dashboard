import { useThemeContext } from '@ses/core/context/ThemeContext';

const useEndgamePhaseOneProgressContainer = () => {
  const { isLight } = useThemeContext();

  return { isLight };
};

export default useEndgamePhaseOneProgressContainer;
