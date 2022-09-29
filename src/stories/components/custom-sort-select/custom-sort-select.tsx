import React, { CSSProperties, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { SelectChevronDown } from '../svg/select-chevron-down';
import useOutsideClick from '../../../core/utils/use-outside-click';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SortItem } from './sort-item';
import { CustomButton } from '../custom-button/custom-button';
import TriangleUp from '../svg/triangle-up';
import TriangleDown from '../svg/triangle-down';
import { SortEnum } from '../../../core/enums/sort.enum';

export interface SortSelectItem {
  id: string;
  content: string | JSX.Element;
}

interface Props {
  label: string;
  items: SortSelectItem[];
  onChange?: (items: string[]) => void;
  style?: CSSProperties;
  activeItem: number;
  maxWidth?: number;
  sortStatus?: SortEnum;
}

export const CustomSortSelect = (props: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const [popupVisible, setPopupVisible] = useState(false);
  const [hover, setHover] = useState(false);

  const refOutsideClick = useRef<HTMLDivElement>(null);

  useOutsideClick(refOutsideClick, () => {
    popupVisible && setPopupVisible(false);
  });

  const toggleVisible = () => setPopupVisible(!popupVisible);

  return (
    <SelectWrapper ref={refOutsideClick} style={props.style}>
      <SelectContainer
        isLight={isLight}
        focus={popupVisible}
        active={!!props.activeItem}
        className="no-select"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        style={{
          maxWidth: props.maxWidth && !props.activeItem ? `${props.maxWidth}px` : 'unset',
        }}
        onClick={toggleVisible}
      >
        <Label active={!!props.activeItem} isLight={isLight} hover={hover}>
          {props.label}
        </Label>
        <IconWrapper>
          <SelectChevronDown
            style={{ transform: popupVisible ? 'scaleY(-1)' : '' }}
            fill={
              isLight
                ? props.activeItem
                  ? !hover
                    ? '#1AAB9B'
                    : '#098C7D'
                  : '#231536'
                : props.activeItem
                ? !hover
                  ? '#1AAB9B'
                  : '#6EDBD0'
                : '#E2D8EE'
            }
          />
        </IconWrapper>
      </SelectContainer>
      {popupVisible && (
        <PopupContainer isLight={isLight}>
          <SortLabel>Sort By</SortLabel>
          <ItemsContainer>
            {props.items.map((item, i) => (
              <SortItem key={`item-${i}`} isActive={i === props.activeItem} label={item.content} />
            ))}
          </ItemsContainer>
          <SortLine />
          <ItemsContainer>
            <SortItemOrder isLight={isLight} isActive={props.sortStatus === SortEnum.Asc}>
              <span>ASCENDING</span>
              <TriangleUp fill={props.sortStatus === SortEnum.Asc ? '#231536' : '#708390'} />
            </SortItemOrder>
            <SortItemOrder isLight={isLight} isActive={props.sortStatus === SortEnum.Desc}>
              <span>DESCENDING</span>
              <TriangleDown fill={props.sortStatus === SortEnum.Desc ? '#231536' : '#708390'} />
            </SortItemOrder>
          </ItemsContainer>
          <ButtonsWrapper>
            <CustomButton
              style={{
                border: 'none',
                padding: '8px 16px',
                minWidth: 'unset',
              }}
              label="Reset"
            />
            <CustomButton
              style={{
                padding: '8px 24px',
              }}
              label="Apply"
            />
          </ButtonsWrapper>
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
  },
});

const SelectContainer = styled.div<{
  focus: boolean;
  active: boolean;
  isLight: boolean;
}>(({ active, focus, isLight }) => ({
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
  height: '48px',
  width: 'fit-content',
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
}));

const ItemsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

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

const PopupContainer = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
  width: '216px',
  background: isLight ? 'white' : '#000A13',
  height: 'fit-content',
  padding: '16px',
  gap: '24px',
  top: '50px',
  right: 0,
  position: 'absolute',
  backgroundColor: !isLight ? 'transparent' : 'none',
  '::-webkit-scrollbar': {
    opacity: !isLight ? 0 : 'none',
    width: !isLight ? 0 : 'none',
  },
  zIndex: 3,
  boxShadow: isLight ? '0px 20px 40px #dbe3ed66, 0px 1px 3px #bebebe40' : 'none',
}));

const SortLabel = styled.div({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
});

const SortLine = styled.div({
  background: '#D4D9E1',
  height: '1px',
  width: '100%',
});

const ButtonsWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
});

const SortItemOrder = styled.div<{ isActive: boolean; isLight: boolean }>(({ isActive, isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '24px',
  borderRadius: '6px',
  padding: '4px',
  transition: 'all .3s ease',
  cursor: 'pointer',
  width: '100%',
  background: isActive ? '#EDEFFF' : 'unset',
  '&:hover': {
    background: isLight ? (isActive ? '#EDEFFF' : '#F6F8F9') : '#25273D',
  },
  span: {
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: '22px',
    color: isActive ? '#231536' : '#708390',
    textTransform: 'uppercase',
  },
}));
