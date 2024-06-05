import { stringify } from 'querystring';
import { Divider, styled, useTheme } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useRef } from 'react';
// import { CategoryChip } from '@/components/CategoryChip/CategoryChip';
import CategoryChip from '@/components/CategoryChip/CategoryChip';
import { CuCategoryEnum } from '@/core/enums/cuCategoryEnum';
import { SortEnum } from '@/core/enums/sortEnum';
import { useDebounce } from '@/core/hooks/useDebounce';
import type { TeamCategory } from '@/core/models/interfaces/types';
import { TeamStatus } from '@/core/models/interfaces/types';
import { CustomMultiSelect } from '@/stories/components/CustomMultiSelect/CustomMultiSelect';
import type { SortSelectItem } from '@/stories/components/CustomSortSelect/CustomSortSelect';
import { CustomSortSelect } from '@/stories/components/CustomSortSelect/CustomSortSelect';

import ResetButton from '@/stories/components/ResetButton/ResetButton';
import { SearchInput } from '@/stories/components/SearchInput/SearchInput';
import { StatusChipLegacy } from '@/stories/components/StatusChipLegacy/StatusChipLegacy';
import Filter from '@/stories/components/svg/filter';
import type { CustomTableColumn } from './components/CustomTable/CustomTable2';

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
  onSortApply?: (index: number, sort: SortEnum) => void;
  onSortReset?: () => void;
}

const statuses = Object.values(TeamStatus) as string[];
const categories = Object.values(CuCategoryEnum) as string[];

export const Filters = (props: FilterProps) => {
  const router = useRouter();
  const debounce = useDebounce();
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const inputRef = useRef<HTMLInputElement>(null);

  const [filtersVisible, setFiltersVisible] = React.useState(false);

  const toggleFiltersVisible = () => setFiltersVisible(!filtersVisible);

  const handleChangeUrlFilterArrays = useCallback(
    (key: string) => (value: string[] | string) => {
      const search = router.query;
      search[key] = Array.isArray(value) ? value.join(',') : value || '';
      router.push({
        pathname: siteRoutes.coreUnitsOverview,
        search: stringify(search),
      });
    },
    [router]
  );

  const handleClearSearch = () => {
    const search = router.query;
    delete search.searchText;
    router.push({
      pathname: siteRoutes.coreUnitsOverview,
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
  }, [props.columns.length, props.headersSort]);

  const filtersActive = !(
    props.filteredStatuses &&
    !props.filteredStatuses.length &&
    props.filteredCategories &&
    !props.filteredCategories.length &&
    !props.searchText
  );

  return (
    <Wrapper>
      <Title filtersVisible={filtersVisible}>Core Units</Title>
      <Container filtersVisible={filtersVisible}>
        <ResetFilter filtersVisible={filtersVisible}>
          <ResetButton onClick={props.clearFilters} disabled={!filtersActive} />
        </ResetFilter>
        <SmallSeparator isLight={isLight} />
        <Status filtersVisible={filtersVisible}>
          <CustomMultiSelect
            label="Status"
            activeItems={props.filteredStatuses}
            customAll={{
              id: 'All',
              content: <StatusChipLegacy status={'All'} />,
              count: props.statusCount.All,
            }}
            items={statuses.map((stat) => ({
              id: stat,
              content: <StatusChipLegacy status={stat as TeamStatus} />,
              count: props.statusCount[stat],
            }))}
            width={118}
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
              content: <CategoryChip category={'All' as TeamCategory} />,
              count: props.categoriesCount.All,
            }}
            width={161}
            items={categories.map((cat) => ({
              id: cat,
              content: <CategoryChip category={cat as TeamCategory} />,
              count: props.categoriesCount[cat],
            }))}
            onChange={(value: string[]) => {
              handleChangeUrlFilterArrays('filteredCategories')(value);
            }}
          />
        </Category>
        <Search filtersVisible={filtersVisible}>
          <SearchInput
            inputRef={inputRef}
            handleClearSearch={handleClearSearch}
            defaultValue={props.searchText}
            placeholder="Search"
            onChange={(value: string) => {
              debounce(() => {
                handleChangeUrlFilterArrays('searchText')(value);
              }, 300);
            }}
          />
        </Search>
        <ButtonFilter isOpen={filtersVisible} isActive={filtersActive} onClick={toggleFiltersVisible}>
          <Filter
            fill={filtersActive || filtersVisible ? (isLight ? '#1AAB9B' : '#098C7D') : isLight ? '#231536' : 'white'}
          />
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

const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  alignItems: 'center',
});

const Container = styled('div')<{ filtersVisible: boolean }>(({ theme, filtersVisible }) => ({
  display: 'grid',
  backgroundColor: theme.palette.isLight ? 'white' : 'none',
  gridTemplateColumns: filtersVisible ? '118px calc(100% - 230px) 34px 34px' : 'auto auto 34px 34px',
  gridTemplateRows: 'auto',
  gap: '16px',
  flex: 1,
  alignItems: 'center',
  placeItems: 'center',
  gridTemplateAreas: `
    "search search buttonFilter sort"
    "status category category resetFilter"
  `,
  '@media (min-width: 834px)': {
    gridTemplateColumns: 'auto',
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

export const SmallSeparator = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight: boolean;
}>(({ isLight }) => ({
  height: '32px',
  width: '1px',
  backgroundColor: isLight ? '#D4D9E1' : '#48495F',
  alignSelf: 'center',
  gridArea: 'separator',
  display: 'none',
  '@media (min-width: 834px)': {
    display: 'block',
  },
}));

const Sort = styled('div')({
  gridArea: 'sort',
  '@media (min-width: 1194px)': {
    display: 'none',
  },
});

const Search = styled('div')<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'search',
  justifySelf: 'stretch',
  '@media (min-width: 834px)': {
    display: 'flex',
    justifySelf: 'flex-end',
  },
}));

const Status = styled('div')<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'status',
  placeItems: 'flex-start',
  justifyContent: 'flex-start',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));

const Category = styled('div')<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'category',
  placeItems: 'flex-start',
  justifyContent: 'flex-start',
  width: '100%',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));

const ResetFilter = styled('div')<{ filtersVisible: boolean }>(({ filtersVisible }) => ({
  display: filtersVisible ? 'flex' : 'none',
  gridArea: 'resetFilter',
  '@media (min-width: 834px)': {
    display: 'flex',
  },
}));

export const ButtonFilter = styled('div')<{ isActive: boolean; isOpen: boolean }>(({ isActive, isOpen, theme }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  width: '34px',
  height: '34px',
  border: theme.palette.isLight
    ? isOpen || isActive
      ? '1px solid #6EDBD0'
      : '1px solid #D4D9E1'
    : isOpen || isActive
    ? '1px solid #098C7D'
    : '1px solid #343442',
  borderRadius: '50%',
  alignItems: 'center',
  background: isOpen
    ? theme.palette.isLight
      ? '#B6EDE7'
      : '#003C40'
    : theme.palette.isLight
    ? 'white'
    : 'transparent',
  justifyContent: 'center',
  boxSizing: 'border-box',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));

const Title = styled('div')<{ filtersVisible: boolean }>(({ filtersVisible, theme }) => ({
  display: filtersVisible ? 'none' : 'block',
  fontFamily: 'Inter, sans-serif',
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: theme.palette.isLight ? '28.8px' : '38px',
  letterSpacing: '0.4px',
  flex: 1,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  '@media (min-width: 834px)': {
    display: 'block',
    alignSelf: 'flex-start',
  },
  '@media (min-width: 1194px)': {
    alignSelf: 'center',
  },
}));
