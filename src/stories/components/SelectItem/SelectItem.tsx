import styled from '@emotion/styled';
import React, { useState } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import CheckboxOff from '../svg/checkbox-off';
import CheckboxOn from '../svg/checkbox-on';
import type { SelectItemProps } from '../CustomMultiSelect/CustomMultiSelect';

export const SelectItem = ({ checked = false, ...props }: SelectItemProps) => {
  const { isLight } = useThemeContext();
  const [focused, setFocused] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <Container
      className="no-select"
      onClick={props.onClick}
      isLight={isLight}
      checked={checked}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {checked ? (
        <CheckboxOn fill={isLight ? '#1AAB9B' : '#7C6B95'} fillBorderArrow={isLight ? '#B6EDE7' : '#D2D4EF'} />
      ) : (
        <CheckboxOff
          style={{ padding: '2px' }}
          fill={hover ? '#708390' : focused ? '#708390' : '#9FAFB9'}
          fillDark="#9FAFB9"
        />
      )}
      <Label>{props.label}</Label>
      <Number className="number" active={checked} isLight={isLight}>
        {props.count}
      </Number>
      <input type="checkbox" checked onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} readOnly />
    </Container>
  );
};

export const Container = styled.div<{ isLight: boolean; checked: boolean }>(({ isLight, checked }) => ({
  display: 'flex',
  backgroundColor:
    isLight && checked ? '#EDEFFF' : isLight && !checked ? 'none' : !isLight && !checked ? '#000A13' : '#231536',
  alignItems: 'center',
  position: 'relative',
  padding: '8px',
  cursor: 'pointer',
  borderRadius: '6px',
  boxSizing: 'border-box',
  transition: 'all .3s ease',
  width: '100%',

  '& > input': {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
    height: '0',
    width: '0',
  },
  '&:hover': {
    background: isLight ? (checked ? '#EDEFFF' : '#F6F8F9') : '#25273D',
  },
  '&:hover .number': {
    color: isLight ? '#708390' : '#ADAFD4',
  },
}));

const Label = styled.span({
  marginLeft: '8px',
  flex: 1,
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
});

const Number = styled.span<{ active: boolean; isLight: boolean }>(({ active, isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  fontSize: '14px',
  color: active && isLight ? '#48495F' : !active && isLight ? '#9FAFB9' : active && !isLight ? '#D2D4EF' : '#787A9B',
}));
