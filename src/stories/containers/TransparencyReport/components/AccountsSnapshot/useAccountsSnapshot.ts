import { useThemeContext } from '@ses/core/context/ThemeContext';

const useAccountsSnapshot = () => {
  const { isLight } = useThemeContext();

  return {
    isLight,
  };
};

export default useAccountsSnapshot;
