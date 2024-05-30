import { Check } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material';
import FilterAsListBase from './FilterAsListBase';
import type { SelectFilter, SelectOption } from '../types';

interface SelectAsListProps {
  filter: SelectFilter;
  onClose: () => void;
}

const SelectAsList: React.FC<SelectAsListProps> = ({ filter, onClose }) => {
  const theme = useTheme();

  const isAllSelected =
    (filter.multiple &&
      filter.withAll &&
      Array.isArray(filter.selected) &&
      filter.selected.length === filter.options.length) ||
    false;

  const isActive = (option: SelectOption) =>
    filter.multiple
      ? (filter.selected as (string | number)[]).includes(option.value)
      : filter.selected === option.value;

  const handleChangeAll = () => {
    filter.onChange(isAllSelected ? [] : filter.options.map((option) => option.value));
  };

  const handleChange = (value: SelectOption['value']) => {
    if (filter.multiple) {
      const selected = filter.selected as (string | number)[];
      const newSelected = selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value];
      filter.onChange(newSelected);
    } else {
      filter.onChange(value);
      onClose();
    }
  };

  return (
    <FilterAsListBase label={filter.label}>
      <SelectContainer>
        {filter.withAll && (
          <CustomOption onClick={handleChangeAll} isSelected={isAllSelected}>
            {(filter.customOptionsRenderAll && filter.customOptionsRenderAll(isAllSelected || false, theme)) ||
              'Select All'}
            {filter.multiple && isAllSelected && <CheckIcon width={16} height={16} />}
          </CustomOption>
        )}
        {filter.options.map((option) => (
          <CustomOption key={option.value} onClick={() => handleChange(option.value)} isSelected={isActive(option)}>
            {filter.customOptionsRender ? filter.customOptionsRender(option, isActive(option), theme) : option.label}
            {filter.multiple && isActive(option) && <CheckIcon width={16} height={16} />}
          </CustomOption>
        ))}
      </SelectContainer>
    </FilterAsListBase>
  );
};

export default SelectAsList;

const SelectContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  background: 'transparent',
  border: 'none',
  outline: 'none',
  gap: '8px',
  alignContent: 'center',
}));

const CustomOption = styled('div')<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  padding: '4px 8px',
  height: '32px',
  fontSize: 14,
  fontWeight: isSelected ? 600 : 400,
  lineHeight: '22px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  cursor: 'pointer',
  backgroundColor: isSelected
    ? `${theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.40)'}`
    : 'transparent',

  '&:hover': {
    backgroundColor: isSelected
      ? `${theme.palette.isLight ? 'rgba(243, 245, 247, 0.50)' : 'rgba(37, 42, 52, 0.20)'} !important`
      : `${theme.palette.isLight ? theme.palette.colors.slate[50] : 'rgba(37, 42, 52, 0.40)'} !important`,
  },
}));

const CheckIcon = styled(Check)(({ theme }) => ({
  marginTop: 2,
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
  width: 16,
  height: 16,
}));
