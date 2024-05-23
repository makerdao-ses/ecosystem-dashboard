import SearchIcon from '@mui/icons-material/Search';
import { Button, InputAdornment, TextField, styled } from '@mui/material';
import RadioAsList from './defaults/RadioAsList';
import SelectAsList from './defaults/SelectAsList';
import type { Filter, ResetFilter } from './types';

interface FilterListProps {
  filters: Filter[];
  resetFilters?: ResetFilter;
  handleClose: () => void;
}

const FilterList: React.FC<FilterListProps> = ({ filters, resetFilters, handleClose }) => (
  <Container>
    {filters.map((filter) => {
      switch (filter.type) {
        case 'search': {
          return (
            <div>
              {/* TODO: implement search component */}
              <TextField
                fullWidth
                size="small"
                key={filter.id}
                variant="outlined"
                placeholder="Search"
                type="text"
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          );
        }
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

    <FullWidthButton
      visible={!!resetFilters}
      variant="contained"
      color="primary"
      disabled={!resetFilters?.canReset}
      onClick={resetFilters?.onReset}
    >
      Reset
    </FullWidthButton>
  </Container>
);

export default FilterList;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '0 16px',
}));

const FullWidthButton = styled(Button)<{ visible: boolean }>(({ visible }) => ({
  display: visible ? 'flex' : 'none',
  width: '100%',
}));
