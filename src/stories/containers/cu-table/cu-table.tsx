import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styled from '@emotion/styled';
import {
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLast3ExpenditureValuesFromCoreUnit,
  getLatestMip39FromCoreUnit,
  getLinksFromCoreUnit,
  getMipUrlFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip,
} from '../../../core/business-logic/core-units';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { useAppDispatch } from '../../../core/hooks/hooks';
import {
  filterData,
  getArrayParam,
  getStringParam,
} from '../../../core/utils/filters';
import { CuTableColumnExpenditures } from '../../components/cu-table-column-expenditures/cu-table-column-expenditures';
import { CuTableColumnLinks } from '../../components/cu-table-column-links/cu-table-column-links';
import { CuTableColumnSummary } from '../../components/cu-table-column-summary/cu-table-column-summary';
import { CuTableColumnTeamMember } from '../../components/cu-table-column-team-member/cu-table-column-team-member';
import { CustomTable } from '../../components/custom-table/custom-table';
import {
  loadCuTableItemsAsync,
  selectCuTableItems,
  selectCuTableStatus,
} from './cu-table.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../core/store/store';
import { SortEnum } from '../../../core/enums/sort.enum';
import { sortAlphaNum } from '../../../core/utils/sort.utils';
import { CustomButton } from '../../components/custom-button/custom-button';
import { useRouter } from 'next/router';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { formatCode } from '../../../core/utils/string.utils';
import { CoreUnitCard } from '../../components/core-unit-card/core-unit-card';
import { Filters } from './cu-table-filters';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { CustomPopover } from '../../components/custom-popover/custom-popover';
import { CategoryChip } from '../../components/category-chip/category-chip';
import { TablePlaceholder } from '../../components/custom-table/placeholder';
import Head from 'next/head';

const headers = ['Core Units', 'Expenditure', 'Team Members', 'Links'];
const sortNeutralState = [
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Disabled,
];
const sortInitialState = [
  SortEnum.Asc,
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Neutral,
  SortEnum.Disabled,
];
const headerStyles: CSSProperties[] = [{ paddingLeft: '79.5px' }, {}, {}, {}];
const headersAlign: ('flex-start' | 'center' | 'flex-end')[] = [
  'flex-start',
  'flex-start',
  'center',
  'center',
];

