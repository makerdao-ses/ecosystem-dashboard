import { Button, Divider, styled } from '@mui/material';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import type { CustomSelectProps } from '@/components/CustomSelect/type';
import Search from '@/components/Search/Search';
import type { SearchFilter, Filter, ResetFilter } from './types';

interface FilterDesktopProps {
  filters: Filter[];
  searchFilter?: SearchFilter;
  resetFilters?: ResetFilter;
}

const FilterDesktop: React.FC<FilterDesktopProps> = ({ filters, searchFilter, resetFilters }) => (
  <FilterElement>
    {/* render reset if available */}
    {!!resetFilters && (
      <ResetButton variant="text" onClick={resetFilters.onReset} disabled={!resetFilters.canReset}>
        Reset Filter
      </ResetButton>
    )}
    {/* render all filters */}
    {filters.map((filter) => {
      switch (filter.type) {
        case 'select': {
          return (
            <CustomSelect
              label={filter.label}
              multiple={filter.multiple}
              selected={filter.selected as string | string[]}
              options={filter.options as CustomSelectProps['options']}
              onChange={filter.onChange as CustomSelectProps['onChange']}
              customOptionsRender={filter.customOptionsRender as CustomSelectProps['customOptionsRender']}
              withAll={filter.withAll}
              customOptionsRenderAll={filter.customOptionsRenderAll as CustomSelectProps['customOptionsRenderAll']}
              style={filter.widthStyles}
            />
          );
        }
        case 'radio': {
          return (
            <div key={filter.id}>
              {filter.options.map((option) => (
                <label key={option.value}>
                  <input
                    type="radio"
                    value={option.value}
                    checked={option.selected}
                    // onChange={() => filter.onChange(option.value)}
                  />
                  {option.label}
                </label>
              ))}
            </div>
          );
        }
        default: {
          throw new Error('Unknown filter type');
        }
      }
    })}
    {!!searchFilter && (
      <SearchWrapper>
        <CustomDivider orientation="vertical" flexItem />
        <CustomSearch
          placeholder="Search"
          onChange={searchFilter.onChange}
          widthStyles={searchFilter.widthStyles}
          value={searchFilter.value}
        />
      </SearchWrapper>
    )}
  </FilterElement>
);

export default FilterDesktop;

const ResetButton = styled(Button)(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  borderRadius: 6,
  background: 'transparent',
  padding: '4px 16px',
  textTransform: 'none',

  '&:disabled': {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.gray[800],
  },

  '&:hover': {
    background: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[900],
  },
}));

const FilterElement = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
});

const CustomDivider = styled(Divider)(({ theme }) => ({
  marginTop: 4,
  height: 24,
  background: theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[300],
}));

const SearchWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
});

const CustomSearch = styled(Search)(() => ({
  display: 'flex',
  '& > div': {
    width: '100%',
  },
}));
