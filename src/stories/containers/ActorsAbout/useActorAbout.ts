import { useMediaQuery } from '@mui/material';
import { getArrayParam } from '@ses/core/utils/filters';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/light';
import { useMemo } from 'react';
import type { NextRouter } from 'next/router';

interface Props {
  router: NextRouter;
  code: string;
}

const useActorAboutAbout = ({ router, code }: Props) => {
  console.log('code', code);
  const table834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phone = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const LessPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const queryStrings = useMemo(
    () =>
      buildQueryString({
        filteredCategories,
      }),
    [filteredCategories]
  );

  return {
    table834,
    phone,
    LessPhone,
    queryStrings,
  };
};

export default useActorAboutAbout;
