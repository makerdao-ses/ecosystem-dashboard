import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import InsidePagination from '../pagination/InsidePagination';
import TitleNavigationCuAbout from '../title-navigation-cu-about/title-navigation-cu-about';
import { Typography, useMediaQuery } from '@mui/material';
import styled from '@emotion/styled';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { useRouter } from 'next/router';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { useCoreUnitSummaryViewModel } from './core-unit-summary.mvvm';
import _ from 'lodash';
import lightTheme from '../../../../styles/theme/light';
import BreadCrumbMobile from '../pagination/bread-crumb-mobile';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { formatCode } from '../../../core/utils/string.utils';
import { buildQueryString } from '../../../core/utils/url.utils';
import { sortData } from '../../containers/cu-table/cu-table';

interface CoreUnitSummaryProps {
  trailingAddress?: string[];
}

export const CoreUnitSummary = ({ trailingAddress = [] }: CoreUnitSummaryProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const phone = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const lessThanPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  const [hiddenTextDescription, setHiddenTextDescription] = useState(true);
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  const { data: response } = useCoreUnitSummaryViewModel();

  const data: CoreUnitDto[] = response?.coreUnits as CoreUnitDto[];
  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const cu = data?.find(cu => cu.shortCode === code);
  const buildCULabel = () => !_.isEmpty(cu) ? `${formatCode(cu?.code ?? '')} - ${cu?.name}` : '';

  const ref = useRef(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounceFunction = _.debounce(() => setHiddenTextDescription(((ref?.current as any)?.offsetTop ?? 0) <= 65), 27);

  const handleScroll = () => {
    debounceFunction();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    // Remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  const filteredData = useMemo(() => {
    const { filteredData: filtered } = filterData({
      data,
      filteredStatuses,
      filteredCategories,
      searchText
    });
    return sortData(filtered);
  }, [data, filteredCategories, filteredStatuses, searchText]);

  const page = useMemo(() => filteredData?.findIndex(item => item.shortCode === code) + 1, [code, filteredData]);

  const queryStrings = buildQueryString({
    filteredStatuses,
    filteredCategories,
    searchText
  });

  const changeCoreUnitCode = useCallback(
    (direct: -1 | 1) => () => {
      const index = filteredData?.findIndex(item => item.shortCode === code);
      const newIndex = index + direct;
      if (newIndex >= 0 && newIndex < filteredData?.length) {
        router.push(`${router.route.replace('[code]', filteredData[newIndex].shortCode)}${queryStrings}`);
      }
    },
    [code, filteredData, router]);

  return <Container ref={ref} isLight={isLight}>
    {!(phone || lessThanPhone) && <NavigationHeader className="no-select" isLight={isLight}>
      <Breadcrumbs items={[
        {
          label: <CoreUnitStyle isLight={isLight}>Core Units <b>({filteredData.length})</b></CoreUnitStyle>,
          url: `/${queryStrings}`
        },
        {
          label: buildCULabel(),
          url: `/core-unit/${code}/${queryStrings}`
        },
        ...trailingAddress.map(adr => ({
          label: adr,
          url: ''
        }))
      ]} />
      <InsidePagination count={filteredData.length} page={page} onClickLeft={changeCoreUnitCode(-1)} onClickRight={changeCoreUnitCode(1)} />
    </NavigationHeader>}
    {(phone || lessThanPhone) && <div style={{
      margin: '16px',
    }}><div>
        <BreadCrumbMobile
          items={[
            {
              style: {
                color: isLight ? '#25273D' : '#D2D4EF',
              },
              label: buildCULabel(),
              url: `/core-unit/${code}/${queryStrings}`
            },
            ...trailingAddress.map(adr => ({
              label: adr,
              url: ''
            })),
            {
              label: <span >Core Units <Value isLight={isLight}>({page})</Value></span>,
              url: `/${queryStrings}`
            },
          ]}
          title={buildCULabel()} count={filteredData.length} onClickLeft={changeCoreUnitCode(-1)} onClickRight={changeCoreUnitCode(1)} page={page} /></div>
    </div>}

    <Wrapper>
      <ContainerTitle>
        <TitleNavigationCuAbout coreUnitAbout={cu} hiddenTextDescription={hiddenTextDescription} />
          <SummaryDescription hiddenTextDescription={hiddenTextDescription}>
            <TypographyDescription isLight={isLight}>
              {cu?.sentenceDescription || ''}
            </TypographyDescription>
          </SummaryDescription>
      </ContainerTitle>
    </Wrapper>
    <ContainerResponsiveMobile hiddenTextDescription={hiddenTextDescription} isLight={isLight} />
  </Container>;
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'sticky',
  top: 64,
  width: '100%',
  backgroundImage: isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
  backgroundSize: 'cover',
  zIndex: 3,
}));

const NavigationHeader = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '74px',
  paddingLeft: '32px',
  paddingRight: '32px',
  marginBottom: '16px',
  background: isLight ? 'none' : 'url(/assets/img/overlay.png)',
  backgroundSize: 'cover',
}));

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'fit-content',
  transition: 'all .3s ease',
  paddingTop: '8px',
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingLeft: '48px',
    paddingRight: '48px',
  },
  [lightTheme.breakpoints.between('desktop_1194', 'desktop_1280')]: {
    paddingLeft: '27px',
    paddingRight: '27px',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
  },
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1184px',
  margin: '0 auto',
  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    maxWidth: '100%',
  },
});

const SummaryDescription = styled.div<{ hiddenTextDescription: boolean }>(({ hiddenTextDescription }) => ({
  opacity: hiddenTextDescription ? 1 : 0,
  height: hiddenTextDescription ? 'auto' : 0,
  transition: 'all 0.85s ease',
  overflow: 'hidden',
}));

const TypographyDescription = styled(Typography)<{ isLight: boolean }>(({ isLight }) => ({
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#231536' : '#E2D8EE',
  fontFamily: 'FT Base, sans-serif',
  marginTop: '16px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: '16px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginTop: '8px',
    width: '100%',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '14px'
  },
}));

const Value = styled.b<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#708390' : '#48495F'
}));

const CoreUnitStyle = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#708390' : '#787A9B',
}));

const ContainerResponsiveMobile = styled.div<{ isLight: boolean, hiddenTextDescription: boolean }>(({ isLight, hiddenTextDescription }) => ({
  position: 'relative',
  borderBottom: hiddenTextDescription && isLight ? '1px solid #B6EDE7' : hiddenTextDescription && !isLight ? '1px solid #027265' : 'none',
  width: '100%',
  marginTop: '24px',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    marginTop: hiddenTextDescription ? '16px' : '0px',
  },

}));
