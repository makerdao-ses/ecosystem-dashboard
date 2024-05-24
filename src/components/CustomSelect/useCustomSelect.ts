import { useTheme } from '@mui/material';
import type { CustomSelectProps, OptionItem } from './type';
import type { SelectChangeEvent } from '@mui/material';

export interface Props {
  label: CustomSelectProps['label'];
  options: CustomSelectProps['options'];
  multiple?: CustomSelectProps['multiple'];
  selected: CustomSelectProps['selected'];
  withAll?: CustomSelectProps['withAll'];
  onChange: CustomSelectProps['onChange'];
}

export default function useCustomSelect({ label, options, multiple, selected, withAll, onChange }: Props) {
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as CustomSelectProps['selected']);
  };

  const renderValue = (selected: unknown) => {
    if (multiple) {
      const selectedOptions = (selected as (string | number)[]).map((value) =>
        options.find((option) => option.value === value)
      );
      if (selectedOptions.length > 1) {
        return `${label} (${selectedOptions.length})`;
      }
      return selectedOptions[0]?.label;
    }
    return options.find((option) => option.value === selected)?.label;
  };

  const isAllSelected = withAll && Array.isArray(selected) && selected.length === options.length;

  const isActive = (option: OptionItem) => {
    if (multiple) {
      return (selected as (string | number)[]).includes(option.value);
    }
    return selected === option.value;
  };

  return {
    theme,
    handleChange,
    renderValue,
    isAllSelected,
    isActive,
  };
}
