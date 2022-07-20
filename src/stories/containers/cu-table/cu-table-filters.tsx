import React, { useCallback } from 'react';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomMultiSelect } from '../../components/custom-multi-select/custom-multi-select';
import { SearchInput } from '../../components/search-input/search-input';
import styled from '@emotion/styled';
import { stringify } from 'querystring';
import { useRouter } from 'next/router';
import { useDebounce } from '../../../core/utils/use-debounce';
import { CuStatusEnum } from '../../../core/enums/cu-status.enum';
import { CuCategoryEnum } from '../../../core/enums/cu-category.enum';
import { Close } from '../../components/svg/close';

interface FilterProps {
  filtersPopup: boolean;
  filteredStatuses: string[];
  filteredCategories: string[];
  searchText: string;
  setFiltersPopup: () => void;
  clearFilters: () => void;
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
      disabled={props.filteredStatuses && props.filteredStatuses.length === 0}
    />
    <SmallSeparator/>
    <CustomMultiSelect
      label="Status"
      activeItems={props.filteredStatuses}
      items={statuses}
      onChange={(value: string[]) => {
        handleChangeUrlFilterArrays('filteredStatuses')(value);
      }}
    />
    <CustomMultiSelect
      label="CU Category"
      activeItems={props.filteredCategories}
      items={categories}
      onChange={(value: string[]) => {
        handleChangeUrlFilterArrays('filteredCategories')(value);
      }}
    />
    <Separator />
    {router.isReady && <SearchInput
        defaultValue={props.searchText}
        placeholder="Search"
        onChange={(value: string) => {
          debounce(() => {
            handleChangeUrlFilterArrays('searchText')(value);
          }, 300);
        }}
    />}
    {!router.isReady && <SearchInput
        defaultValue={props.searchText}
        placeholder="Search"
        onChange={(value: string) => {
          debounce(() => {
            handleChangeUrlFilterArrays('searchText')(value);
          }, 300);
        }}
        style={{ marginLeft: '16px' }}
    />}
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
