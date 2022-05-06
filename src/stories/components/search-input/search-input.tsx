import React, { useState } from 'react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchInputProps {
  label: string,
  placeholder: string,
}

export const SearchInput = (props: SearchInputProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const [placeholder, setPlaceholder] = useState(props.placeholder);

  return <FormControl sx={{ m: 1, width: '300px' }} variant="outlined" onFocus={() => setPlaceholder(props.label)} onBlur={() => setPlaceholder(props.placeholder)}>
    <InputLabel htmlFor="outlined-adornment-password">{placeholder}</InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
      type={'text'}
      value={value}
      onChange={handleChange}
      endAdornment={
        <InputAdornment position="end">
          <Search sx={{ m: 1 }}/>
        </InputAdornment>
      }
      label={props.label}
    />
  </FormControl>;
};
