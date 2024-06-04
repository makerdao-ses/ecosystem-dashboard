import { useMediaQuery } from '@mui/material';
import { getArrayParam } from '@ses/core/utils/filters';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import { useMemo } from 'react';
import type { ParsedUrlQuery } from 'querystring';

const useEAAboutView = (query: ParsedUrlQuery) => {
  const table834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phone = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));
  const LessPhone = useMediaQuery(lightTheme.breakpoints.down('mobile_375'));
  // This is for the filter of Actors List
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', query), [query]);
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

export default useEAAboutView;
