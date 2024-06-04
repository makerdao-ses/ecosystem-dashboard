import { Button, styled } from '@mui/material';
import CleanIcon from 'public/assets/svg/clean.svg';
import Search from '@/components/Search/Search';
import CustomSheet from '../CustomSheet/CustomSheet';
import FilterList from './FiltersList';
import type { SearchFilter, Filter, ResetFilter } from './types';

interface FilterMobileProps {
  isOpen: boolean;
  handleClose: () => void;
  filters: Filter[];
  searchFilter?: SearchFilter;
  resetFilters?: ResetFilter;
  snapPoints?: number[];
  initialSnap?: number;
}

const FilterMobile: React.FC<FilterMobileProps> = ({
  isOpen,
  handleClose,
  filters,
  searchFilter,
  resetFilters,
  snapPoints = [600, 400, 250, 0],
  initialSnap,
}) => (
  <CustomSheet isOpen={isOpen} handleClose={handleClose} initialSnap={initialSnap} snapPoints={snapPoints}>
    {!!searchFilter && (
      <FullWidthSearch>
        <CustomSearch
          placeholder="Search"
          onChange={searchFilter.onChange}
          widthStyles={{ fullWidth: true }}
          value={searchFilter.value}
        />
      </FullWidthSearch>
    )}
    <FilterList filters={filters} handleClose={handleClose} />
    {!!resetFilters && (
      <FullWidthReset
        variant="contained"
        color="primary"
        disabled={!resetFilters?.canReset}
        onClick={resetFilters?.onReset}
      >
        <CleanIcon width="21" height="22" />
        Reset
      </FullWidthReset>
    )}
  </CustomSheet>
);

export default FilterMobile;

const FullWidthSearch = styled('div')({
  margin: '0 16px 16px',
});

const FullWidthReset = styled(Button)(({ theme }) => ({
  padding: '6px 8px 6px 4px',
  margin: '16px',
  borderRadius: 8,
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '150%',
  textTransform: 'none',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'row',
  gap: 4,

  '&:disabled': {
    color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
  },

  '&:hover': {
    boxShadow: 'none',
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  },
}));

const CustomSearch = styled(Search)({
  display: 'flex',
  '& > div': {
    width: '100%',
  },
  '& > input': {
    backgroundColor: 'red',
  },
});
