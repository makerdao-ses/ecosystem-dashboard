import React, { useState } from 'react';
import styled from '@emotion/styled';
import CheckboxOff from '../svg/checkbox-off';
import CheckboxOn from '../svg/checkbox-on';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface SelectItemProps {
  label: string | JSX.Element;
  count?: number;
  checked?: boolean;
  onClick?: () => void;
  minWidth?: number;
}

export const SelectItem = ({ checked = false, minWidth = 0, ...props }: SelectItemProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const [focused, setFocused] = useState(false);

  return <Container className="no-select" onClick={props.onClick} minWidth={minWidth} isLight={isLight}>
    {checked ? <CheckboxOn fill={isLight ? '#1AAB9B' : '#7C6B95'} fillBorderArrow={isLight ? '#B6EDE7' : '#ADAFD4'} /> : <CheckboxOff style={{ padding: '2px' }} fill={focused ? '#708390' : '#9FAFB9'} />}
    <Label>{props.label}</Label>
    <Number active={checked} isLight={isLight}>{props.count}</Number>
    <input type="checkbox" checked onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} readOnly />
  </Container>;
};

const Container = styled.div<{ minWidth: number, isLight: boolean }>(({ minWidth, isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  padding: '11px 8px',
  cursor: 'pointer',
  borderRadius: '6px',
  boxSizing: 'border-box',
  transition: 'all .3s ease',
  minWidth: minWidth ? `${minWidth}px` : 'unset',
  borderBottom: '2px solid #ECF1F3',
  '& > input': {
    position: 'absolute',
    opacity: 1,
    cursor: 'pointer',
    height: '0',
    width: '0',
  },
  '&:hover': {
    background: isLight ? '#EDEFFF' : '#25273D',
  },
  '@media (min-width: 834px)': {
    border: 'none'
  }
}));

const Label = styled.span({
  marginLeft: '8px',
  flex: 1,
  fontFamily: 'SF Pro Text',
  fontSize: '14px',
  fontWeight: 400,
});

const Number = styled.span<{ active: boolean, isLight: boolean }>(({ active, isLight }) => ({
  fontFamily: 'SF Pro Text',
  fontWeight: 500,
  fontSize: '14px',
  color: active && isLight ? '#48495F' : !active && isLight ? '#9FAFB9' : active && !isLight ? '#D2D4EF' : '#787A9B',
}));
