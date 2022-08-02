import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface CustomButtonProps {
  label: string | JSX.Element;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
  widthText?: string;
  styleText?: CSSProperties;
}

export const CustomButton = (props: CustomButtonProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <Container isLight={isLight} type="button" disabled={props.disabled} onClick={props.onClick} style={props.style}>
    <Text isLight={isLight} className={props.disabled ? 'disabled' : ''} width={props.widthText} style={props.styleText}>{props.label}</Text>
  </Container>;
};

const Container = styled.button<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  height: '48px',
  border: isLight ? '1px solid #D4D9E1' : 'none',
  borderRadius: isLight ? '22px' : 'none',
  background: isLight ? 'white' : 'none',
  transition: 'all .3s ease',
  padding: '15px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  color: isLight ? '#231536' : '#546978',
  '&:hover:not(:disabled)': {
    borderColor: '#231536',
  },
  '.disabled': {
    color: '#9FAFB9',
  }
}));

const Text = styled.div<{ width?: string, isLight: boolean }>(({ width = 'fit-content', isLight }) => ({
  fontSize: '14px',
  fontFamily: 'SF Pro Text, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  color: isLight ? '#231536' : '#546978',
  whiteSpace: 'nowrap',
  width,
}));
