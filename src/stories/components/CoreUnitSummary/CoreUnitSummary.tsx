import styled from '@emotion/styled';
import { Collapse, Typography, useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { useCoreUnitsTable } from '@/views/CUTable/useCoreUnitsTable';
import lightTheme from '../../../../styles/theme/themes';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { buildQueryString } from '../../../core/utils/urls';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import BreadcrumbMobile from '../Pagination/BreadcrumbMobile';
import InsidePagination from '../Pagination/InsidePagination';
import TitleNavigationCuAbout from '../TitleNavigationCuAbout/TitleNavigationCuAbout';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface CoreUnitSummaryProps {
  coreUnits: CoreUnit[];
  trailingAddress?: string[];
  breadcrumbTitle?: string;
  showDescription?: boolean;
  showHeader?: boolean;
}

export const CoreUnitSummary = forwardRef<HTMLDivElement, CoreUnitSummaryProps>(
  (
    { coreUnits: data = [], trailingAddress = [], breadcrumbTitle, showDescription = false, showHeader = true },
    ref
  ) => {
    const { isLight } = useThemeContext();
    const { sortData } = useCoreUnitsTable();
    const phone = useMediaQuery(lightTheme.breakpoints.between('mobile_375', 'table_834'));
    const lessThanPhone = useMediaQuery(lightTheme.breakpoints.down('mobile_375'));

    const router = useRouter();
    const query = router.query;
    const code = query.code as string;

    const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
    const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
    const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

    const cu = data?.find((cu) => cu.shortCode === code);
    const buildCULabel = () => (!_.isEmpty(cu) ? `${cu?.shortCode ?? ''} - ${cu?.name}` : '');

    const filteredData = useMemo(() => {
      const { filteredData: filtered } = filterData({
        data: data as CoreUnit[],
        filteredStatuses,
        filteredCategories,
        searchText,
      });
      return sortData(filtered);
    }, [data, filteredCategories, filteredStatuses, searchText, sortData]);

    const page = useMemo(() => filteredData?.findIndex((item) => item.shortCode === code) + 1, [code, filteredData]);

    const queryStrings = buildQueryString({
      ...router.query,
      filteredStatuses,
      filteredCategories,
      searchText,
      code: null, // override the Core Unit code to avoid add it to the query string
    });

    const changeCoreUnitCode = useCallback(
      (direct: -1 | 1) => () => {
        const index = filteredData?.findIndex((item) => item.shortCode === code);
        const newIndex = index + direct;
        if (newIndex >= 0 && newIndex < filteredData?.length) {
          router.push(`${router.route.replace('[code]', filteredData[newIndex].shortCode)}${queryStrings}`);
        }
      },
      [code, filteredData, queryStrings, router]
    );

    return (
      <Container ref={ref} isLight={isLight}>
        {!(phone || lessThanPhone) && (
          <NavigationHeader className="no-select" isLight={isLight}>
            <Breadcrumbs
              items={[
                {
                  label: (
                    <CoreUnitStyle isLight={isLight}>
                      Core Units <b>({filteredData.length})</b>
                    </CoreUnitStyle>
                  ),
                  url: `${siteRoutes.coreUnitsOverview}/${queryStrings}`,
                },
                {
                  label: buildCULabel(),
                  url: `${siteRoutes.coreUnitAbout(code)}/${queryStrings}`,
                },
                ...trailingAddress.map((adr) => ({
                  label: adr,
                  url: router.asPath,
                })),
              ]}
            />
            <InsidePagination
              count={filteredData.length}
              page={page}
              onClickLeft={changeCoreUnitCode(-1)}
              onClickRight={changeCoreUnitCode(1)}
            />
          </NavigationHeader>
        )}
        {(phone || lessThanPhone) && (
          <div style={{ margin: '16px' }}>
            <div>
              <BreadcrumbMobile
                items={[
                  ...trailingAddress.map((adr) => ({
                    style: breadcrumbTitle === adr ? { color: isLight ? '#25273D' : '#D2D4EF' } : undefined,
                    label: adr,
                    url: router.asPath,
                  })),
                  {
                    style: [buildCULabel(), undefined].includes(breadcrumbTitle)
                      ? { color: isLight ? '#25273D' : '#D2D4EF' }
                      : undefined,
                    label: buildCULabel(),
                    url: `${siteRoutes.coreUnitAbout(code)}/${queryStrings}`,
                  },

                  {
                    label: (
                      <span>
                        Core Units <Value isLight={isLight}>({filteredData.length})</Value>
                      </span>
                    ),
                    url: `${siteRoutes.coreUnitsOverview}/${queryStrings}`,
                  },
                ]}
                title={breadcrumbTitle || buildCULabel()}
                count={filteredData.length}
                onClickLeft={changeCoreUnitCode(-1)}
                onClickRight={changeCoreUnitCode(1)}
                page={page}
              />
            </div>
          </div>
        )}
        <Wrapper>
          <Collapse in={showHeader} timeout={300} unmountOnExit style={{ width: '100%' }}>
            <ContainerTitle>
              <>
                <TitleNavigationCuAbout coreUnitAbout={cu} />
                {showDescription && (
                  <SummaryDescription>
                    <TypographyDescription isLight={isLight}>{cu?.sentenceDescription || ''}</TypographyDescription>
                  </SummaryDescription>
                )}
              </>
            </ContainerTitle>
          </Collapse>
        </Wrapper>

        <ContainerResponsiveMobile showHeader={showHeader} isLight={isLight} />
      </Container>
    );
  }
);

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'fixed',
  top: 64,
  width: '100%',
  background: isLight ? '#FFFFFF' : '#25273D',
  backgroundImage: isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
  backgroundSize: 'cover',
  zIndex: 3,
  borderBottom: isLight ? '1px solid #B6EDE7' : '1px solid #027265',
}));

const NavigationHeader = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '50px',
  paddingLeft: '32px',
  paddingRight: '32px',
  background: isLight ? 'none' : 'url(/assets/img/overlay.png)',
  backgroundSize: 'cover',
}));

const ContainerTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'fit-content',
  transition: 'all .3s ease',

  paddingTop: 24,

  [lightTheme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingLeft: '48px',
    paddingRight: '48px',
  },
  [lightTheme.breakpoints.between('table_834', 'desktop_1280')]: {
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
  },
  [lightTheme.breakpoints.down('mobile_375')]: {
    overflow: 'hidden',
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
  maxWidth: '100%',
  margin: '0 auto',
  [lightTheme.breakpoints.up('desktop_1440')]: {
    maxWidth: '1312px',
  },
});

const SummaryDescription = styled.div({});

const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  color: isLight ? '#231536' : '#E2D8EE',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  marginTop: '16px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    marginTop: '16px',
  },
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    marginTop: '8px',
    width: '100%',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

const Value = styled.b<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: isLight ? '#708390' : '#48495F',
}));

const CoreUnitStyle = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  color: isLight ? '#708390' : '#787A9B',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '22px',
  '> b': {
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
  },
}));

const ContainerResponsiveMobile = styled.div<{ isLight: boolean; showHeader: boolean }>(({ showHeader }) => ({
  position: 'relative',
  width: '100%',
  marginTop: showHeader ? '24px' : 0,
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    marginTop: showHeader ? '16px' : '0px',
  },
}));
