import { Button, styled } from '@mui/material';
import CleanIcon from 'public/assets/svg/clean.svg';
import CustomSheet from '../CustomSheet/CustomSheet';
import FilterList from './FiltersList';
import type { Filter, ResetFilter } from './types';

interface FilterMobileProps {
  isOpen: boolean;
  handleClose: () => void;
  filters: Filter[];
  resetFilters?: ResetFilter;
  initialSnap?: number;
}

const FilterMobile: React.FC<FilterMobileProps> = ({ isOpen, handleClose, filters, resetFilters, initialSnap = 2 }) => (
  <CustomSheet isOpen={isOpen} handleClose={handleClose} initialSnap={initialSnap} snapPoints={[650, 450, 250, 0]}>
    <FilterList filters={filters} handleClose={handleClose} />
    {!!resetFilters && (
      <FullWidthButton
        variant="contained"
        color="primary"
        disabled={!resetFilters?.canReset}
        onClick={resetFilters?.onReset}
      >
        <CleanIcon width="21" height="22" />
        Reset
      </FullWidthButton>
    )}
  </CustomSheet>
);

export default FilterMobile;

const FullWidthButton = styled(Button)(({ theme }) => ({
  padding: '6px 8px 6px 4px',
  margin: '16px',
  borderRadius: 8,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  color: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[300],
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '150%',
  textTransform: 'none',
  boxShadow: 'none',
  display: 'flex',
  flexDirection: 'row',
  gap: 4,
  '&:hover': {
    boxShadow: 'none',
    color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.charcoal[100],
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  },
}));
