import { Button, Popover, styled, useTheme } from '@mui/material';
import Search from '@/components/Search/Search';
import FilterList from './FiltersList';
import type { Filter, ResetFilter, SearchFilter } from './types';
import type { Theme } from '@mui/material';
import type { MutableRefObject } from 'react';

interface FilterTabletProps {
  isOpen: boolean;
  handleClose: () => void;
  filters: Filter[];
  searchFilter?: SearchFilter;
  resetFilters?: ResetFilter;
  anchorEl: MutableRefObject<HTMLDivElement | null>;
}

const FilterTablet: React.FC<FilterTabletProps> = ({
  isOpen,
  handleClose,
  filters,
  searchFilter,
  anchorEl,
  resetFilters,
}) => {
  const theme = useTheme();
  return (
    <Popover open={isOpen} anchorEl={anchorEl.current} onClose={handleClose} {...(StyledMenuProps(theme) as object)}>
      <Container>
        {!!resetFilters && (
          <FilterHeader>
            <FilterTitle>Filters</FilterTitle>
            <ResetButton variant="text" onClick={resetFilters?.onReset} disabled={!resetFilters.canReset}>
              Reset Filter
            </ResetButton>
          </FilterHeader>
        )}
      </Container>
      {!!searchFilter && (
        <FullWidthSearch>
          <CustomSearch
            placeholder="Search"
            onChange={searchFilter.onChange}
            widthStyles={{
              fullWidth: true,
            }}
            value={searchFilter.value}
          />
        </FullWidthSearch>
      )}
      <FilterList filters={filters} handleClose={handleClose} />
    </Popover>
  );
};

export default FilterTablet;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: 16,
}));

const FilterHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const FilterTitle = styled('p')(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.slate[600] : theme.palette.colors.slate[50],
  fontSize: 16,
  fontWeight: 600,
  lineHeight: '24px',
  padding: 0,
  margin: 0,
}));

const ResetButton = styled(Button)(({ theme }) => ({
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.gray[500],
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '22px',
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

const StyledMenuProps = (theme: Theme) => ({
  PaperProps: {
    sx: {
      minWidth: 290,
      color: '#000',
      backgroundImage: 'none',
      bgcolor: theme.palette.isLight ? '#ffffff' : theme.palette.colors.charcoal[900],
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
      paddingBottom: '16px',
      '&.MuiPaper-elevation.MuiPaper-rounded': {
        borderRadius: '12px',
      },
    },
  },
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'right',
  },
  sx: {
    mt: 0.5,
  },
});

const FullWidthSearch = styled('div')({
  margin: '16px',
});

const CustomSearch = styled(Search)({
  display: 'flex',
  '& > div': {
    width: '100%',
  },
  '& > input': {
    backgroundColor: 'red',
  },
});
