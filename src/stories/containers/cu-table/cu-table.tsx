import React, { CSSProperties, useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import {
  getBudgetCapsFromCoreUnit,
  getExpenditureValueFromCoreUnit,
  getFacilitatorsFromCoreUnit,
  getFTEsFromCoreUnit,
  getLast3ExpenditureValuesFromCoreUnit,
  getLinksFromCoreUnit,
  getLatestMip39FromCoreUnit,
  getMipUrlFromCoreUnit,
  getPercentFromCoreUnit,
  getSubmissionDateFromCuMip
} from '../../../core/business-logic/core-units';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { useAppDispatch } from '../../../core/hooks/hooks';
import { filterData, getArrayParam, getStringParam } from '../../../core/utils/filters';
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
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { SearchInput } from '../../components/search-input/search-input';
import { CustomButton } from '../../components/custom-button/custom-button';
import { useDebounce } from '../../../core/utils/use-debounce';
import { useRouter } from 'next/router';
import { stringify } from 'querystring';
import { CoreUnitDto } from '../../../core/models/dto/core-unit.dto';
import { formatCode } from '../../../core/utils/string.utils';
import { CoreUnitCard } from '../../components/core-unit-card/core-unit-card';

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];
const headers = ['Core Units', 'Expenditure', 'Team Members', 'Links'];
const sortInitialState = [SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Neutral, SortEnum.Disabled];
const headerStyles: CSSProperties[] = [{ paddingLeft: '63.5px' }, {}, {}, {}];
const headersAlign: ('flex-start' | 'center' | 'flex-end')[] = ['flex-start', 'flex-start', 'center', 'center'];

