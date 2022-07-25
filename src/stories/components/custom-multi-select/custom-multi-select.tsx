import React, { CSSProperties, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { SelectChevronDown } from '../svg/select-chevron-down';
import './custom-multi-select.module.scss';
import useOutsideClick from '../../../core/utils/use-outside-click';
import { SelectItem } from '../select-item/select-item';

export interface MultiSelectItem {
  id: string;
  content: string | JSX.Element;
  count: number;
}

interface CustomMultiSelectProps {
  label: string;
  items: MultiSelectItem[];
  withAll?: boolean;
  customAll?: string | JSX.Element;
  onChange?: (items: string[]) => void;
  style?: CSSProperties;
  activeItems: string[];
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
      props.onChange && props.onChange(props.items.map(item => item.id));
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
      {withAll && <SelectItem checked={activeItems.length === props.items.length} onClick={() => toggleAll()} label={props.customAll ? props.customAll : 'All'} count={22} minWidth={180}/>}
      {props.items.map((item, i) => (
        <SelectItem key={`item-${i}`} checked={activeItems.indexOf(item.id) > -1} onClick={() => toggleItem(item.id)} label={item.content} count={22} minWidth={180}/>
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
