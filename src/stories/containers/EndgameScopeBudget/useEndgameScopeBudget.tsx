import { siteRoutes } from '@ses/config/routes';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useEndgameScopeBudget = () => {
  const router = useRouter();
  const [year, setYears] = useState<string>('2022');

  const handleChangeYearsEndgameScopeBudget = (value: string) => {
    setYears(value);
  };

  const breadcrumb = ['Endgame Scope Budget'];
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
    handleChangeYearsEndgameScopeBudget,
    year,
  };
};
