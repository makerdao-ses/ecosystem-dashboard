import React, { useCallback, useMemo } from 'react';
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
import { Close } from '../../components/svg/close';

interface FilterProps {
  filtersPopup: boolean;
  filteredStatuses: string[];
  filteredCategories: string[];
  searchText: string;
  setFiltersPopup: () => void;
  clearFilters: () => void;
  statusCount: {[id: string]: number};
  categoriesCount: {[id: string]: number};
}

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];

export const Filters = (props: FilterProps) => {
  const router = useRouter();
  const debounce = useDebounce();

  const handleChangeUrlFilterArrays = useCallback((key: string) => (value: string[] | string) => {
    const search = router.query;
    search[key] = Array.isArray(value) ? value.join(',') : (value || '');
    router.push({
      pathname: '/',
      search: stringify(search),
    });
  }, [router]);

  const searchInput = useMemo(() => <SearchInput
    defaultValue={props.searchText}
    placeholder="Search"
    onChange={(value: string) => {
      debounce(() => {
        handleChangeUrlFilterArrays('searchText')(value);
      }, 300);
    }}
    style={{ marginLeft: '16px' }}
  />, [router.isReady]);

  return <Container
    style={{
      display: props.filtersPopup ? 'flex' : 'none'
    }}
  >
    <CustomButton
      label="Reset Filters"
      style={{
        width: '114px',
        border: 'none'
      }}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick={props.clearFilters}
      disabled={props.filteredStatuses && !props.filteredStatuses.length && props.filteredCategories && !props.filteredCategories.length}
    />
    <SmallSeparator/>
    <CustomMultiSelect
      label="Status"
      activeItems={props.filteredStatuses}
      customAll={{
        id: 'All',
        content: <StatusChip status={'All'}/>,
        count: props.statusCount.All
      }}
      items={statuses.map((stat) => ({
        id: stat,
        content: <StatusChip status={stat as CuStatusEnum}/>,
        count: props.statusCount[stat],
      }))}
      maxWidth={100}
      onChange={(value: string[]) => {
        handleChangeUrlFilterArrays('filteredStatuses')(value);
      }}
    />
    <CustomMultiSelect
      label="CU Category"
      activeItems={props.filteredCategories}
      customAll={{
        id: 'All',
        content: <CategoryChip category={'All'}/>,
        count: props.categoriesCount.All
      }}
      items={categories.map(cat => ({
        id: cat,
        content: <CategoryChip category={cat as CuCategoryEnum}/>,
        count: props.categoriesCount[cat]
      }))}
      maxWidth={143}
      onChange={(value: string[]) => {
        handleChangeUrlFilterArrays('filteredCategories')(value);
      }}
    />
    <Separator />
    {searchInput}
    <CloseButton onClick={() => props.setFiltersPopup && props.setFiltersPopup()}>
      <Close/>
    </CloseButton>
  </Container>;
};

const Separator = styled.span({
  height: '1px',
  width: 'calc(100vw - 64px)',
  margin: '0 32px',
  backgroundColor: '#D4D9E1',
  alignSelf: 'center',
  '@media (min-width: 835px)': {
    width: '1px',
    height: '32px',
    margin: 0,
  },
  '@media (min-width: 835px) and (max-width: 1180px)': {
    alignSelf: 'flex-end'
  }
});

const SmallSeparator = styled.span({
  height: '1px',
  width: '64px',
  backgroundColor: '#D4D9E1',
  alignSelf: 'center',
  '@media (min-width: 835px)': {
    display: 'none'
  }
});

const Container = styled.div({
  display: 'none',
  '@media (max-width: 835px)': {
    top: 0,
    left: 0,
    zIndex: 100,
    position: 'fixed',
    width: '100%',
    height: '100%',
    background: 'white',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '24px'
  },
  '@media (min-width: 835px)': {
    display: 'flex !important',
    gap: '16px',
  },
  '@media (min-width: 835px) and (max-width: 1180px)': {
    alignSelf: 'flex-end'
  }
});

const CloseButton = styled.div({
  alignSelf: 'flex-end',
  margin: '22px 22px 30px 0',
  '@media (min-width: 835px)': {
    display: 'none'
  }
});
