import { styled } from '@mui/material';
import FilterAsListBase from './FilterAsListBase';
import type { SelectFilter } from '../types';

interface SelectAsListProps {
  filter: SelectFilter;
}

const SelectAsList: React.FC<SelectAsListProps> = ({ filter }) => (
  <FilterAsListBase label={filter.label}>
    <Select size={filter.options.length}>
      {filter.options.map((option) => (
        <Option key={option.value} value={option.value} selected={option.selected}>
          {option.label}
        </Option>
      ))}
    </Select>
  </FilterAsListBase>
);

export default SelectAsList;

const Select = styled('select')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  background: 'transparent',
  border: 'none',
  outline: 'none',
}));

const Option = styled('option')(({ theme }) => ({
  padding: '12px 8px',
  fontSize: 14,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : 'red',

  '&[selected]': {
    fontWeight: 700,
  },
}));
