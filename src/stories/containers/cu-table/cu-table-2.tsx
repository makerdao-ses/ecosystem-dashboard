import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import {
  getExpenditureValueFromCoreUnit,
  getFTEsFromCoreUnit,
  getLinksFromCoreUnit,
} from '../../../core/business-logic/core-units';
import { selectCuTableHeadersSort, selectCuTableSortColumn } from './cu-table.slice';
import { store } from '../../../core/store/store';
import { SortEnum } from '../../../core/enums/sort.enum';
import { sortAlphaNum } from '../../../core/utils/sort.utils';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { Filters } from './cu-table-filters';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CuTableHeaderSkeleton } from '../../components/cu-table-header-skeleton/header-skeleton';
import { SEOHead } from '../../components/seo-head/seo-head';
import { toAbsoluteURL } from '../../../core/utils/url.utils';
import lightTheme from '../../../../styles/theme/light';
import { useCoreUnitsTableMvvm } from './cu-table-2.mvvm';
import { CustomTable2, CustomTableRow } from '../../components/custom-table/custom-table-2';
import { renderCard } from './cu-table.renders';

export const sortData = (items: CoreUnitDto[]) => {
  const state = store.getState();
  const headersSort = selectCuTableHeadersSort(state);
  const sortColumn = selectCuTableSortColumn(state);
  if (headersSort[sortColumn] === SortEnum.Disabled) return items;

  const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;
  const nameSort = (a: CoreUnitDto, b: CoreUnitDto) => sortAlphaNum(a.name, b.name) * multiplier;
  const expendituresSort = (a: CoreUnitDto, b: CoreUnitDto) =>
    (getExpenditureValueFromCoreUnit(a) - getExpenditureValueFromCoreUnit(b)) * multiplier;
  const teamMembersSort = (a: CoreUnitDto, b: CoreUnitDto) =>
    (getFTEsFromCoreUnit(a) - getFTEsFromCoreUnit(b)) * multiplier;
  const linksSort = (a: CoreUnitDto, b: CoreUnitDto) =>
    (getLinksFromCoreUnit(a).length - getLinksFromCoreUnit(b).length) * multiplier;

  const sortAlg = [nameSort, expendituresSort, teamMembersSort, linksSort];
  return [...items].sort(sortAlg[sortColumn]);
};

export const CuTable2 = () => {
  const isLight = useThemeContext().themeMode === 'light';

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
  } = useCoreUnitsTableMvvm();

  const siteHeader = useMemo(() => {
    if (status === 'loading') {
      return <CuTableHeaderSkeleton />;
    }
    return (
      <Header>
        <Title isLight={isLight}> Core Units</Title>
        <FilterButtonWrapperMobile>
          <CustomButton
            label="Reset Filters"
            style={{
              width: '114px',
              border: 'none',
              background: 'none',
            }}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={clearFilters}
            disabled={!filteredStatuses?.length && !filteredCategories?.length && !searchText}
          />
        </FilterButtonWrapperMobile>
        <FilterButtonWrapper onClick={toggleFiltersPopup}>
          <CustomButton
            label={'Filters'}
            isHightLight={!!(filteredStatuses.length || filteredCategories.length || searchText)}
            style={{
              height: '34px',
              width: '90px',
              border: isLight
                ? filteredStatuses.length || filteredCategories.length || searchText
                  ? '1px solid #1AAB9B'
                  : '1px solid #D4D9E1'
                : filteredStatuses.length || filteredCategories.length || searchText
                ? '1px solid #098C7D'
                : '1px solid #343442',
            }}
            styleText={{
              color: isLight
                ? filteredStatuses.length || filteredCategories.length || searchText
                  ? ' #1AAB9B'
                  : '#231536'
                : filteredStatuses.length || filteredCategories.length || searchText
                ? ' #1AAB9B'
                : '#D2D4EF',
            }}
          />
        </FilterButtonWrapper>
        <Filters
          filtersPopup={filtersPopup}
          filteredStatuses={filteredStatuses}
          filteredCategories={filteredCategories}
          categoriesCount={categoriesCount}
          statusCount={statusCount}
          searchText={searchText}
          setFiltersPopup={toggleFiltersPopup}
          clearFilters={clearFilters}
        />
      </Header>
    );
  }, [filteredData, isLight, toggleFiltersPopup]);

  return (
    <ContainerHome isLight={isLight}>
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
    </ContainerHome>
  );
};

const ContainerHome = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '32px 16px 128px',
  marginTop: '64px',
  width: '100%',
  background: isLight ? '#FFFFFF' : '#000000',
  backgroundImage: isLight ? '#FFFFFF' : 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 16, 32, 0.4) 100%)',
  '@media (min-width: 834px)': {
    padding: '24px 32px 128px',
  },
  '@media (min-width: 1280px)': {
    padding: '24px 48px 128px',
  },
  '@media (min-width: 1440px)': {
    padding: '24px auto 128px',
  },
}));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1312px',
  margin: '0 auto',
  paddingBottom: '8px',
  '@media (min-width: 1180px) and (max-width:1280px)': {
    maxWidth: '1130px',
  },
});

const Header = styled.div({
  background: 'none',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
  minWidth: '330px',
  '@media (min-width: 834px) and (max-width: 1180px)': {
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'flex-start',
  },
});

const Title = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: isLight ? '29px' : '38px',
  letterSpacing: '0.4px',
  flex: 1,
  color: isLight ? '#231536' : '#D2D4EF',
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    fontSize: '20px',
    lineHeight: '24px',
  },
}));

const FilterButtonWrapper = styled.div({
  display: 'flex',
  '@media (min-width: 834px)': {
    display: 'none',
  },
});

const FilterButtonWrapperMobile = styled.div({
  display: 'flex',
  '@media (min-width: 834px)': {
    display: 'none',
  },
});
