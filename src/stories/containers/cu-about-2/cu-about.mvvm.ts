import useMediaQuery from '@mui/material/useMediaQuery';
import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import { useState, useMemo, useCallback } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { getRelateMipObjectFromCoreUnit } from '../../../core/business-logic/core-unit-about';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { useFlagsActive } from '../../../core/hooks/useFlagsActive';
import { CoreUnitDto, CuMipDto } from '../../../core/models/dto/core-unit.dto';
import { getArrayParam, getStringParam } from '../../../core/utils/filters';
import { buildQueryString } from '../../../core/utils/url.utils';

interface Props {
  cuAbout: CoreUnitDto;
  code: string;
}

export const useCuAboutMvvm = ({ cuAbout, code }: Props) => {
  const [isEnabled] = useFlagsActive();
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();
  const [showThreeMIPs, setShowThreeMIPs] = useState<boolean>(true);

  const table834 = useMediaQuery(lightTheme.breakpoints.between('table_834', 'desktop_1194'));
  const phone = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const LessPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  const lessDesktop1194 = useMediaQuery(lightTheme.breakpoints.down('desktop_1194'));

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

  return {
    isEnabled,
    isLight,
    table834,
    phone,
    LessPhone,
    lessDesktop1194,
    onClickLessMips,
    relateMipsOrder,
    hasMipsNotAccepted,
    onClickFinances,
    showThreeMIPs,
    setShowThreeMIPs,
  };
};
