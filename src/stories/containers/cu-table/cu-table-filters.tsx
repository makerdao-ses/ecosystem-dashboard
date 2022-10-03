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
import { Close } from '../../components/svg/close';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { Divider } from '@mui/material';
import { CustomSortSelect, SortSelectItem } from '../../components/custom-sort-select/custom-sort-select';
import { CustomTableColumn } from '../../components/custom-table/custom-table-2';
import { SortEnum } from '../../../core/enums/sort.enum';

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
  const inputRef2 = useRef<HTMLInputElement>(null);

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
    if (inputRef2.current !== null) {
      inputRef2.current.value = '';
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
    <Wrapper
      isLight={isLight}
      style={{
        display: props.filtersPopup ? 'flex' : 'none',
      }}
    >
      <HideOn1195>
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
      </HideOn1195>
      <Container isLight={isLight}>
        <CustomButton
          label="Reset Filters"
          style={{
            width: '114px',
            border: 'none',
            background: 'none',
          }}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={props.clearFilters}
          disabled={
            props.filteredStatuses &&
            !props.filteredStatuses.length &&
            props.filteredCategories &&
            !props.filteredCategories.length &&
            !props.searchText
          }
        />
        <SmallSeparator isLight={isLight} />
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
        <Separator isLight={isLight} />
        <HideOn834>
          <SearchInput
            inputRef={inputRef2}
            handleCloseSearch={handleCloseSearch}
            defaultValue={props.searchText}
            placeholder="Search"
            onChange={(value: string) => {
              debounce(() => {
                handleChangeUrlFilterArrays('searchText')(value);
              }, 300);
            }}
          />
        </HideOn834>
        <HideOn1195>
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
        </HideOn1195>
        <CloseButton onClick={() => props.setFiltersPopup && props.setFiltersPopup()}>
          <Close />
        </CloseButton>
      </Container>
    </Wrapper>
  );
};

const Separator = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    height: '1px',
    width: 'calc(100vw - 64px)',
    margin: '0 16px',
    marginTop: '24px',
    marginBottom: '16px',
    // * IPhone real devices
    '@supports (-webkit-touch-callout: none) and (not (translate: none))': {
      marginTop: '24px',
      marginBottom: '16px',
    },
    backgroundColor: isLight ? '#D4D9E1' : '#48495F',
    alignSelf: 'center',
    '@media (min-width: 834px)': {
      width: '1px',
      height: '32px',
      margin: 0,
    },
  })
);

const HideOn834 = styled.div({
  '@media (min-width: 834px) and (max-width: 1194px)': {
    display: 'none',
  },
});

const HideOn1195 = styled.div({
  '@media (min-width: 1195px)': {
    display: 'none',
  },
});

const SmallSeparator = styled(Divider, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    height: '1px',
    width: '64px',
    marginTop: '24px',
    marginBottom: '16px',
    backgroundColor: isLight ? '#D4D9E1' : '#48495F',
    alignSelf: 'center',
    // * IPhone real devices
    '@supports (-webkit-touch-callout: none) and (not (translate: none))': {
      marginTop: '24px',
      marginBottom: '16px',
    },
    '@media (min-width: 833px)': {
      display: 'none',
    },
  })
);

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
    flexDirection: 'column',
    alignItems: 'flex-end',
    '> :first-child': {
      marginBottom: '16px',
    },
  },
  '@media (min-width: 834px) and (max-width: 1194px)': {
    alignSelf: 'flex-end',
  },
}));

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  backgroundColor: isLight ? 'white' : 'none',
  // * IPhone real devices
  '@supports (-webkit-touch-callout: none) and (not (translate: none))': {
    '> * + *': {
      marginTop: '24px',
    },
  },

  '@media (max-width: 833px)': {
    position: 'relative',
    height: 'calc(100vh + 20px)',
    width: '100%',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',
    background: !isLight ? '#000A13' : 'none',
    '> * + *': {
      marginTop: '24px',
    },
  },
  '@media (min-width: 834px)': {
    gap: '16px',

    '@support not selector(gap:24px)': {
      '> * + *': {
        marginTop: '24px',
      },
    },
  },
}));

const CloseButton = styled.div({
  alignSelf: 'flex-end',
  margin: '22px 22px 30px 0',
  cursor: 'pointer',
  '@media (min-width: 834px)': {
    display: 'none',
  },
});
