import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import isEmpty from 'lodash/isEmpty';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { Filters } from './cu-table-filters';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CuTableHeaderSkeleton } from '../../components/cu-table-header-skeleton/header-skeleton';
import { SEOHead } from '../../components/seo-head/seo-head';
import { toAbsoluteURL } from '../../../core/utils/url.utils';
import { useCoreUnitsTableMvvm } from './cu-table-2.mvvm';
import { CustomTable2, CustomTableRow } from '../../components/custom-table/custom-table-2';
import { renderCard } from './cu-table.renders';
import { SortEnum } from '../../../core/enums/sort.enum';
import CookiesPolicyBanner from '../cookies-policy/cookies-policy-banner';
import lightTheme from '../../../../styles/theme/light';
import { useScrollLock } from '../../../core/hooks/scroll-hooks';
import { useCookiesPolicyBannerMvvm } from '../cookies-policy/cookies-policy-banner.mvvm';

export const CuTable2 = () => {
  const [isShowBanner, setIsShowBanner] = useState(false);
  const isLight = useThemeContext().themeMode === 'light';
  const { lockScroll, unlockScroll } = useScrollLock();
  const {
    clearFilters,
    statusCount,
    categoriesCount,
    filteredData,
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
  } = useCoreUnitsTableMvvm();
  const {
    handleAcceptCookies,
    handleAnalyticsCookies,
    handleFunctionalCookies,
    handleRejectCookies,
    analyticsCookies,
    functionalCookies,
    cookies,
  } = useCookiesPolicyBannerMvvm({
    isShowBanner,
    setIsShowBanner,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (status !== 'loading' && isEmpty(cookies)) {
      setIsShowBanner(true);
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [cookies.analytics, cookies.darkMode, lockScroll, status, unlockScroll]);

  const siteHeader = useMemo(() => {
    if (status === 'loading') {
      lockScroll();
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
  }, [filteredData, isLight, toggleFiltersPopup]);

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
      >
        <link rel="apple-touch-icon" sizes="1024x1024" href="/icons/icon-1024.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/icons/icon-120.png" />
      </SEOHead>
      <Wrapper>
        {siteHeader}
        <CustomTable2
          columns={columns}
          items={tableItems}
          loading={status === 'loading'}
          handleSort={onSortClick}
          headersSort={headersSort}
          renderCard={(row: CustomTableRow, index: number) => renderCard(row?.value as CoreUnitDto, index)}
        />
      </Wrapper>
      {isShowBanner && status !== 'loading' && <ContainerOverlay isLight={isLight} />}
      {isShowBanner && status !== 'loading' && (
        <PolicyBannerPosition>
          <CookiesPolicyBanner
            analyticsCookies={analyticsCookies}
            functionalCookies={functionalCookies}
            handleAnalyticsCookies={handleAnalyticsCookies}
            handleFunctionalCookies={handleFunctionalCookies}
            handleAcceptCookies={handleAcceptCookies}
            handleRejectCookies={handleRejectCookies}
          />
        </PolicyBannerPosition>
      )}
    </ContainerHome>
  );
};

const ContainerHome = styled.div<{ isLight: boolean; allowPadding?: boolean }>(({ isLight, allowPadding = false }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: !allowPadding ? '32px 16px 128px' : 'none',
  margin: '64px auto 0',
  width: '100%',
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 16, 32, 0.4) 100%)',
  '@media (min-width: 834px)': {
    padding: !allowPadding ? '24px 32px 128px' : 'none',
  },
  '@media (min-width: 1280px)': {
    padding: !allowPadding ? '24px 48px 128px' : 'none',
  },
  '@media (min-width: 1440px)': {
    padding: !allowPadding ? '24px auto 128px' : 'none',
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
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
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