export const CuTable = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const debounce = useDebounce();

  const filteredStatuses = useMemo(() => getArrayParam('filteredStatuses', router.query), [router.query]);
  const filteredCategories = useMemo(() => getArrayParam('filteredCategories', router.query), [router.query]);

  const searchText = useMemo(() => getStringParam('searchText', router.query), [router.query]);
  const data: Array<CoreUnitDto> = useSelector((state: RootState) => selectCuTableItems(state));
  const status = useSelector((state: RootState) => selectCuTableStatus(state));

  const [headersSort, setHeadersSort] = useState(sortInitialState);
  const [sortColumn, setSortColumn] = useState(-1);

  useEffect(() => {
    dispatch(loadCuTableItemsAsync());
  }, [dispatch]);

  const filteredData = useMemo(() => filterData({
    data,
    filteredStatuses,
    filteredCategories,
    searchText
  }), [data, filteredCategories, filteredStatuses, searchText]);

  const setSort = (index: number, prevStatus: SortEnum) => {
    if (prevStatus === 3) {
      setHeadersSort(sortInitialState);
      setSortColumn(-1);
    } else {
      const temp = [...sortInitialState];
      temp[index] = prevStatus + 1;
      setHeadersSort(temp);
      setSortColumn(index);
    }
  };

  const sortData = useCallback((items: CoreUnitDto[]) => {
    if (headersSort[sortColumn] === SortEnum.Disabled) return items;

    const multiplier = headersSort[sortColumn] === SortEnum.Asc ? 1 : -1;
    const nameSort = (a: CoreUnitDto, b: CoreUnitDto) => sortAlphaNum(a.name, b.name) * multiplier;
    const expendituresSort = (a: CoreUnitDto, b: CoreUnitDto) => (getExpenditureValueFromCoreUnit(a) - getExpenditureValueFromCoreUnit(b)) * multiplier;
    const teamMembersSort = (a: CoreUnitDto, b: CoreUnitDto) => (getFTEsFromCoreUnit(a) - getFTEsFromCoreUnit(b)) * multiplier;
    const linksSort = (a: CoreUnitDto, b: CoreUnitDto) => (getLinksFromCoreUnit(a).length - getLinksFromCoreUnit(b).length) * multiplier;

    const sortAlg = [nameSort, expendituresSort, teamMembersSort, linksSort];
    return [...items].sort(sortAlg[sortColumn]);
  }, [headersSort, sortColumn]);

  const clearFilters = () => {
    router.push({
      pathname: '/',
      search: '',
    });
  };

  const handleChangeUrlFilterArrays = useCallback((key: string) => (value: string[] | string) => {
    const search = router.query;
    search[key] = Array.isArray(value) ? value.join(',') : (value || '');
    router.push({
      pathname: '/',
      search: stringify(search),
    });
  }, [router]);

  const onClickRow = useCallback((id: string) => () => {
    router.push(`/core-unit/${id}?filteredStatuses=${filteredStatuses}&filteredCategories=${filteredCategories}&searchText=${searchText}`);
  }, [filteredCategories, filteredStatuses, router, searchText]);

  const items = useMemo(() => {
    if (!filteredData) return [];
    const sortedData = sortData(filteredData);
    return sortedData.map((coreUnit: CoreUnitDto, i: number) => {
      return [
        <CuTableColumnSummary
          key={`summary-${i}`}
          title={coreUnit.name}
          status={getLatestMip39FromCoreUnit(coreUnit)?.mipStatus as CuStatusEnum}
          statusModified={getSubmissionDateFromCuMip(getLatestMip39FromCoreUnit(coreUnit))}
          imageUrl={coreUnit.image}
          mipUrl={getMipUrlFromCoreUnit(coreUnit)}
          onClick={onClickRow(coreUnit.code)}
          code={formatCode(coreUnit.code)}
        />,
        <div style={{ display: 'block' }}>
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
          members={
            getFacilitatorsFromCoreUnit(coreUnit)
          }
          fte={getFTEsFromCoreUnit(coreUnit)}
        />,
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
          <CuTableColumnLinks
            key={`links-${i}`}
            links={getLinksFromCoreUnit(coreUnit)}
            spacings={22}
            fill="#708390"
          />
        </div>
      ];
    });
  }, [filteredData, sortData, onClickRow]);

  const itemsList = useMemo(() => {
    return filteredData.map((cu, i) => <CoreUnitCard key={`card-${i}`} coreUnit={cu} onClick={onClickRow}/>);
  }, [filteredData, onClickRow]);

  return <ContainerHome>
    <Wrapper>
      <Header>
        <Title>Core Units Expenses</Title>
        <Filters>
          <CustomButton
            label="Reset Filters"
            style={{
              marginRight: '16px',
              width: '114px',
              border: 'none'
            }}
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            onClick={clearFilters}
            disabled={filteredStatuses && filteredStatuses.length === 0}
          />
          <CustomMultiSelect
            label="Status"
            activeItems={filteredStatuses}
            items={statuses}
            onChange={(value: string[]) => {
              handleChangeUrlFilterArrays('filteredStatuses')(value);
            }}
            style={{ marginRight: '16px' }}
          />
          <CustomMultiSelect
            label="CU Category"
            activeItems={filteredCategories}
            items={categories}
            onChange={(value: string[]) => {
              handleChangeUrlFilterArrays('filteredCategories')(value);
            }}
            style={{ marginRight: '16px' }}
          />
          <Separator />
          {router.isReady && <SearchInput
            defaultValue={searchText}
            placeholder="Search"
            onChange={(value: string) => {
              debounce(() => {
                handleChangeUrlFilterArrays('searchText')(value);
              }, 300);
            }}
            style={{ marginLeft: '16px' }}
          />}
          {!router.isReady && <SearchInput
            defaultValue={searchText}
            placeholder="Search"
            onChange={(value: string) => {
              debounce(() => {
                handleChangeUrlFilterArrays('searchText')(value);
              }, 300);
            }}
            style={{ marginLeft: '16px' }}
          />}
        </Filters>
      </Header>
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
      <ListWrapper>
        {itemsList}
      </ListWrapper>
    </Wrapper>
  </ContainerHome>;
};

const ContainerHome = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '22px 32px 0',
  marginTop: '64px',
  width: '100%',
  marginBottom: '121px',
  '@media (min-width: 1440px)': {
    padding: '22px 128px 0'
  },
  '@media (min-width: 1280px)': {
    padding: '22px 48px 0'
  },
  '@media (min-width: 1194px)': {
    padding: '22px 32px 0'
  }
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: '1180px',
  margin: '0 auto',
});

const TableWrapper = styled.div({
  display: 'none',
  '@media (min-width: 1180px)': {
    display: 'flex'
  }
});

const ListWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  '@media (min-width: 1180px)': {
    display: 'none'
  }
});

const Header = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '32px',
});

const Title = styled.div({
  fontFamily: 'FT Base, sans-serif',
  fontSize: '24px',
  fontWeight: 500,
  lineHeight: '29px',
  letterSpacing: '0.4px',
  flex: 1,
  color: '#231536'
});

const Separator = styled.span({
  width: '1px',
  height: '32px',
  backgroundColor: '#D4D9E1',
});

const Filters = styled.div({
  display: 'flex',
  '@media (max-width: 1180px)': {
    display: 'none'
  }
});
