import React, { CSSProperties, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { SelectChevronDown } from '../svg/select-chevron-down';
import './custom-multi-select.module.scss';
import useOutsideClick from '../../../core/utils/use-outside-click';
import { SelectItem } from '../select-item/select-item';
import { useThemeContext } from '../../../core/context/ThemeContext';

export interface MultiSelectItem {
  id: string;
  content: string | JSX.Element;
  count: number;
}

interface CustomMultiSelectProps {
  label: string;
  items: MultiSelectItem[];
  withAll?: boolean;
  customAll?: MultiSelectItem;
  onChange?: (items: string[]) => void;
  style?: CSSProperties;
  activeItems: string[];
  maxWidth?: number;
}

export const CustomMultiSelect = ({ withAll = true, activeItems = [], ...props }: CustomMultiSelectProps) => {
  const isLight = useThemeContext().themeMode === 'light';
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
      isLight={isLight}
      focus={popupVisible || activeItems.length > 0}
      className="no-select"
      style={{ maxWidth: props.maxWidth && !activeItems.length ? `${props.maxWidth}px` : 'unset' }}
      onClick={toggleVisible}>
      <Label isLight={isLight}>{props.label} {activeItems.length > 0 ? `(${activeItems.length})` : ''}</Label>
      <IconWrapper>
        <SelectChevronDown fill={isLight ? '25273D' : '#ADAFD4'} />
      </IconWrapper>
    </SelectContainer>
    {popupVisible && <PopupContainer isLight={isLight}>
      {withAll && <SelectItem
        style={{
          marginBottom: isLight ? 0 : '4px',
        }}
        checked={activeItems.length === props.items.length}
        onClick={() => toggleAll()}
        label={props.customAll?.content ? props.customAll.content : 'All'}
        count={props.customAll?.count ?? props.items.length}
        minWidth={180} />}
      {props.items.map((item, i) => (
        <SelectItem style={{
          marginBottom: isLight ? 0 : '4px',
        }} key={`item-${i}`} checked={activeItems.indexOf(item.id) > -1} onClick={() => toggleItem(item.id)} label={item.content} count={item.count} minWidth={180} />
      ))}
    </PopupContainer>}
  </SelectWrapper>;
};

const SelectWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: 'fit-content',
  // border: '2px solid red',
  zIndex: 2,
  '@media (min-width: 834px)': {
    alignItems: 'flex-start',
  }
});

const SelectContainer = styled.div<{ focus: boolean, isLight: boolean }>((props) => ({
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
  background: props.isLight ? 'white' : '#10191F',
}));

const Label = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
  color: isLight ? '#231536' : '#D2D4EF',
  whiteSpace: 'nowrap'
}));

const IconWrapper = styled.div({
  position: 'absolute',
  right: '19px',
  marginTop: '-4px'
});

const PopupContainer = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: '100%',
  width: 'fit-content',
  background: isLight ? 'white' : '#000A13',
  height: 'fit-content',
  marginTop: '16px',
  padding: isLight ? 'none' : '16px',
  '@media (min-width: 834px)': {
    height: '200px',
    boxShadow: isLight ? '0px 20px 40px #dbe3ed66, 0px 1px 3px #bebebe40' : 'none',
    position: 'absolute',
    top: '50px',
    zIndex: 3,
    overflowY: 'scroll',
    '::-webkit-scrollbar': {
      opacity: !isLight ? 0 : 'none',
      width: !isLight ? 0 : 'none',
      backgroundColor: !isLight ? 'transparent' : 'none'
    }
  }
}));
