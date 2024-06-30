import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import type { Team } from '@/core/models/interfaces/team';
import { getArrayParam } from '@/core/utils/filters';
import { buildQueryString } from '@/core/utils/urls';

export const useBreadcrumbTeamPager = (team: Team, teams: Team[]) => {
  const router = useRouter();

  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const filteredScopes = useMemo(() => getArrayParam('filteredScopes', router.query), [router.query]);

  // breadcrumb pager
  const filteredData = useMemo(
    // apply filters coming from the index page to the pagination
    () =>
      teams.filter((actor) => {
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
    [teams, filteredCategories, filteredScopes, router.query.searchText]
  );

  const currentPage = filteredData.findIndex((item) => item.shortCode === team.shortCode) + 1;
  const totalPages = filteredData.length;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const changeTeam = useCallback(
    (direction: -1 | 1) => () => {
      const index = filteredData?.findIndex((item) => item.shortCode === team.shortCode);
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
    [team.shortCode, filteredCategories, filteredData, router]
  );

  return {
    currentPage,
    totalPages,
    hasPrevious,
    hasNext,
    onNext: changeTeam(1),
    onPrevious: changeTeam(-1),
  };
};
