import React, { CSSProperties, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { SelectChevronDown } from '../svg/select-chevron-down';
import './custom-multi-select.module.scss';
import useOutsideClick from '../../../core/utils/use-outside-click';
import { SelectItem } from '../select-item/select-item';
import { useThemeContext } from '../../../core/context/ThemeContext';
import SimpleBar from 'simplebar-react';
import { SearchInput } from '../search-input/search-input';

export interface MultiSelectItem {
  id: string;
  content: string | JSX.Element;
  count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}

export interface SelectItemProps {
  key?: string;
  label: string | JSX.Element;
  count?: number;
  avatar?: string;
  checked?: boolean;
  onClick?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
}

interface CustomMultiSelectProps {
  label: string;
  items: MultiSelectItem[];
  withAll?: boolean;
  customAll?: MultiSelectItem;
  onChange?: (items: string[]) => void;
  style?: CSSProperties;
  activeItems: string[];
  width?: number;
  customItemRender?: (props: SelectItemProps) => JSX.Element;
  popupContainerWidth?: number;
  listItemWidth?: number;
  withSearch?: boolean;
}

const defaultItemRender = (props: SelectItemProps) => <SelectItem {...props} />;

export const CustomMultiSelect = ({
  withAll = true,
  activeItems = [],
  customItemRender = defaultItemRender,
  ...props
}: CustomMultiSelectProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const [popupVisible, setPopupVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [searchText, setSearchText] = useState('');

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
      props.onChange && props.onChange(props.items.map((item) => item.id));
    }
  };

  return (
    <SelectWrapper ref={refOutsideClick} style={props.style}>
      <SelectContainer
        isLight={isLight}
        focus={popupVisible}
        active={activeItems.length > 0}
        className="no-select"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={toggleVisible}
        width={props.width}
      >
        <Label active={activeItems.length > 0} isLight={isLight} hover={hover}>
          {props.label} {activeItems.length > 0 ? `${activeItems.length}` : ''}
        </Label>
        <IconWrapper>
          <SelectChevronDown
            style={{ transform: popupVisible ? 'scaleY(-1)' : 'scaleY(1)' }}
            fill={
              isLight
                ? activeItems.length > 0
                  ? !hover
                    ? '#1AAB9B'
                    : '#098C7D'
                  : '#231536'
                : activeItems.length > 0
                ? !hover
                  ? '#1AAB9B'
                  : '#6EDBD0'
                : '#E2D8EE'
            }
          />
        </IconWrapper>
      </SelectContainer>
      {popupVisible && (
        <PopupContainer width={props.popupContainerWidth ?? 212} isLight={isLight}>
          {props.withSearch && (
            <SearchInput
              placeholder="Search"
              value={searchText}
              onChange={(val) => setSearchText(val)}
              handleCleanSearch={() => setSearchText('')}
              style={{ marginBottom: 8 }}
              small
            />
          )}
          <SimpleBar
            style={{
              width: props.popupContainerWidth ? props.popupContainerWidth - 16 : 196,
              background: 'white',
              height: 250,
            }}
            className="filter-popup-scroll"
            scrollbarMaxSize={32}
          >
            <ItemsContainer width={props.listItemWidth}>
              {withAll &&
                customItemRender({
                  checked: activeItems.length === props.items.length,
                  onClick: () => toggleAll(),
                  label: props.customAll?.content ? props.customAll.content : 'All',
                  count: props.customAll?.count ?? props.items.length,
                  params: props.customAll?.params,
                })}
              {props.items
                .filter(
                  (item) =>
                    activeItems.includes(item.id) ||
                    !searchText ||
                    item.content.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                    item.id.toString().toLowerCase().indexOf(searchText.toLowerCase()) > -1
                )
                .map((item, i) =>
                  customItemRender({
                    key: `item-${i}`,
                    checked: activeItems.indexOf(item.id) > -1,
                    onClick: () => toggleItem(item.id),
                    label: item.content,
                    count: item.count,
                    params: item.params,
                  })
                )}
            </ItemsContainer>
          </SimpleBar>
        </PopupContainer>
      )}
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: 'fit-content',
  zIndex: 2,
  '@media (min-width: 834px)': {
    alignItems: 'flex-start',
    width: 'fit-content',
  },
});

const SelectContainer = styled.div<{
  focus: boolean;
  active: boolean;
  isLight: boolean;
  width?: number;
}>(({ active, focus, isLight, width }) => ({
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  border:
    isLight && active
      ? '1px solid #1AAB9B'
      : isLight && focus
      ? '1px solid #231536'
      : !isLight && active
      ? '1px solid #098C7D'
      : !isLight && focus
      ? '1px solid #343442'
      : isLight && !active
      ? '1px solid#D4D9E1'
      : '1px solid #343442',
  borderRadius: '22px',
  height: '34px',
  width: width ? `${width}px` : 'fit-content',
  padding: '15px 40px 15px 15px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  transition: 'all .3s ease',
  background: isLight ? 'white' : '#10191F',
  '&:hover': {
    border: isLight
      ? active
        ? '1px solid #1AAB9B'
        : '1px solid #231536'
      : active
      ? '1px solid #098C7D'
      : '1px solid #787A9B',
    background: isLight ? (active ? '#E7FCFA' : 'none') : active ? '#003C40' : '#10191F',
  },
  '@media (min-width: 834px)': {
    height: '48px',
    padding: '15px 40px 15px 15px',
  },
}));

const ItemsContainer = styled.div<{ width?: number }>(({ width = 180 }) => ({
  marginRight: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width,
}));

const Label = styled.div<{ active: boolean; isLight: boolean; hover: boolean }>(({ active, isLight, hover }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
  color: isLight
    ? active
      ? !hover
        ? '#1AAB9B'
        : '#098C7D'
      : '#231536'
    : active
    ? !hover
      ? '#1AAB9B'
      : '#6EDBD0'
    : '#E2D8EE',
  whiteSpace: 'nowrap',
}));

const IconWrapper = styled.div({
  position: 'absolute',
  right: '19px',
  marginTop: '-4px',
});

const PopupContainer = styled.div<{ isLight: boolean; width: number }>(({ isLight, width }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width,
  background: isLight ? 'white' : '#000A13',
  height: 'fit-content',
  padding: '16px 0 16px 16px',
  boxShadow: isLight ? '0px 20px 40px #dbe3ed66, 0px 1px 3px #bebebe40' : 'none',
  position: 'absolute',
  top: '50px',
  left: '0',
  zIndex: 3,
  '::-webkit-scrollbar': {
    opacity: !isLight ? 0 : 'none',
    width: !isLight ? 0 : 'none',
    backgroundColor: !isLight ? 'transparent' : 'none',
  },
}));
