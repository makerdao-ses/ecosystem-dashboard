import sortBy from 'lodash/sortBy';
import { NextRouter } from 'next/router';
import { useMemo, useCallback } from 'react';
import { getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-unit-about';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CoreUnitDto, CuMipDto } from '../../../core/models/dto/core-unit.dto';
import { getArrayParam, getStringParam } from '../../../core/utils/filters';
import { buildQueryString } from '../../../core/utils/url.utils';

interface Props {
  cuAbout: CoreUnitDto;
  code: string;
  router: NextRouter;
  setShowThreeMIPs: (value: boolean) => void;
  showThreeMIPs: boolean;
}

export const useCuAboutMvvm = ({ cuAbout, code, router, setShowThreeMIPs, showThreeMIPs }: Props) => {
  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const onClickLessMips = () => {
    setShowThreeMIPs(!showThreeMIPs);
  };
  const relateMipsOrder = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMipDto) => getRelateMipObjectFromCoreUnit(mip));
    const order = sortBy(buildNewArray, ['orderBy', 'dateMip']).reverse();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const countNumberAccepted = order.filter((mip: any) => mip.mipStatus === CuStatusEnum.Accepted);
    const resultArrayThreeElements = showThreeMIPs ? order.slice(0, countNumberAccepted.length) : order;
    return resultArrayThreeElements;
  }, [cuAbout.cuMip, showThreeMIPs]);

  const hasMipsNotAccepted = useMemo(() => {
    const buildNewArray = cuAbout.cuMip.map((mip: CuMipDto) => getRelateMipObjectFromCoreUnit(mip));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return buildNewArray.some((mip: any) => mip.mipStatus !== CuStatusEnum.Accepted);
  }, [cuAbout.cuMip]);

  const onClickFinances = useCallback(() => {
    const queryStrings = buildQueryString({
      filteredStatuses,
      filteredCategories,
      searchText,
    });
    router.push(`/core-unit/${code}/finances/reports${queryStrings}`);
  }, [filteredCategories, filteredStatuses, router, searchText, code]);

  const onClickActivity = useCallback(() => {
    const queryStrings = buildQueryString({
      filteredStatuses,
      filteredCategories,
      searchText,
    });
    router.push(`/core-unit/${code}/activity${queryStrings}`);
  }, [filteredCategories, filteredStatuses, router, searchText, code]);

  return {
    onClickLessMips,
    relateMipsOrder,
    hasMipsNotAccepted,
    onClickFinances,
    showThreeMIPs,
    setShowThreeMIPs,
    onClickActivity,
  };
};
