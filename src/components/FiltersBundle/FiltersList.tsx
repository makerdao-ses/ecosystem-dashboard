import { styled } from '@mui/material';
import SimpleBar from 'simplebar-react';
import RadioAsList from './defaults/RadioAsList';
import SelectAsList from './defaults/SelectAsList';
import type { Filter } from './types';

interface FilterListProps {
  filters: Filter[];
  handleClose: () => void;
}

const FilterList: React.FC<FilterListProps> = ({ filters, handleClose }) => (
  <SimpleBarStyled>
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
  </SimpleBarStyled>
);

export default FilterList;

const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
  padding: '0 16px',
}));

const SimpleBarStyled = styled(SimpleBar)(({ theme }) => ({
  overflowY: 'auto',
  maxHeight: '100%',
  '.simplebar-scrollbar::before': {
    width: 4,
    marginLeft: 0,
    background: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[700],
    borderRadius: 12,
  },
  [theme.breakpoints.up('tablet_768')]: {
    maxHeight: '450px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    maxHeight: '100%',
  },
}));
