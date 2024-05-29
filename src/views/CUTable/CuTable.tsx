import styled from '@emotion/styled';
import { CuTableHeaderSkeleton } from '@ses/components/CuTableHeaderSkeleton/CuTableHeaderSkeleton';
// import { CustomTable2 } from '@ses/components/CustomTable/CustomTable2';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import lightTheme from '@ses/styles/theme/themes';
import React, { useMemo } from 'react';

import { CustomTable2 } from './components/CustomTable/CustomTable2';
import { Filters } from './cuTableFilters';
import { useCoreUnitsTable } from './useCoreUnitsTable';

export const CuTable = () => {
  const { themeMode } = useThemeContext();
  const isLight = themeMode === 'light';
  const { isShowBanner } = useCookiesContextTracking();
  const {
    clearFilters,
    statusCount,
    categoriesCount,
    status,
    filtersPopup,
    toggleFiltersPopup,
    filteredStatuses,
    filteredCategories,
    searchText,
    columns,
    tableItems,
    onSortClick,
    headersSort,
    applySort,
    queryStrings,
  } = useCoreUnitsTable();

  const siteHeader = useMemo(() => {
    if (status === 'loading') {
      return <CuTableHeaderSkeleton />;
    }
    return (
      <Header>
        <Filters
          filtersPopup={filtersPopup}
          filteredStatuses={filteredStatuses}
          filteredCategories={filteredCategories}
          categoriesCount={categoriesCount}
          statusCount={statusCount}
          searchText={searchText}
          setFiltersPopup={toggleFiltersPopup}
          clearFilters={clearFilters}
          columns={columns.filter((_, i) => headersSort[i] !== SortEnum.Disabled)}
          onSortApply={applySort}
          headersSort={headersSort}
        />
      </Header>
    );
  }, [
    applySort,
    categoriesCount,
    clearFilters,
    columns,
    filteredCategories,
    filteredStatuses,
    filtersPopup,
    headersSort,
    searchText,
    status,
    statusCount,
    toggleFiltersPopup,
  ]);
  return (
    <ContainerHome isLight={isLight} allowPadding={isShowBanner}>
      <SEOHead
        title="MakerDAO Ecosystem Performance Dashboard | Maker Expenses"
        description="MakerDAO Ecosystem Performance Dashboard provides a transparent analysis of Core Unit teams' finances, projects, and their position in the DAO."
        image={{
          src: toAbsoluteURL('/assets/img/social-385x200.png'),
          width: 385,
          height: 200,
        }}
        twitterImage={toAbsoluteURL('/assets/img/social-1200x630.png')}
        canonicalURL={siteRoutes.coreUnitsOverview}
      />
      <Wrapper>
        {siteHeader}
        <CustomTable2
          columns={columns}
          items={tableItems}
          loading={status === 'loading'}
          handleSort={onSortClick}
          headersSort={headersSort}
          queryStrings={queryStrings}
        />
      </Wrapper>
    </ContainerHome>
  );
};

const ContainerHome = styled.div<{ isLight: boolean; allowPadding?: boolean }>(({ isLight, allowPadding = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: !allowPadding ? '96px 16px 128px' : 'none',
  margin: '0 auto',
  width: '100%',
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
  '@media (min-width: 834px)': {
    padding: !allowPadding ? '88px 32px 128px' : 'none',
  },
  '@media (min-width: 1280px)': {
    padding: !allowPadding ? '88px 48px 128px' : 'none',
  },
  '@media (min-width: 1440px)': {
    padding: !allowPadding ? '88px 0 128px' : 'none',
  },
}));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1312px',
  margin: '0 auto',
  paddingBottom: '8px',
  '@media (min-width: 1194px) and (max-width: 1410px)': {
    maxWidth: '1130px',
  },
});

export const ContainerOverlay = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 4,
  height: 'calc(100vh - 282px)',
  background: 'rgba(52, 52, 66, 0.1)',
  backdropFilter: isLight ? 'blur(2px)' : 'blur(4px)',
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    height: 'calc(100vh - 458px)',
  },
}));

export const PolicyBannerPosition = styled.div({
  bottom: 0,
  zIndex: 4,
  width: '100%',
  position: 'absolute',
  borderRadius: '90px',
  transition: 'all 0.5s ease-in',
});

const Header = styled.div({
  display: 'flex',
  marginBottom: '32px',
  minWidth: '330px',
});
