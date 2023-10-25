import useMediaQuery from '@mui/material/useMediaQuery';
import { siteRoutes } from '@ses/config/routes';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useMakerDAOLegacyBudget = () => {
  const router = useRouter();
  const { isLight } = useThemeContext();
  const [year, setYears] = useState<string>('2022');
  const isMobile = useMediaQuery(lightTheme.breakpoints.down('tablet_768'));

  const handleChangeYearsEMakerDAOLegacyBudget = (value: string) => {
    setYears(value);
  };

  const breadcrumbs = ['MakerDAO Legacy Budget'];
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
    handleChangeYearsEMakerDAOLegacyBudget,
    year,
    trailingAddressDesk,
    isMobile,
  };
};
