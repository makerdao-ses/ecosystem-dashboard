import styled from '@emotion/styled';
import lightTheme from '@ses/styles/theme/light';
import React, { useCallback, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import useOutsideClick from '../../../core/hooks/useOutsideClick';
import { SearchInput } from '../SearchInput/SearchInput';
import { SelectItem } from '../SelectItem/SelectItem';
import { SelectChevronDown } from '../svg/select-chevron-down';
import type { WithLegacyBreakpoints } from '@ses/core/utils/typesHelpers';
import type { CSSProperties } from 'react';

import './CustomMultiSelect.module.scss';

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

interface CustomMultiSelectProps extends Partial<WithLegacyBreakpoints> {
  label: string | ((props: CustomMultiSelectProps) => React.ReactNode);
  items: MultiSelectItem[];
  withAll?: boolean;
  customAll?: MultiSelectItem;
  onChange?: (items: string[]) => void;
  style?: CSSProperties;
  activeItems: string[];
  width?: number;
  customItemRender?: (props: SelectItemProps) => JSX.Element;
  popupContainerWidth?: number;
  popupContainerHeight?: number | string;
  listItemWidth?: number;
  withSearch?: boolean;
  positionRight?: boolean;
  className?: string;
  maxItems?: number;
  minItems?: number;
  defaultMetricsWithAllSelected?: string[];
  allowSelectAll?: boolean;
  selectNumberItemPerResolution?: boolean;
}

const defaultItemRender = (props: SelectItemProps) => <SelectItem {...props} />;

export const CustomMultiSelect = ({
  withAll = true,
  activeItems = [],
  customItemRender = defaultItemRender,
  positionRight = false,
  className,
  maxItems,
  minItems,
  defaultMetricsWithAllSelected = [],
  allowSelectAll = true,
  legacyBreakpoints = true,
  selectNumberItemPerResolution = false,

  ...props
}: CustomMultiSelectProps) => {
  const { isLight } = useThemeContext();
  const [popupVisible, setPopupVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [searchText, setSearchText] = useState('');

  const refOutsideClick = useRef<HTMLDivElement>(null);

  useOutsideClick(refOutsideClick, () => {
    popupVisible && setPopupVisible(false);
  });

  const defaultToggleItem = (item: string) => {
    const pos = activeItems.indexOf(item);
    if (pos > -1) {
      const temp = [...activeItems];
      temp.splice(pos, 1);
      props.onChange && props.onChange(temp);
    } else {
      const temp = [...activeItems, item];
      props.onChange && props.onChange(temp);
    }
  };

  const toggleItemLimitedNumberItems = (item: string) => {
    const pos = activeItems.indexOf(item);
    if (pos > -1) {
      if (minItems && activeItems.length > minItems) {
        const temp = [...activeItems];
        temp.splice(pos, 1);
        props.onChange && props.onChange(temp);
      }
    } else {
      const temp = [...activeItems, item];

      if (maxItems && minItems && temp.length > maxItems) {
        temp.shift();
      }
      if (minItems) {
        while (temp.length < minItems) {
          const nextItem = props.items.find((item) => !temp.includes(item.id));
          if (nextItem) {
            temp.push(nextItem.id);
          } else {
            break;
          }
        }
      }

      props.onChange && props.onChange(temp);
    }
  };

  // Select witch type select are going to use
  const handleToggleItem = selectNumberItemPerResolution ? toggleItemLimitedNumberItems : defaultToggleItem;
  const toggleVisible = () => setPopupVisible(!popupVisible);

  const toggleAll = () => {
    if (activeItems.length === props.items.length) {
      props.onChange && props.onChange(defaultMetricsWithAllSelected ?? []);
    } else {
      if (allowSelectAll) {
        props.onChange && props.onChange(props.items.map((item) => item.id));
      }
    }
  };

  const handleClearSearch = useCallback(() => setSearchText(''), []);

  return (
    <SelectWrapper
      ref={refOutsideClick}
      style={props.style}
      className={className}
      legacyBreakpoints={legacyBreakpoints}
    >
      <SelectContainer
        isLight={isLight}
        focus={popupVisible}
        active={activeItems.length > 0}
        className="no-select"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onClick={toggleVisible}
        width={props.width}
        legacyBreakpoints={legacyBreakpoints}
      >
        {typeof props.label === 'string' ? (
          <Label active={activeItems.length > 0} isLight={isLight} hover={hover}>
            {props.label} {activeItems.length > 0 ? `${activeItems.length}` : ''}
          </Label>
        ) : (
          props.label({
            withAll,
            activeItems,
            customItemRender,
            positionRight,
            ...props,
          })
        )}
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
        <PopupContainer
          width={props.popupContainerWidth ?? 212}
          isLight={isLight}
          positionRight={positionRight}
          className={className}
          legacyBreakpoints={legacyBreakpoints}
        >
          {props.withSearch && (
            <SearchInput
              placeholder="Search"
              value={searchText}
              onChange={(val) => setSearchText(val)}
              handleClearSearch={handleClearSearch}
              style={{ marginBottom: 8 }}
              small
            />
          )}
          <SimpleBar
            style={{
              width: props.popupContainerWidth ? props.popupContainerWidth - 16 : 196,
              height: props.popupContainerHeight ?? 250,
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
                    onClick: () => handleToggleItem(item.id),
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

const SelectWrapper = styled.div<WithLegacyBreakpoints>(({ legacyBreakpoints }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  width: 'fit-content',
  zIndex: 2,

  [lightTheme.breakpoints.up(legacyBreakpoints ? 'table_834' : 'tablet_768')]: {
    alignItems: 'flex-start',
    width: 'fit-content',
  },
}));

const SelectContainer = styled.div<
  {
    focus: boolean;
    active: boolean;
    isLight: boolean;
    width?: number;
  } & WithLegacyBreakpoints
>(({ active, focus, isLight, width, legacyBreakpoints }) => ({
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

  [lightTheme.breakpoints.up(legacyBreakpoints ? 'table_834' : 'tablet_768')]: {
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

const PopupContainer = styled.div<{ isLight: boolean; width: number; positionRight?: boolean } & WithLegacyBreakpoints>(
  ({ isLight, width, positionRight, legacyBreakpoints }) => ({
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
    ...(positionRight ? { right: -50 } : { left: '0' }),
    zIndex: 3,

    '::-webkit-scrollbar': {
      opacity: !isLight ? 0 : 'none',
      width: !isLight ? 0 : 'none',
      backgroundColor: !isLight ? 'transparent' : 'none',
    },

    [lightTheme.breakpoints.up(legacyBreakpoints ? 'table_834' : 'tablet_768')]: {
      ...(positionRight && { right: '0' }),
    },
  })
);
