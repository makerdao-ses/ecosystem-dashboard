import React, { useRef, useState } from 'react';
import styled from '@emotion/styled';
import { SelectChevronDown } from '../svg/select-chevron-down';
import { Checkbox, ListItemText, MenuItem, Typography } from '@mui/material';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import './custom-multi-select-2.scss';
import useOutsideClick from '../../../core/utils/use-outside-click';

interface CustomMultiSelect2Props {
  label: string,
  items: string[],
  withAll?: boolean,
  onChange?: (items: string[]) => void,
  initialActiveItems?: string[],
}

export const CustomMultiSelect2 = ({ withAll = true, initialActiveItems = [], ...props }: CustomMultiSelect2Props) => {
  const [visible, setVisible] = useState(false);
  const [activeItems, setActiveItems] = React.useState<string[]>(initialActiveItems);

  const refOutsideClick = useRef();

  useOutsideClick(refOutsideClick, () => {
    visible && setVisible(false);
  });

  const toggleItem = (item: string) => {
    const pos = activeItems.indexOf(item);
    if (pos > -1) {
      const temp = [...activeItems];
      temp.splice(pos, 1);
      setActiveItems(temp);
    } else {
      const temp = [...activeItems];
      temp.push(item);
      setActiveItems(temp);
    }
  };

  const toggleVisible = () => setVisible(!visible);

  const toggleAll = () => {
    if (activeItems.length === props.items.length) {
      setActiveItems([]);
      props.onChange && props.onChange([]);
    } else {
      setActiveItems(props.items);
      props.onChange && props.onChange(props.items);
    }
  };

  return <SelectWrapper>
    <SelectContainer
      className="no-select"
      onClick={toggleVisible}>
      <Label>{props.label}</Label>
      <IconWrapper>
        <SelectChevronDown/>
      </IconWrapper>
    </SelectContainer>
    {visible && <PopupContainer>
      {withAll && <MenuItem key={'All'} onClick={toggleAll}>
        <CheckBoxOutlined sx={{ m: '6px' }}/>
        <ListItemText
            primary={'All'}
            sx={{ fontSize: '8px' }}/>
      </MenuItem>}
      {props.items.map((item) => (
        <MenuItem key={item} value={item} onClick={() => toggleItem(item)}>
          <Checkbox
            sx={{ p: '6px' }}
            checked={activeItems.indexOf(item) > -1}
            onChange={() => toggleItem(item)} />
          <ListItemText primary={item} />
        </MenuItem>
      ))}
    </PopupContainer>}
  </SelectWrapper>;
};

const SelectWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: 'fit-content',
});

const SelectContainer = styled.div({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  border: '1px solid #D4D9E1',
  borderRadius: '22px',
  height: '48px',
  width: 'fit-content',
  padding: '15px 40px 15px 15px',
  boxSizing: 'border-box',
  cursor: 'pointer',
});

const Label = styled(Typography)({
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
});

const IconWrapper = styled.div({
  position: 'absolute',
  right: '19px',
  marginTop: '-4px'
});

const PopupContainer = styled.div({
  minWidth: '100%',
  width: 'fit-content',
  height: '200px',
  background: 'white',
  overflowY: 'scroll',
  boxShadow: '0px 20px 40px #dbe3ed66, 0px 1px 3px #bebebe40',
  position: 'absolute',
  top: '50px'
});
