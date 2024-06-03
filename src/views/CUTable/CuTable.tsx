import { styled } from '@mui/material';
import { CuTableHeaderSkeleton } from '@ses/components/CuTableHeaderSkeleton/CuTableHeaderSkeleton';
import { SEOHead } from '@ses/components/SEOHead/SEOHead';
import { siteRoutes } from '@ses/config/routes';
import { useCookiesContextTracking } from '@ses/core/context/CookiesContext';
import { SortEnum } from '@ses/core/enums/sortEnum';
import { toAbsoluteURL } from '@ses/core/utils/urls';
import theme from '@ses/styles/theme/themes';
import React, { useMemo } from 'react';

import { CustomTable2 } from './components/CustomTable/CustomTable2';
import { Filters } from './cuTableFilters';
import { useCoreUnitsTable } from './useCoreUnitsTable';

export const CuTable = () => {
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
    <ContainerHome allowPadding={isShowBanner}>
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

const ContainerHome = styled('div')<{ allowPadding?: boolean }>(({ theme, allowPadding = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: !allowPadding ? '96px 16px 128px' : 'none',
  margin: '0 auto',
  width: '100%',
  background: theme.palette.isLight ? '#FFFFFF' : '#000000',
  backgroundImage: theme.palette.isLight ? '#FFFFFF' : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
  [theme.breakpoints.up('tablet_768')]: {
    padding: !allowPadding ? '88px 32px 128px' : 'none',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    padding: !allowPadding ? '88px 48px 128px' : 'none',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    padding: !allowPadding ? '88px 0 128px' : 'none',
  },
}));

const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1312px',
  margin: '0 auto',
  paddingBottom: '8px',
  [theme.breakpoints.between('desktop_1024', 'desktop_1280')]: {
    maxWidth: '1130px',
  },
});

export const ContainerOverlay = styled('div')<{ isLight: boolean }>(({ theme }) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 4,
  height: 'calc(100vh - 282px)',
  background: 'rgba(52, 52, 66, 0.1)',
  backdropFilter: theme.palette.isLight ? 'blur(2px)' : 'blur(4px)',
  [theme.breakpoints.between('mobile_375', 'tablet_768')]: {
    height: 'calc(100vh - 458px)',
  },
}));

export const PolicyBannerPosition = styled('div')({
  bottom: 0,
  zIndex: 4,
  width: '100%',
  position: 'absolute',
  borderRadius: '90px',
  transition: 'all 0.5s ease-in',
});

const Header = styled('div')({
  display: 'flex',
  marginBottom: '32px',
  minWidth: '330px',
});
