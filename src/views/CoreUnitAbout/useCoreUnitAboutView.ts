import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import { useMemo, useCallback } from 'react';
import { getRelateMipObjectFromCoreUnit } from '@/core/businessLogic/coreUnitAbout';
import { TeamStatus } from '@/core/models/interfaces/types';
import { getArrayParam, getStringParam } from '@/core/utils/filters';
import { buildQueryString } from '@/core/utils/urls';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';
import type { CuMip } from '@ses/core/models/interfaces/cuMip';

interface Props {
  cuAbout: CoreUnit;
  coreUnits: CoreUnit[];
  code: string;
  setShowThreeMIPs: (value: boolean) => void;
  showThreeMIPs: boolean;
}

export const useCoreUnitAboutView = ({ cuAbout, coreUnits, code, setShowThreeMIPs, showThreeMIPs }: Props) => {
  const router = useRouter();
  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const onClickLessMips = () => {
    setShowThreeMIPs(!showThreeMIPs);
  };
  const relateMipsOrder = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMip) => getRelateMipObjectFromCoreUnit(mip));
    const order = sortBy(buildNewArray, ['orderBy', 'dateMip']).reverse();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countNumberAccepted = order.filter((mip: any) => mip.mipStatus === TeamStatus.Accepted);
    const resultArrayThreeElements = showThreeMIPs ? order.slice(0, countNumberAccepted.length) : order;
    return resultArrayThreeElements;
  }, [cuAbout.cuMip, showThreeMIPs]);

  const hasMipsNotAccepted = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMip) => getRelateMipObjectFromCoreUnit(mip));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return buildNewArray.some((mip: any) => mip.mipStatus !== TeamStatus.Accepted);
  }, [cuAbout.cuMip]);

  const queryStrings = useMemo(
    () =>
      buildQueryString({
        filteredStatuses,
        filteredCategories,
        searchText,
      }),
    [filteredCategories, filteredStatuses, searchText]
  );

  const onClickFinances = useCallback(() => {
    router.push(`/core-unit/${code}/finances/reports${queryStrings}`);
  }, [router, code, queryStrings]);

  const onClickActivity = useCallback(() => {
    router.push(`/core-unit/${code}/activity-feed${queryStrings}`);
  }, [router, code, queryStrings]);

  // breadcrumb pager
  const filteredData = useMemo(
    // apply filters coming from the index page to the pagination
    () =>
      coreUnits.filter((cu) => {
        if (filteredCategories.length > 0 && !cu.category.some((category) => filteredCategories.includes(category))) {
          return false;
        }
        if (filteredStatuses.length > 0 && !filteredStatuses.includes(cu.status)) {
          return false;
        }
        if (
          !!router.query.searchText &&
          !cu.name.toLowerCase().includes((router.query.searchText as string).toLowerCase())
        ) {
          return false;
        }

        return true;
      }),
    [coreUnits, filteredCategories, filteredStatuses, router.query.searchText]
  );

  const currentPage = filteredData.findIndex((item) => item.shortCode === cuAbout.shortCode) + 1;
  const totalPages = filteredData.length;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const changeTeam = useCallback(
    (direction: -1 | 1) => () => {
      const index = filteredData?.findIndex((item) => item.shortCode === cuAbout.shortCode);
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
    [cuAbout.shortCode, filteredCategories, filteredData, router]
  );

  return {
    onClickLessMips,
    relateMipsOrder,
    hasMipsNotAccepted,
    onClickFinances,
    showThreeMIPs,
    setShowThreeMIPs,
    onClickActivity,
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