export const CuTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isLight = useThemeContext().themeMode === 'light';

  const filteredStatuses = useMemo(
    () => getArrayParam('filteredStatuses', router.query),
    [router.query]
  );
  const filteredCategories = useMemo(
    () => getArrayParam('filteredCategories', router.query),
    [router.query]
  );

  const searchText = useMemo(
    () => getStringParam('searchText', router.query),
    [router.query]
  );
  const data: Array<CoreUnitDto> = useSelector((state: RootState) =>
    selectCuTableItems(state)
  );
  const status = useSelector((state: RootState) => selectCuTableStatus(state));

  const [headersSort, setHeadersSort] = useState(sortInitialState);
  const [sortColumn, setSortColumn] = useState(0);
  const [filtersPopup, setFiltersPopup] = useState(false);

  const toggleFiltersPopup = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.querySelector('body').style.overflow = filtersPopup
      ? 'auto'
      : 'hidden';
    setFiltersPopup(!filtersPopup);
  };

  useEffect(() => {
    dispatch(loadCuTableItemsAsync());
  }, [dispatch]);

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
      result[cat] = categoriesFiltered?.filter(
        (cu) => cu.category?.indexOf(cat) > -1
      ).length;
    });
    result.All = categoriesFiltered.length;
    return result;
  }, [filteredData]);

  const statusCount = useMemo(() => {
    const result: { [id: string]: number } = {};
    Object.values(CuStatusEnum).forEach((cat) => {
      result[cat] = statusesFiltered?.filter(
        (cu) => getLatestMip39FromCoreUnit(cu)?.mipStatus === cat
      ).length;
    });
    result.All = statusesFiltered.length;
    return result;
  }, [filteredData]);

  const clearFilters = () => {
    router.push({
      pathname: '/',
      search: '',
    });

    const input = document.querySelector('#search-input');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    input.value = '';
  };

  const setSort = (index: number, prevStatus: SortEnum) => {
    if (prevStatus === 3) {
      setHeadersSort(sortNeutralState);
      setSortColumn(-1);
    } else {
      const temp = [...sortNeutralState];
      temp[index] = prevStatus + 1;
      setHeadersSort(temp);
      setSortColumn(index);
    }
  };

  const sortData = useCallback(
    (items: CoreUnitDto[]) => {
      if (headersSort[sortColumn] === SortEnum.Disabled) return items;

      const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;
      const nameSort = (a: CoreUnitDto, b: CoreUnitDto) =>
        sortAlphaNum(a.name, b.name) * multiplier;
      const expendituresSort = (a: CoreUnitDto, b: CoreUnitDto) =>
        (getExpenditureValueFromCoreUnit(a) -
          getExpenditureValueFromCoreUnit(b)) *
        multiplier;
      const teamMembersSort = (a: CoreUnitDto, b: CoreUnitDto) =>
        (getFTEsFromCoreUnit(a) - getFTEsFromCoreUnit(b)) * multiplier;
      const linksSort = (a: CoreUnitDto, b: CoreUnitDto) =>
        (getLinksFromCoreUnit(a).length - getLinksFromCoreUnit(b).length) *
        multiplier;

      const sortAlg = [nameSort, expendituresSort, teamMembersSort, linksSort];
      return [...items].sort(sortAlg[sortColumn]);
    },
    [headersSort, sortColumn]
  );

  const onClickRow = useCallback(
    (code: string) => () => {
      router.push(
        `/core-unit/${code}?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`
      );
    },
    [filteredCategories, filteredStatuses, router, searchText]
  );

  const onClickFinances = useCallback(
    (code: string) => {
      router.push(
        `/core-unit/${code}/finances/reports?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`
      );
    },
    [filteredCategories, filteredStatuses, router, searchText]
  );

  const items = useMemo(() => {
    if (status === 'loading') {
      return new Array(10).fill([
        <CuTableColumnSummary isLoading/>,
        <CuTableColumnExpenditures isLoading/>,
        <CuTableColumnTeamMember isLoading/>,
        <CuTableColumnLinks isLoading/>
      ]);
    }

    if (!filteredData) return [];
    const sortedData = sortData(filteredData);
    return sortedData.map((coreUnit: CoreUnitDto, i: number) => {
      return [
        <CustomPopover
          popupStyle={{ padding: 0 }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          title={
            <>
              <CuTableColumnSummary
                key={`summary-${coreUnit.code}`}
                title={coreUnit.name}
                status={
                  getLatestMip39FromCoreUnit(coreUnit)
                    ?.mipStatus as CuStatusEnum
                }
                statusModified={getSubmissionDateFromCuMip(
                  getLatestMip39FromCoreUnit(coreUnit)
                )}
                imageUrl={coreUnit.image}
                mipUrl={getMipUrlFromCoreUnit(coreUnit)}
                onClick={onClickRow(coreUnit.shortCode)}
                code={formatCode(coreUnit.shortCode)}
                logoDimension={'68px'}
              />
              <Padded>
                <CategoriesTitle>Categories</CategoriesTitle>
                <CategoriesRow>
                  {coreUnit?.category?.map((cat) => (
                    <CategoryChip category={cat} />
                  ))}
                </CategoriesRow>
              </Padded>
            </>
          }
          id={coreUnit.code}
        >
          <CuTableColumnSummary
            key={`summary-${coreUnit.code}`}
            title={coreUnit.name}
            status={
              getLatestMip39FromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum
            }
            statusModified={getSubmissionDateFromCuMip(
              getLatestMip39FromCoreUnit(coreUnit)
            )}
            imageUrl={coreUnit.image}
            mipUrl={getMipUrlFromCoreUnit(coreUnit)}
            onClick={onClickRow(coreUnit.shortCode)}
            code={formatCode(coreUnit.shortCode)}
          />
        </CustomPopover>,
        <div
          style={{
            display: 'block',
            paddingLeft: '8px',
          }}
          onClick={() => onClickFinances(coreUnit.shortCode)}
        >
          <CuTableColumnExpenditures
            key={`expenditures-${i}`}
            value={getExpenditureValueFromCoreUnit(coreUnit)}
            percent={getPercentFromCoreUnit(coreUnit)}
            items={getLast3ExpenditureValuesFromCoreUnit(coreUnit)}
            budgetCaps={getBudgetCapsFromCoreUnit(coreUnit)}
          />
        </div>,
        <CuTableColumnTeamMember
          key={`teammember-${i}`}
          members={getFacilitatorsFromCoreUnit(coreUnit)}
          fte={getFTEsFromCoreUnit(coreUnit)}
        />,
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            flex: 1,
            paddingRight: '16px',
          }}
        >
          <CuTableColumnLinks
            key={`links-${i}`}
            links={getLinksFromCoreUnit(coreUnit)}
            spacings={16}
            fill="#708390"
            fillDark="#D2D4EF"
          />
        </div>,
      ];
    });
  }, [filteredData, sortData, onClickRow]);

  const itemsList = useMemo(() => {
    if (status === 'loading') {
      return new Array(4).fill(<CoreUnitCard coreUnit={{} as CoreUnitDto} isLoading/>);
    }
    return filteredData.map((cu, i) => (
      <CoreUnitCard
        key={`card-${i}`}
        coreUnit={cu}
        onClick={onClickRow(cu.shortCode)}
        onClickFinances={() => onClickFinances(cu.shortCode)}
      />
    ));
  }, [filteredData, onClickRow]);

  return (
    <ContainerHome isLight={isLight}>
    <Head>
      <title>Sustainable Ecosystem Scaling Core Unit | Maker Expenses</title>
      <link rel="icon" href="/favicon.png" />
      <meta property='og:site_name' content="Sustainable Ecosystem Scaling Core Unit | Maker Expenses"/>
      <meta name="description" content="MakerDAO Ecosystem Performance Dashboard provides a transparent analysis of Core Unit teams' finances, projects, and their position in the DAO." />
      <meta name="og:description" content="MakerDAO Ecosystem Performance Dashboard provides a transparent analysis of Core Unit teams' finances, projects, and their position in the DAO." />
      <meta name="robots" content="index,follow"/>
    </Head>
      <Wrapper>
        <Header>
          <Title isLight={isLight}>Core Units Expenses</Title>
          <FilterButtonWrapper onClick={toggleFiltersPopup}>
            <CustomButton
              label={'Filters'}
              style={{
                height: '34px',
                width: '90px',
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
        {!!items?.length && (
          <>
            <TableWrapper>
              <CustomTable
                headers={headers}
                items={items}
                headersAlign={headersAlign}
                headersSort={headersSort}
                headersStyles={headerStyles}
                sortFunction={setSort}
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
  background: isLight
    ? '#FFFFFF'
    : 'linear-gradient(180deg, #001020 0%, #000000 63.95%)',
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
  '@media (min-width: 1180px) and (max-width:1280px)': {
    maxWidth: '1130px',
  },
});

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 1180px)': {
    display: 'flex',
  },
});

const ListWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 1180px)': {
    display: 'none',
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
}));

const CategoriesTitle = styled.div({
  fontFamily: 'SF Pro Display',
  fontWeight: 400,
  fontSize: '14px',
  color: '#708390',
  marginBottom: '8px',
});

const CategoriesRow = styled.div({
  display: 'flex',
  gap: '16px',
});

const Padded = styled.div({
  padding: '0 16px 16px',
});

const FilterButtonWrapper = styled.div({
  '@media (min-width: 834px)': {
    display: 'none',
  },
});
