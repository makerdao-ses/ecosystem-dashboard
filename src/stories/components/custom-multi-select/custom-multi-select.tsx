import React, { useCallback } from 'react';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import './custom-multi-select.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface CustomSelectProps {
  items: string[],
  label: string,
  withAll?: boolean,
  onChange?: (items: string[]) => void,
  initialActiveItems?: string[],
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const CustomMultiSelect = ({ withAll = true, initialActiveItems = [], ...props }: CustomSelectProps) => {
  const [activeItems, setActiveItems] = React.useState<string[]>(initialActiveItems);

  const handleChange = useCallback((event: SelectChangeEvent<typeof activeItems>) => {
    const {
      target: { value },
    } = event;
    setActiveItems(typeof value === 'string' ? value.split(',') : value);
    props.onChange && props.onChange(typeof value === 'string' ? value.split(',') : value);
  }, [props]);

  const toggleAll = () => {
    if (activeItems.length === props.items.length) {
      setActiveItems([]);
      props.onChange && props.onChange([]);
    } else {
      setActiveItems(props.items);
      props.onChange && props.onChange(props.items);
    }
  };

  return <FormControl sx={{
    m: '10px 8px',
    width: 300,
    background: 'white',
    height: ''
  }}>
    <InputLabel sx={{
      fontSize: '14px',
      lineHeight: '16px',
      top: '-2px'
    }} id="multiselect-status-label">{props.label}</InputLabel>
    <Select
      labelId="multiselect-status-label"
      id="multiselect-status"
      multiple
      value={activeItems}
      onChange={handleChange}
      input={<OutlinedInput className={'CustomOutline'} sx={{ fontSize: '14px' }} label={props.label} />}
      renderValue={(selected) => selected.join(', ')}
      MenuProps={MenuProps}
    >
      {withAll && <MenuItem key={'All'} onClick={toggleAll}>
        <CheckBoxOutlined sx={{ m: '6px' }} />
        <ListItemText primary={'All'} />
      </MenuItem>}
      {props.items.map((item) => (
        <MenuItem key={item} value={item}>
          <Checkbox sx={{ p: '6px' }} checked={activeItems.indexOf(item) > -1} />
          <ListItemText primary={item} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>;
};
