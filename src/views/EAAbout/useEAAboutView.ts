import { useMediaQuery } from '@mui/material';
import { getArrayParam } from '@ses/core/utils/filters';
import { buildQueryString } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import type { Team } from '@/core/models/interfaces/team';

const useEAAboutView = (actors: Team[], actor: Team) => {
  const router = useRouter();
  const table834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phone = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));
  const LessPhone = useMediaQuery(lightTheme.breakpoints.down('mobile_375'));
  // This is for the filter of Actors List
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const filteredScopes = useMemo(() => getArrayParam('filteredScopes', router.query), [router.query]);
  const queryStrings = useMemo(
    () =>
      buildQueryString({
        ...router.query,
        code: null,
      }),
    [router.query]
  );

  // breadcrumb pager
  const filteredData = useMemo(
    // apply filters coming from the index page to the pagination
    () =>
      actors.filter((actor) => {
        if (
          filteredCategories.length > 0 &&
          !actor.category.some((category) => filteredCategories.includes(category))
        ) {
          return false;
        }
        if (
          filteredScopes.length > 0 &&
          !actor.scopes?.some((scope) => filteredScopes.includes(scope.name.replace(' ', '')))
        ) {
          return false;
        }
        if (
          !!router.query.searchText &&
          !actor.name.toLowerCase().includes((router.query.searchText as string).toLowerCase())
        ) {
          return false;
        }

        return true;
      }),
    [actors, filteredCategories, filteredScopes, router.query.searchText]
  );

  const currentPage = filteredData.findIndex((item) => item.shortCode === actor.shortCode) + 1;
  const totalPages = filteredData.length;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const changeTeam = useCallback(
    (direction: -1 | 1) => () => {
      const index = filteredData?.findIndex((item) => item.shortCode === actor.shortCode);
      const newIndex = index + direction;
      if (newIndex >= 0 && newIndex < filteredData?.length) {
        const queryStrings = buildQueryString({
          ...router.query,
          filteredCategories,
          code: null, // override the Actors code to avoid add it to the query string
        });

        router.push(`${router.route.replace('[code]', filteredData[newIndex].shortCode)}${queryStrings}`);
      }
    },
    [actor.shortCode, filteredCategories, filteredData, router]
  );

  return {
    table834,
    phone,
    LessPhone,
    queryStrings,
    pager: {
      currentPage,
      totalPages,
      hasPrevious,
      hasNext,
      onNext: changeTeam(1),
      onPrevious: changeTeam(-1),
    },
  };
};

export default useEAAboutView;
