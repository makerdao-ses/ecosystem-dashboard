import { siteRoutes } from '@ses/config/routes';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useMakerDAOLegacyBudget = () => {
  const router = useRouter();
  const [year, setYears] = useState<string>('2022');

  const handleChangeYearsEMakerDAOLegacyBudget = (value: string) => {
    setYears(value);
  };

  const breadcrumb = ['MakerDAO Legacy Budget'];
  const trailingAddress = [
    {
      label: 'Finances',
      url: `${siteRoutes.newFinancesOverview}`,
    },
    ...breadcrumb.map((adr) => ({
      label: adr,
      url: router.asPath,
    })),
  ];
  return {
    breadcrumb,
    trailingAddress,
    handleChangeYearsEMakerDAOLegacyBudget,
    year,
  };
};
