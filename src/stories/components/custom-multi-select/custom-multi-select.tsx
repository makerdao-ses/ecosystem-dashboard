import React, { CSSProperties, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { SelectChevronDown } from '../svg/select-chevron-down';
import { Checkbox, ListItemText, MenuItem } from '@mui/material';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlined from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import './custom-multi-select.module.scss';
import useOutsideClick from '../../../core/utils/use-outside-click';

interface CustomMultiSelectProps {
  label: string,
  items: string[],
  withAll?: boolean,
  onChange?: (items: string[]) => void,
  style?: CSSProperties,
  activeItems: string[],
}

export const CustomMultiSelect = ({ withAll = true, activeItems = [], ...props }: CustomMultiSelectProps) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const refOutsideClick = useRef<HTMLDivElement>(null);

  useOutsideClick(refOutsideClick, () => {
    popupVisible && setPopupVisible(false);
  });

  const toggleItem = (item: string) => {
    const pos = activeItems.indexOf(item);
    if (pos > -1) {
      const temp = [...activeItems];
      temp.splice(pos, 1);
      props.onChange && props.onChange(temp);
    } else {
      const temp = [...activeItems];
      temp.push(item);
      props.onChange && props.onChange(temp);
    }
  };

  const toggleVisible = () => setPopupVisible(!popupVisible);

  const toggleAll = () => {
    if (activeItems.length === props.items.length) {
      props.onChange && props.onChange([]);
    } else {
      props.onChange && props.onChange(props.items);
    }
  };

  return <SelectWrapper ref={refOutsideClick} style={props.style}>
    <SelectContainer
      focus={popupVisible || activeItems.length > 0}
      className="no-select"
      onClick={toggleVisible}>
      <Label>{props.label} {activeItems.length > 0 ? `(${activeItems.length})` : ''}</Label>
      <IconWrapper>
        <SelectChevronDown/>
      </IconWrapper>
    </SelectContainer>
    {popupVisible && <PopupContainer>
      {withAll && <MenuItem key={'All'} onClick={(e) => {
        e.stopPropagation();
        toggleAll();
      }}>
        {activeItems.length === props.items.length ? <CheckBoxOutlined sx={{ m: '6px' }}/> : <CheckBoxOutlineBlankOutlined sx={{ m: '6px' }}/>}
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
  zIndex: 2,
});

const SelectContainer = styled.div<{ focus: boolean }>((props) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  border: `1px solid ${props.focus ? '#231536' : '#D4D9E1'}`,
  borderRadius: '22px',
  height: '48px',
  width: 'fit-content',
  padding: '15px 40px 15px 15px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  transition: 'all .3s ease',
  background: 'white',
}));

const Label = styled.div({
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#231536',
  whiteSpace: 'nowrap'
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
  top: '50px',
  zIndex: 3,
});
