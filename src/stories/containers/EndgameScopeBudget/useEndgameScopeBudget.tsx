import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useEndgameScopeBudget = () => {
  const router = useRouter();
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));
  const { isLight } = useThemeContext();
  const [year, setYears] = useState<string>('2022');

  const handleChangeYearsEndgameScopeBudget = (value: string) => {
    setYears(value);
  };

  const breadcrumbs = ['Endgame Scope Budget'];

  const trailingAddressDesk = [
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}`,
    },
    ...breadcrumbs.map((adr) => ({
      label: adr,
      url: router.asPath,
    })),
  ];
  const trailingAddress = [
    ...breadcrumbs.map((adr) => ({
      label: adr,
      url: router.asPath,
      style: { color: isLight ? '#25273D' : '#D2D4EF' },
    })),
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}`,
    },
  ];
  return {
    breadcrumbs,
    trailingAddress,
    trailingAddressDesk,
    handleChangeYearsEndgameScopeBudget,
    year,
    isMobile,
  };
};
