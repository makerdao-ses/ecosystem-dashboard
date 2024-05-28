import CustomSheet from '../CustomSheet/CustomSheet';
import FilterList from './FiltersList';
import type { Filter, ResetFilter } from './types';

interface FilterSheetProps {
  isOpen: boolean;
  handleClose: () => void;
  filters: Filter[];
  resetFilters?: ResetFilter;
}

const FilterSheet: React.FC<FilterSheetProps> = ({ isOpen, handleClose, filters, resetFilters }) => (
  <CustomSheet isOpen={isOpen} handleClose={handleClose} initialSnap={2} snapPoints={[600, 400, 250, 0]}>
    <FilterList filters={filters} resetFilters={resetFilters} handleClose={handleClose} />
  </CustomSheet>
);

export default FilterSheet;
