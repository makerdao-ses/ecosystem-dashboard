import { siteRoutes } from '@ses/config/routes';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const useEndgameAtlasBudget = () => {
  const router = useRouter();
  const [year, setYears] = useState<string>('2022');

  const handleChangeYearsEndgameAtlasBudget = (value: string) => {
    setYears(value);
  };

  const breadcrumb = ['Endgame Atlas Budget'];
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
    handleChangeYearsEndgameAtlasBudget,
    year,
  };
};
