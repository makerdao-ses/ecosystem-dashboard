import React, { useCallback, useMemo, useRef } from 'react';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { stringify } from 'querystring';
import { useRouter } from 'next/router';
import { useDebounce } from '../../../core/utils/use-debounce';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { StatusChip } from '../../components/status-chip/status-chip';
import { CategoryChip } from '../../components/category-chip/category-chip';
import { SearchInput } from '../../components/search-input/search-input';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { Divider } from '@mui/material';
import { CustomSortSelect, SortSelectItem } from '../../components/custom-sort-select/custom-sort-select';
import { CustomTableColumn } from '../../components/custom-table/custom-table-2';
import { SortEnum } from '../../../core/enums/sort.enum';
import Filter from '../../components/svg/filter';
import ResetButton from '../../components/reset-button/reset-button';

interface FilterProps {
  filtersPopup: boolean;
  filteredStatuses: string[];
  filteredCategories: string[];
  searchText: string;
  setFiltersPopup: () => void;
  clearFilters: () => void;
  statusCount: { [id: string]: number };
  categoriesCount: { [id: string]: number };
  handleCloseSearch?: () => void;
  columns: CustomTableColumn[];
  headersSort: SortEnum[];
  onSortApply: (index: number, sort: SortEnum) => void;
  onSortReset: () => void;
}

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];

export const Filters = (props: FilterProps) => {
  const router = useRouter();
  const debounce = useDebounce();
  const isLight = useThemeContext().themeMode === 'light';
  const inputRef = useRef<HTMLInputElement>(null);

  const [filtersVisible, setFiltersVisible] = React.useState(false);

  const toggleFiltersVisible = () => setFiltersVisible(!filtersVisible);

  const handleChangeUrlFilterArrays = useCallback(
    (key: string) => (value: string[] | string) => {
      const search = router.query;
      search[key] = Array.isArray(value) ? value.join(',') : value || '';
      router.push({
        pathname: '/',
        search: stringify(search),
      });
    },
    [router]
  );

  const handleCloseSearch = () => {
    const search = router.query;
    delete search.searchText;
    router.push({
      pathname: '/',
      search: stringify(search),
    });
    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
  };

  const activeItem = useMemo(() => {
    for (let i = 0; i < props.columns.length; i++) {
      if (props.headersSort[i] !== SortEnum.Disabled && props.headersSort[i] !== SortEnum.Neutral) {
        return i;
      }
    }
    return -1;
  }, [props.headersSort]);

  return (
    <Wrapper>
      <Title filtersVisible={filtersVisible} isLight={isLight}>
        {' '}
        Core Units
      </Title>
      <Container isLight={isLight}>
        <ResetFilter filtersVisible={filtersVisible}>
          <ResetButton
            onClick={props.clearFilters}
            disabled={
              props.filteredStatuses &&
              !props.filteredStatuses.length &&
              props.filteredCategories &&
              !props.filteredCategories.length &&
              !props.searchText
            }
          />
        </ResetFilter>
        <SmallSeparator isLight={isLight} />
        <Status filtersVisible={filtersVisible}>
          <CustomMultiSelect
            label="Status"
            activeItems={props.filteredStatuses}
            customAll={{
              id: 'All',
              content: <StatusChip status={'All'} />,
              count: props.statusCount.All,
            }}
            items={statuses.map((stat) => ({
              id: stat,
              content: <StatusChip status={stat as CuStatusEnum} />,
              count: props.statusCount[stat],
            }))}
            maxWidth={100}
            onChange={(value: string[]) => {
              handleChangeUrlFilterArrays('filteredStatuses')(value);
            }}
          />
        </Status>
        <Category filtersVisible={filtersVisible}>
          <CustomMultiSelect
            label="CU Category"
            activeItems={props.filteredCategories}
            customAll={{
              id: 'All',
              content: <CategoryChip category={'All'} />,
              count: props.categoriesCount.All,
            }}
            items={categories.map((cat) => ({
              id: cat,
              content: <CategoryChip category={cat as CuCategoryEnum} />,
              count: props.categoriesCount[cat],
            }))}
            maxWidth={143}
            onChange={(value: string[]) => {
              handleChangeUrlFilterArrays('filteredCategories')(value);
            }}
          />
        </Category>
        <Search filtersVisible={filtersVisible}>
          <SearchInput
            inputRef={inputRef}
            handleCloseSearch={handleCloseSearch}
            defaultValue={props.searchText}
            placeholder="Search"
            onChange={(value: string) => {
              debounce(() => {
                handleChangeUrlFilterArrays('searchText')(value);
              }, 300);
            }}
          />
        </Search>
        <ButtonFilter isActive={filtersVisible} onClick={toggleFiltersVisible}>
          <Filter fill={filtersVisible ? '#1AAB9B' : '#231536'} />
        </ButtonFilter>
        <Sort>
          <CustomSortSelect
            label="Sort"
            activeItem={activeItem}
            sortStatus={activeItem > -1 ? props.headersSort[activeItem] : SortEnum.Asc}
            items={props.columns.map(
              (column) =>
                ({
                  id: column.header,
                  content: column.header,
                } as SortSelectItem)
            )}
            maxWidth={216}
            onChange={props.onSortApply}
            onReset={props.onSortReset}
          />
        </Sort>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
});

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'grid',
  backgroundColor: isLight ? 'white' : 'none',
  gridTemplateColumns: 'auto',
  gridTemplateRows: 'auto',
  gap: '16px',
  flex: 1,
  alignItems: 'center',
  gridTemplateAreas: `
    "search search buttonFilter sort"
    "status category category resetFilter"
  `,
  '@media (min-width: 834px)': {
    gridTemplateAreas: `
    ". search search search search"
    "resetFilter status category separator sort"
  `,
  },
  '@media (min-width: 1194px)': {
    gridTemplateAreas: `
    "resetFilter status category separator search" 
  `,
  },
}));

const SmallSeparator = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    height: '32px',
    width: '1px',
    backgroundColor: isLight ? '#D4D9E1' : '#48495F',
    alignSelf: 'center',
    gridArea: 'separator',
    display: 'none',
    '@media (min-width: 834px)': {
      display: 'block',
    },
  })
);

const Sort = styled.div({
  gridArea: 'sort',
  '@media (min-width: 1194px)': {
    display: 'none',
  },
});

const Search = styled.div<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'search',
  justifySelf: 'flex-end',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));

const Status = styled.div<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'status',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));

const Category = styled.div<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'category',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));

const ResetFilter = styled.div<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'resetFilter',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));

const ButtonFilter = styled.div<{ isActive: boolean }>(({ isActive }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  width: '34px',
  height: '34px',
  border: '1px solid #D4D9E1',
  borderRadius: '50%',
  alignItems: 'center',
  background: isActive ? '#B6EDE7' : 'white',
  justifyContent: 'center',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

const Title = styled.div<{ filtersVisible: boolean; isLight: boolean }>(({ filtersVisible, isLight }) => ({
  display: filtersVisible ? 'none' : 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: isLight ? '29px' : '38px',
  letterSpacing: '0.4px',
  flex: 1,
  color: isLight ? '#231536' : '#D2D4EF',
  '@media (min-width: 834px)': {
    display: 'block',
    fontSize: '24px',
    lineHeight: '24px',
  },
}));
