import styled from '@emotion/styled';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { SortEnum } from '../../../core/enums/sortEnum';
import useOutsideClick from '../../../core/hooks/useOutsideClick';
import { CustomButton } from '../CustomButton/CustomButton';
import { SelectChevronDown } from '../svg/select-chevron-down';
import TriangleDown from '../svg/triangle-down';
import TriangleUp from '../svg/triangle-up';
import Triangles from '../svg/triangles';
import { SortItem } from './SortItem';
import type { CSSProperties } from 'react';

export interface SortSelectItem {
  id: string;
  content: string | JSX.Element;
}

interface Props {
  label: string;
  items: SortSelectItem[];
  onChange?: (index: number, sort: SortEnum) => void;
  onReset?: () => void;
  style?: CSSProperties;
  activeItem: number;
  maxWidth?: number;
  sortStatus: SortEnum;
}

export const CustomSortSelect = (props: Props) => {
  const { isLight } = useThemeContext();
  const [popupVisible, setPopupVisible] = useState(false);
  const [hover, setHover] = useState(false);
  const [activeItem, setActiveItem] = useState(props.activeItem);
  const [sortStatus, setSortStatus] = useState(props.sortStatus);

  const onClick = (index: number) => {
    setActiveItem(index);
  };

  const onSortClick = (sort: SortEnum) => {
    setSortStatus(sort);
  };

  const refOutsideClick = useRef<HTMLDivElement>(null);

  useOutsideClick(refOutsideClick, () => {
    popupVisible && setPopupVisible(false);
  });

  const toggleVisible = () => setPopupVisible(!popupVisible);

  useEffect(() => {
    setActiveItem(props.activeItem);
    setSortStatus(props.sortStatus);
  }, [popupVisible, props.activeItem, props.sortStatus]);

  const canReset = useMemo(
    () => props.activeItem !== 0 || props.sortStatus !== SortEnum.Asc,
    [props.activeItem, props.sortStatus]
  );

  const onReset = () => {
    setPopupVisible(false);
    setActiveItem(0);
    setSortStatus(SortEnum.Asc);
    props.onChange?.(0, SortEnum.Asc);
  };

  return (
    <SelectWrapper ref={refOutsideClick} style={props.style}>
      <ResponsiveButton isOpen={popupVisible} isLight={isLight} onClick={toggleVisible}>
        <Triangles fill="#1AAB9B" />
      </ResponsiveButton>
      <SelectContainer
        isLight={isLight}
        focus={popupVisible}
        active={true}
        className="no-select"
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        style={{
          maxWidth: !activeItem ? `${props.maxWidth}px` : 'unset',
        }}
        onClick={toggleVisible}
      >
        <Label isLight={isLight} hover={hover}>
          {props.label}
        </Label>
        <IconWrapper>
          <SelectChevronDown
            style={{ transform: popupVisible ? 'scaleY(-1)' : '' }}
            fill={isLight ? (!hover ? '#1AAB9B' : '#098C7D') : !hover ? '#1AAB9B' : '#6EDBD0'}
          />
        </IconWrapper>
      </SelectContainer>
      {popupVisible && (
        <PopupContainer isLight={isLight} className="no-select">
          <SortLabel>Sort By</SortLabel>
          <ItemsContainer>
            {props.items.map((item, i) => (
              <SortItem key={`item-${i}`} isActive={i === activeItem} label={item.content} onClick={() => onClick(i)} />
            ))}
          </ItemsContainer>
          <SortLine />
          <ItemsContainer>
            <SortItemOrder
              isLight={isLight}
              isActive={sortStatus === SortEnum.Asc}
              onClick={() => onSortClick(SortEnum.Asc)}
            >
              <span>ASCENDING</span>
              <TriangleUp fill={sortStatus === SortEnum.Asc ? '#231536' : '#708390'} />
            </SortItemOrder>
            <SortItemOrder
              isLight={isLight}
              isActive={sortStatus === SortEnum.Desc}
              onClick={() => onSortClick(SortEnum.Desc)}
            >
              <span>DESCENDING</span>
              <TriangleDown fill={sortStatus === SortEnum.Desc ? '#231536' : '#708390'} />
            </SortItemOrder>
          </ItemsContainer>
          <ButtonsWrapper>
            <CustomButton
              style={{
                border: 'none',
                padding: '8px 16px',
                minWidth: 'unset',
              }}
              disabled={!canReset}
              label="Reset"
              onClick={onReset}
            />
            <CustomButton
              style={{
                padding: '8px 24px',
              }}
              label="Apply"
              onClick={() => {
                props.onChange?.(activeItem, sortStatus);
                setPopupVisible(false);
              }}
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
  display: 'none',
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
  width: 'fit-content',
  padding: '7px 40px 7px 15px',
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
    display: 'ƒlex',
  },
}));

const ItemsContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

const Label = styled.div<{ isLight: boolean; hover: boolean }>(({ isLight, hover }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '18px',
  color: isLight ? (!hover ? '#1AAB9B' : '#098C7D') : !hover ? '#1AAB9B' : '#6EDBD0',
  whiteSpace: 'nowrap',
}));

const IconWrapper = styled.div({
  position: 'absolute',
  right: '19px',
  top: '3px',
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
    background: isLight ? (isActive ? '#EDEFFF' : '#F6F8F9') : isActive ? '#EDEFFF' : '#25273D',
  },
  span: {
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: '22px',
    color: isActive ? '#231536' : isLight ? '#708390' : 'white',
    textTransform: 'uppercase',
  },
}));

const ResponsiveButton = styled.div<{ isLight: boolean; isOpen: boolean }>(({ isLight, isOpen }) => ({
  display: 'flex',
  gridArea: 'buttonFilter',
  justifySelf: 'flex-end',
  width: '34px',
  height: '34px',
  borderRadius: '50%',
  alignItems: 'center',
  background: isLight ? (isOpen ? '#B6EDE7' : 'transparent') : isOpen ? '#003C40' : 'transparent',
  justifyContent: 'center',
  border: isLight ? '1px solid #6EDBD0' : '1px solid #098C7D',
  '@media (min-width: 834px)': {
    display: 'none',
  },
}));
