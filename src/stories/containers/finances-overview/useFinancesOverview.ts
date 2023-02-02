import { useThemeContext } from '@ses/core/context/ThemeContext';

const useFinancesOverview = () => {
  const { isLight } = useThemeContext();

  return {
    isLight,
  };
};

export default useFinancesOverview;
