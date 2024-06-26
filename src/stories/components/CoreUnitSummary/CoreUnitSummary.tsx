import { Collapse, Typography, styled, useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { useCoreUnitsTableView } from '@/views/CoreUnits/useCoreUnitsTableView';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { buildQueryString } from '../../../core/utils/urls';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import BreadcrumbMobile from '../Pagination/BreadcrumbMobile';
import InsidePagination from '../Pagination/InsidePagination';
import TitleNavigationCuAbout from '../TitleNavigationCuAbout/TitleNavigationCuAbout';
import type { Theme } from '@mui/material';
import type { CoreUnit } from '@ses/core/models/interfaces/coreUnit';

interface CoreUnitSummaryProps {
  coreUnits: CoreUnit[];
  trailingAddress?: string[];
  breadcrumbTitle?: string;
  showDescription?: boolean;
  showHeader?: boolean;
  className?: string;
}

export const CoreUnitSummary = forwardRef<HTMLDivElement, CoreUnitSummaryProps>(
  (
    {
      coreUnits: data = [],
      trailingAddress = [],
      breadcrumbTitle,
      showDescription = false,
      showHeader = true,
      className,
    },
    ref
  ) => {
    const { isLight } = useThemeContext();
    const { sortData } = useCoreUnitsTableView(data);
    const phone = useMediaQuery((theme: Theme) => theme.breakpoints.between('mobile_375', 'tablet_768'));
    const lessThanPhone = useMediaQuery((theme: Theme) => theme.breakpoints.down('mobile_375'));

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
      <Container ref={ref} isLight={isLight} className={className}>
        {!(phone || lessThanPhone) && (
          <NavigationHeader className="no-select">
            <Breadcrumbs
              items={[
                {
                  label: (
                    <CoreUnitStyle>
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
                        Core Units <Value>({filteredData.length})</Value>
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

        <ContainerResponsiveMobile showHeader={showHeader} />
      </Container>
    );
  }
);

const Container = styled('div')<{ isLight: boolean }>(({ theme }) => ({
  position: 'fixed',
  top: 64,
  width: '100%',
  background: theme.palette.isLight ? '#FFFFFF' : '#25273D',
  backgroundImage: theme.palette.isLight ? 'url(/assets/img/Subheader.png)' : 'url(/assets/img/Subheader-dark.png)',
  backgroundSize: 'cover',
  zIndex: 3,
  borderBottom: theme.palette.isLight ? '1px solid #B6EDE7' : '1px solid #027265',
  [theme.breakpoints.up('tablet_768')]: {
    top: 98,
  },
}));

const NavigationHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '50px',
  paddingLeft: '32px',
  paddingRight: '32px',
  background: theme.palette.isLight ? 'none' : 'url(/assets/img/overlay.png)',
  backgroundSize: 'cover',
}));

const ContainerTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'fit-content',
  transition: 'all .3s ease',

  paddingTop: 24,

  [theme.breakpoints.between('desktop_1280', 'desktop_1440')]: {
    paddingLeft: '48px',
    paddingRight: '48px',
  },
  [theme.breakpoints.between('tablet_768', 'desktop_1280')]: {
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
  },
  [theme.breakpoints.down('mobile_375')]: {
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
  },
}));

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '100%',
  margin: '0 auto',
  [theme.breakpoints.up('desktop_1440')]: {
    maxWidth: '1312px',
  },
}));

const SummaryDescription = styled('div')({});

const TypographyDescription = styled(Typography)<{
  isLight: boolean;
}>(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  color: theme.palette.isLight ? '#231536' : '#E2D8EE',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  marginTop: '16px',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    marginTop: '16px',
  },
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    marginTop: '8px',
    width: '100%',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '18px',
  },
}));

const Value = styled('b')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  color: theme.palette.isLight ? '#708390' : '#48495F',
}));

const CoreUnitStyle = styled('span')(({ theme }) => ({
  color: theme.palette.isLight ? '#708390' : '#787A9B',
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

const ContainerResponsiveMobile = styled('div')<{ showHeader: boolean }>(({ showHeader, theme }) => ({
  position: 'relative',
  width: '100%',
  marginTop: showHeader ? '24px' : 0,
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    marginTop: showHeader ? '16px' : '0px',
  },
}));
