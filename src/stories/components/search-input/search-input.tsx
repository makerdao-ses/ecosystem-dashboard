import React, { useState } from 'react';
import { FormControl, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { Search } from '@mui/icons-material';
import './search-input.scss';

interface SearchInputProps {
  label: string,
  placeholder: string,
  onChange?: (text: string) => void
  handleSearchText?: (text: string) => void
}

export const SearchInput = (props: SearchInputProps) => {
  const [value, setValue] = useState('');
  const [oldTimeout, setOldTimeout] = useState<NodeJS.Timeout>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    oldTimeout && clearTimeout(oldTimeout);
    setOldTimeout(setTimeout(() => {
      props.onChange && props.onChange(event.target.value);
    }, 600));
    props.handleSearchText && props.handleSearchText(event.target.value);
  };

  const [active, setActive] = useState(false);

  return <FormControl
    sx={{ m: '10px 8px', width: '300px', background: 'white' }}
    variant="outlined"
    onFocus={() => setActive(true)}
    onBlur={() => setActive(false)}
  >
    <InputLabel
      sx={{ fontSize: '14px', lineHeight: '16px', top: '-2px' }}
      htmlFor="outlined-adornment-password">
      {active || value ? props.label : props.placeholder}
    </InputLabel>
    <OutlinedInput
      id="outlined-adornment-password"
      type={'text'}
      value={value}
      onChange={handleChange}
      className={'CustomSearchInput'}
      endAdornment={
        <InputAdornment position="end">
          <Search sx={{ m: 1 }}/>
        </InputAdornment>
      }
      label={props.label}
    />
  </FormControl>;
};
