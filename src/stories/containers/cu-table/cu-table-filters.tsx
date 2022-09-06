import React, { useCallback, useRef } from 'react';
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
import { useThemeContext } from '../../../core/context/ThemeContext';
import { Divider } from '@mui/material';

interface FilterProps {
  filtersPopup: boolean;
  filteredStatuses: string[];
  filteredCategories: string[];
  searchText: string;
  setFiltersPopup: () => void;
  clearFilters: () => void;
  statusCount: { [id: string]: number };
  categoriesCount: { [id: string]: number };
  handleCloseSearch?: () => void
}

const statuses = Object.values(CuStatusEnum) as string[];
const categories = Object.values(CuCategoryEnum) as string[];

export const Filters = (props: FilterProps) => {
  const router = useRouter();
  const debounce = useDebounce();
  const isLight = useThemeContext().themeMode === 'light';
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChangeUrlFilterArrays = useCallback((key: string) => (value: string[] | string) => {
    const search = router.query;
    search[key] = Array.isArray(value) ? value.join(',') : (value || '');
    router.push({
      pathname: '/',
      search: stringify(search),
    });
  }, [router]);

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

  return <Wrapper isLight={isLight} style={{
    display: props.filtersPopup ? 'flex' : 'none',
  }}>
    <Container isLight={isLight}>
      <CustomButton
        label="Reset Filters"
        style={{
          width: '114px',
          border: 'none',
          background: isLight ? 'none' : 'none',
        }}
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        onClick={props.clearFilters}
        disabled={props.filteredStatuses && !props.filteredStatuses.length && props.filteredCategories && !props.filteredCategories.length && !props.searchText}
      />
      <SmallSeparator isLight={isLight} />
      <CustomMultiSelect
        label="Status"
        activeItems={props.filteredStatuses}
        customAll={{
          id: 'All',
          content: <StatusChip status={'All'} />,
          count: props.statusCount.All
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
      <CustomMultiSelect
        label="CU Category"
        activeItems={props.filteredCategories}
        customAll={{
          id: 'All',
          content: <CategoryChip category={'All'} />,
          count: props.categoriesCount.All
        }}
        items={categories.map(cat => ({
          id: cat,
          content: <CategoryChip category={cat as CuCategoryEnum} />,
          count: props.categoriesCount[cat]
        }))}
        maxWidth={143}
        onChange={(value: string[]) => {
          handleChangeUrlFilterArrays('filteredCategories')(value);
        }}
      />
      <Separator isLight={isLight} />
      {router.isReady && <SearchInput
        inputRef={inputRef}
        handleCloseSearch={handleCloseSearch}
        defaultValue={props.searchText}
        placeholder="Search"
        onChange={(value: string) => {
          debounce(() => {
            handleChangeUrlFilterArrays('searchText')(value);
          }, 300);
        }}
      />}
      {!router.isReady && <SearchInput
        handleCloseSearch={handleCloseSearch}
        defaultValue={props.searchText}
        placeholder="Search"
        onChange={(value: string) => {
          debounce(() => {
            handleChangeUrlFilterArrays('searchText')(value);
          }, 300);
        }}
      />}
      <CloseButton onClick={() => props.setFiltersPopup && props.setFiltersPopup()}>
        <Close />
      </CloseButton>
    </Container>
  </Wrapper>;
};

const Separator = styled(Divider)<{ isLight: boolean }>(({ isLight }) => ({
  height: '1px',
  width: 'calc(100vw - 64px)',
  margin: '0 16px',
  // * IPhone real devices
  '@supports (-webkit-touch-callout: none) and (not (translate: none))': {
    marginTop: '24px',
    marginBottom: '16px'
  },
  backgroundColor: isLight ? '#D4D9E1' : '#48495F',
  alignSelf: 'center',
  '@media (min-width: 834px)': {
    width: '1px',
    height: '32px',
    margin: 0,
  },
}));

const SmallSeparator = styled(Divider)<{ isLight: boolean }>(({ isLight }) => ({
  height: '1px',
  width: '64px',
  backgroundColor: isLight ? '#D4D9E1' : '#48495F',
  alignSelf: 'center',
  // * IPhone real devices
  '@supports (-webkit-touch-callout: none) and (not (translate: none))': {
    marginTop: '24px',
    marginBottom: '16px'
  },
  '@media (min-width: 833px)': {
    display: 'none'
  },

}));

const Wrapper = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'none',
  '@media (max-width: 833px)': {
    top: 0,
    left: 0,
    zIndex: 100,
    position: 'fixed',
    height: '100vh',
    overscrollBehavior: 'auto',
    overflowY: 'scroll',
    width: '100%',
    background: isLight ? 'white' : '#000A13',
  },
  '@media (min-width: 834px)': {
    display: 'flex !important',
  },
  '@media (min-width: 834px) and (max-width: 1180px)': {
    alignSelf: 'flex-end'
  }
}));

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  backgroundColor: isLight ? 'white' : 'none',
  // * IPhone real devices
  '@supports (-webkit-touch-callout: none) and (not (translate: none))': {
    '> * + *': {
      marginTop: '24px'
    },
  },

  '@media (max-width: 833px)': {
    position: 'relative',
    height: 'calc(100vh + 20px)',
    width: '100%',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '24px',
    background: !isLight ? '#000A13' : 'none',
  },
  '@media (min-width: 834px)': {
    gap: '16px',
  },
}));

const CloseButton = styled.div({
  alignSelf: 'flex-end',
  margin: '22px 22px 30px 0',
  cursor: 'pointer',
  '@media (min-width: 834px)': {
    display: 'none'
  }
});
