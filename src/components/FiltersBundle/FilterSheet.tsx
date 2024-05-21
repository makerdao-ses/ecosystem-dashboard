import { Sheet } from 'react-modal-sheet';
import FilterList from './FiltersList';
import type { Filter } from './types';

interface FilterSheetProps {
  isOpen: boolean;
  handleClose: () => void;
  filters: Filter[];
}

const FilterSheet: React.FC<FilterSheetProps> = ({ isOpen, handleClose, filters }) => (
  <Sheet isOpen={isOpen} onClose={handleClose} snapPoints={[600, 400, 100, 0]} initialSnap={1}>
    <Sheet.Container>
      <Sheet.Header />
      <Sheet.Content>
        <FilterList filters={filters} />
      </Sheet.Content>
    </Sheet.Container>
    <Sheet.Backdrop />
  </Sheet>
);

export default FilterSheet;
