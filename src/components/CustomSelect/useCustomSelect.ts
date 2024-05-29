import { useTheme } from '@mui/material';
import type { CustomSelectProps, OptionItem } from './type';
import type { SelectChangeEvent } from '@mui/material';
import type { ReactNode } from 'react';

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
  const isAllSelected = multiple && withAll && Array.isArray(selected) && selected.length === options.length;

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    onChange(event.target.value as string | string[]);
  };

  const handleChangeAll = () => {
    onChange(isAllSelected ? [] : options.map((option) => option.value));
  };

  const renderValue = (value: unknown): ReactNode => {
    if ((value as string | string[]).length === 0) return `${label}`;
    if (multiple) {
      const selectedOptions = (value as string[]).map((v) => options.find((option) => option.value === v));
      if (selectedOptions.length > 1) {
        return `${label} (${selectedOptions.length})`;
      }
      return selectedOptions[0]?.label;
    }
    return `${options.find((option: OptionItem) => option.value === value)?.label}`;
  };

  const isActive = (option: OptionItem) => {
    if (multiple) {
      return (selected as (string | number)[]).includes(option.value);
    }
    return selected === option.value;
  };

  return {
    theme,
    isAllSelected,
    handleChange,
    handleChangeAll,
    renderValue,
    isActive,
  };
}
