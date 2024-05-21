import { styled } from '@mui/material';
import SelectAsList from './defaults/SelectAsList';
import type { Filter } from './types';

interface FilterListProps {
  filters: Filter[];
}

const FilterList: React.FC<FilterListProps> = ({ filters }) => (
  <Container>
    {filters.map((filter) => {
      switch (filter.type) {
        case 'search': {
          return (
            <div>
              {/* TODO: implement search component */}
              <input
                key={filter.id}
                type="search"
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
              />
            </div>
          );
        }
        case 'select': {
          return <SelectAsList filter={filter} />;
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
}));
