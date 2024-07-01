import { useMediaQuery } from '@mui/material';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import type { Team } from '@/core/models/interfaces/team';
import { useBreadcrumbTeamPager } from './hooks';

const useEcosystemActorAboutView = (actors: Team[], actor: Team) => {
  const router = useRouter();
  const table834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phone = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));
  const LessPhone = useMediaQuery(lightTheme.breakpoints.down('mobile_375'));
  // This is for the filter of Actors List
  const queryStrings = useMemo(
    () =>
      buildQueryString({
        ...router.query,
        code: null,
      }),
    [router.query]
  );

  const pager = useBreadcrumbTeamPager(actor, actors);

  return {
    table834,
    phone,
    LessPhone,
    queryStrings,
    pager,
  };
};

export default useEcosystemActorAboutView;
