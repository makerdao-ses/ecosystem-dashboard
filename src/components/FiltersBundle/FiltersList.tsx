import { styled } from '@mui/material';
import RadioAsList from './defaults/RadioAsList';
import SelectAsList from './defaults/SelectAsList';
import type { Filter } from './types';

interface FilterListProps {
  filters: Filter[];
  handleClose: () => void;
}

const FilterList: React.FC<FilterListProps> = ({ filters, handleClose }) => (
  <Container>
    {filters.map((filter) => {
      switch (filter.type) {
        case 'select': {
          return <SelectAsList filter={filter} onClose={handleClose} />;
        }
        case 'radio': {
          return <RadioAsList filter={filter} />;
        }
        default: {
          throw new Error('Unknown filter type');
        }
      }
    })}
  </Container>
);

export default FilterList;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '0 16px',
  maxHeight: '100%',
  overflowY: 'auto',
}));
