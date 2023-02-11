import styled from '@emotion/styled';
import { Typography, useMediaQuery } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import _ from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { buildQueryString } from '../../../core/utils/url.utils';
import { sortData } from '../../containers/cu-table/cu-table';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import InsidePagination from '../pagination/InsidePagination';
import BreadCrumbMobile from '../pagination/bread-crumb-mobile';
import TitleNavigationCuAbout from '../title-navigation-cu-about/title-navigation-cu-about';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';

interface CoreUnitSummaryProps {
  coreUnits: CoreUnitDto[];
  trailingAddress?: string[];
  breadcrumbTitle?: string;
  showDescription?: boolean;
}

export const CoreUnitSummary: React.FC<CoreUnitSummaryProps> = ({
  coreUnits: data = [],
  trailingAddress = [],
  breadcrumbTitle,
  showDescription = false,
}) => {
  const { isLight } = useThemeContext();
  const phone = useMediaQuery(lightTheme.breakpoints.between('table_375', 'table_834'));
  const lessThanPhone = useMediaQuery(lightTheme.breakpoints.down('table_375'));
  const [hiddenTextDescription, setHiddenTextDescription] = useState(true);
  const router = useRouter();
  const query = router.query;
  const code = query.code as string;

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);
  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);

  const cu = data?.find((cu) => cu.shortCode === code);
  const buildCULabel = () => (!_.isEmpty(cu) ? `${cu?.shortCode ?? ''} - ${cu?.name}` : '');

  const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    _.debounce(() => {
      setHiddenTextDescription((ref?.current?.offsetTop ?? 0) <= 65);
    }, 50),
    []
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    // Remove the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
    };
  }, [handleScroll]);

  const filteredData = useMemo(() => {
    const { filteredData: filtered } = filterData({
      data: data as CoreUnitDto[],
      filteredStatuses,
      filteredCategories,
      searchText,
    });
    return sortData(filtered);
  }, [data, filteredCategories, filteredStatuses, searchText]);

  const page = useMemo(() => filteredData?.findIndex((item) => item.shortCode === code) + 1, [code, filteredData]);

  const queryStrings = buildQueryString({
    filteredStatuses,
    filteredCategories,
    searchText,
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
            <BreadCrumbMobile
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
        <ContainerTitle hiddenTextDescription={hiddenTextDescription}>
          <TitleNavigationCuAbout coreUnitAbout={cu} hiddenTextDescription={hiddenTextDescription} />
          {showDescription && (
            <SummaryDescription hiddenTextDescription={lessThanPhone || phone || hiddenTextDescription}>
              <TypographyDescription isLight={isLight}>{cu?.sentenceDescription || ''}</TypographyDescription>
            </SummaryDescription>
          )}
        </ContainerTitle>
      </Wrapper>
      <ContainerResponsiveMobile hiddenTextDescription={hiddenTextDescription} isLight={isLight} />
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'sticky',
  top: 64,
  width: '100%',
  background: isLight ? '#FFFFFF' : '#25273D',
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

const ContainerTitle = styled.div<{ hiddenTextDescription: boolean }>(({ hiddenTextDescription }) => ({
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
  [lightTheme.breakpoints.between('table_834', 'desktop_1280')]: {
    paddingLeft: '32px',
    paddingRight: '32px',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    maxHeight: hiddenTextDescription ? 300 : 38,
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    maxHeight: hiddenTextDescription ? 300 : 38,
    overflow: 'hidden',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '0px',
  },
}));

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

const SummaryDescription = styled.div<{ hiddenTextDescription: boolean }>(({ hiddenTextDescription }) => ({
  opacity: hiddenTextDescription ? 1 : 0,
  height: hiddenTextDescription ? 'auto' : 0,
  transition: 'all 0.3s ease',
  overflow: 'hidden',
}));

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
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
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

const ContainerResponsiveMobile = styled.div<{ isLight: boolean; hiddenTextDescription: boolean }>(
  ({ isLight, hiddenTextDescription }) => ({
    position: 'relative',
    borderBottom: isLight ? '1px solid #B6EDE7' : '1px solid #027265',
    width: '100%',
    marginTop: hiddenTextDescription ? '24px' : 0,

    [lightTheme.breakpoints.up('table_834')]: {
      marginTop: '24px',
    },

    [lightTheme.breakpoints.between('table_375', 'table_834')]: {
      marginTop: hiddenTextDescription ? '16px' : '0px',
    },
  })
);
