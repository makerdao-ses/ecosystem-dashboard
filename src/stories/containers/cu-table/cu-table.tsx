import styled from '@emotion/styled';
import CoreUnitCard from '@ses/components/CoreUnitCard/CoreUnitCard';
import { siteRoutes } from '@ses/config/routes';
import { enablePageOverflow } from '@ses/core/utils/dom';
import isEmpty from 'lodash/isEmpty';
import sortBy from 'lodash/sortBy';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import lightTheme from '../../../../styles/theme/light';
import {
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLast3ExpenditureValuesFromCoreUnit,
  getLast3MonthsWithDataFormatted,
  getLatestMip39FromCoreUnit,
  getLinksFromCoreUnit,
  getMipUrlFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip,
} from '../../../core/business-logic/core-units';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { SortEnum } from '../../../core/enums/sort.enum';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { store } from '../../../core/store/store';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
import { sortAlphaNum } from '../../../core/utils/sort.utils';
import { getShortCode } from '../../../core/utils/string.utils';
import { buildQueryString, toAbsoluteURL } from '../../../core/utils/url.utils';
import { CuTableColumnExpenditures } from '../../components/CuTableColumnExpenditures/CuTableColumnExpenditures';
import { CuTableColumnLinks } from '../../components/cu-table-column-links/cu-table-column-links';
import { CuTableColumnSummary } from '../../components/cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnTeamMember } from '../../components/cu-table-column-team-member/cu-table-column-team-member';
import { CuTableHeaderSkeleton } from '../../components/cu-table-header-skeleton/header-skeleton';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomTable } from '../../components/custom-table/custom-table';
import { TablePlaceholder } from '../../components/custom-table/placeholder';
import { SEOHead } from '../../components/seo-head/seo-head';
import { Filters } from './cu-table-filters';
import {
  loadCuTableItemsAsync,
  selectCuTableHeadersSort,
  selectCuTableItems,
  selectCuTableSortColumn,
  selectCuTableStatus,
} from './cu-table.slice';
import type { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import type { RootState } from '../../../core/store/store';
import type { CSSProperties } from 'react';

const headers = ['Core Units', 'Expenditure', 'Team Members', 'Links'];

const headerStyles: CSSProperties[] = [{ paddingLeft: '79.5px' }, {}, {}, {}];
const headersAlign: ('flex-start' | 'center' | 'flex-end')[] = ['flex-start', 'flex-start', 'center', 'center'];

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

export const CuTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLight } = useThemeContext();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);
  const data: Array<CoreUnitDto> = useSelector((state: RootState) => selectCuTableItems(state));
  const status = useSelector((state: RootState) => selectCuTableStatus(state));
  const [filtersPopup, setFiltersPopup] = useState(false);

  const toggleFiltersPopup = useCallback(() => {
    enablePageOverflow(filtersPopup);
    setFiltersPopup(!filtersPopup);
  }, [filtersPopup]);

  useEffect(() => {
    if (isEmpty(data)) {
      dispatch(loadCuTableItemsAsync());
    }
  }, [data, dispatch]);

  const { filteredData, statusesFiltered, categoriesFiltered } = useMemo(
    () =>
      filterData({
        data,
        filteredStatuses,
        filteredCategories,
        searchText,
      }),
    [data, filteredCategories, filteredStatuses, searchText]
  );

  const categoriesCount = useMemo(() => {
    const result: { [id: string]: number } = {};
    Object.values(CuCategoryEnum).forEach((cat) => {
      result[cat] = categoriesFiltered?.filter((cu) => cu.category?.indexOf(cat) > -1).length;
    });
    result.All = categoriesFiltered.length;
    return result;
  }, [categoriesFiltered]);

  const statusCount = useMemo(() => {
    const result: { [id: string]: number } = {};
    Object.values(CuStatusEnum).forEach((cat) => {
      result[cat] = statusesFiltered?.filter((cu) => getLatestMip39FromCoreUnit(cu)?.mipStatus === cat).length;
    });
    result.All = statusesFiltered.length;
    return result;
  }, [statusesFiltered]);

  const clearFilters = useCallback(() => {
    router.push({
      pathname: siteRoutes.coreUnitsOverview,
      search: '',
    });

    const input = document.querySelector('#search-input');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    input.value = '';
  }, [router]);

  const onClickRow = useCallback(
    (code: string) => () => {
      const queryStrings = buildQueryString({
        filteredStatuses,
        filteredCategories,
        searchText,
      });
      router.push(`/core-unit/${code}${queryStrings}`);
    },
    [filteredCategories, filteredStatuses, router, searchText]
  );

  const onClickFinances = useCallback(
    (code: string) => {
      const queryStrings = buildQueryString({
        filteredStatuses,
        filteredCategories,
        searchText,
      });
      router.push(`/core-unit/${code}/finances/reports${queryStrings}`);
    },
    [filteredCategories, filteredStatuses, router, searchText]
  );

  const items = useMemo(() => {
    if (status === 'loading') {
      return new Array(10).fill([
        <CuTableColumnSummary isLoading />,
        <CuTableColumnExpenditures isLoading />,
        <CuTableColumnTeamMember isLoading />,
        <CuTableColumnLinks isLoading />,
      ]);
    }

    if (!filteredData) return [];
    const sortedData = sortData(filteredData);
    return sortedData.map((coreUnit: CoreUnitDto, i: number) => [
      <CuTableColumnSummary
        key={`summary-${coreUnit.code}`}
        title={coreUnit.name}
        status={getLatestMip39FromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum}
        statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnit))}
        imageUrl={coreUnit.image}
        mipUrl={getMipUrlFromCoreUnit(coreUnit)}
        onClick={onClickRow(coreUnit.shortCode)}
        code={getShortCode(coreUnit.shortCode)}
        categories={coreUnit?.category}
      />,
      <div
        key={`expenditures-${i}`}
        onClick={() => onClickFinances(coreUnit.shortCode)}
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            display: 'block',
            margin: 'auto 0',
            paddingLeft: '8px',
          }}
        >
          <CuTableColumnExpenditures
            value={getExpenditureValueFromCoreUnit(coreUnit)}
            percent={getPercentFromCoreUnit(coreUnit)}
            months={getLast3MonthsWithDataFormatted(coreUnit)}
            items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
            budgetCaps={getBudgetCapsFromCoreUnit(coreUnit)}
          />
        </div>
      </div>,
      <div
        key={`teammember-${i}`}
        onClick={onClickRow(coreUnit.shortCode)}
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        <CuTableColumnTeamMember members={getFacilitatorsFromCoreUnit(coreUnit)} fte={getFTEsFromCoreUnit(coreUnit)} />
      </div>,
      <div
        key={`links-${i}`}
        onClick={onClickRow(coreUnit.shortCode)}
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flex: 1,
          paddingRight: '16px',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      >
        <CuTableColumnLinks links={getLinksFromCoreUnit(coreUnit)} spacings={16} fill="#708390" fillDark="#D2D4EF" />
      </div>,
    ]);
  }, [status, filteredData, onClickRow, onClickFinances]);

  const itemsList = useMemo(() => {
    if (status === 'loading') {
      const result = [];

      for (let i = 0; i < 4; i++) {
        result.push(<CoreUnitCard key={`card-placeholder-${i}`} coreUnit={{} as CoreUnitDto} isLoading />);
      }

      return result;
    }
    return sortBy(filteredData, 'name').map((cu) => <CoreUnitCard key={`card-${cu.code}`} coreUnit={cu} />);
  }, [filteredData, status]);

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
          columns={[]}
          headersSort={[]}
        />
      </Header>
    );
  }, [
    categoriesCount,
    clearFilters,
    filteredCategories,
    filteredStatuses,
    filtersPopup,
    isLight,
    searchText,
    status,
    statusCount,
    toggleFiltersPopup,
  ]);

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
        {!!items?.length && (
          <>
            <TableWrapper>
              <CustomTable
                headers={headers}
                items={items}
                headersAlign={headersAlign}
                headersStyles={headerStyles}
                loading={status === 'loading'}
              />
            </TableWrapper>
            <ListWrapper>{itemsList}</ListWrapper>
          </>
        )}

        {!items?.length && status !== 'loading' && <TablePlaceholder />}
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
    padding: '24px 128px 128px',
  },
}));

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1184px',
  margin: '0 auto',
  paddingBottom: '8px',
  '@media (min-width: 1194px) and (max-width:1280px)': {
    maxWidth: '1130px',
  },
});

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 1194px)': {
    display: 'flex',
  },
});

const ListWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 1194px)': {
    display: 'none',
  },
});

const Header = styled.div({
  background: 'none',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
  minWidth: '330px',
  '@media (min-width: 834px) and (max-width: 1194px)': {
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'flex-start',
  },
});

const Title = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
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
