import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import lightTheme from '../../../../styles/theme/light';

interface CustomButtonProps {
  label: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | (() => void);
  widthText?: string;
  styleText?: CSSProperties;
  isHightLight?: boolean;
  isPrimary?: boolean;
  borderColor?: string;
  allowsHover?: boolean;
}

export const CustomButton = ({
  isHightLight = false,
  isPrimary = false,
  borderColor = '#231536',
  allowsHover = true,
  ...props
}: CustomButtonProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container
      className={props.className}
      isLight={isLight}
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
      styles={props.style}
      isHightLight={isHightLight}
      isPrimary={isPrimary}
      borderColor={borderColor}
      allowsHover={allowsHover}
    >
      <Text
        isLight={isLight}
        className={props.disabled ? 'disabled' : ''}
        width={props.widthText}
        style={props.styleText}
        isPrimary={isPrimary}
      >
        {props.label}
      </Text>
    </Container>
  );
};

const Container = styled.button<{
  isLight: boolean;
  isHightLight: boolean;
  allowsHover: boolean;
  isPrimary: boolean;
  styles?: CSSProperties;
  borderColor: string;
}>(({ isLight, isHightLight, isPrimary, styles, borderColor, allowsHover }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  border: '1px solid',
  borderColor: isLight
    ? isHightLight
      ? '#1AAB9B'
      : isPrimary
      ? '#1AAB9B'
      : '#D4D9E1'
    : isHightLight
    ? '#787A9B'
    : isPrimary
    ? '#1AAB9B'
    : '#343442',
  borderRadius: isLight ? '22px' : '22px',
  background: isLight ? (isPrimary ? '#E7FCFA' : 'white') : isPrimary ? '#1AAB9B' : '#10191F',
  transition: 'all .3s ease',
  transitionProperty: 'border, color',
  padding: '15px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  '&:hover:not(:disabled)': allowsHover
    ? {
        borderColor: isPrimary ? (isLight ? '#1AAB9B' : '#2DC1B1') : borderColor,
        background: isPrimary ? (isLight ? '#B6EDE7' : '#2DC1B1') : '#E7FCFA',
      }
    : undefined,
  '.disabled': {
    color: isLight ? '#9FAFB9' : '#48495F',
  },

  ...(styles ?? {}),
}));

const Text = styled.div<{ width?: string; isLight: boolean; isPrimary: boolean }>(
  ({ width = 'fit-content', isLight, isPrimary }) => ({
    fontSize: '14px',
    lineHeight: '18px',
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    color: isLight ? (isPrimary ? '#1AAB9B' : '#231536') : 'white',
    whiteSpace: 'nowrap',
    width,
    [lightTheme.breakpoints.between('table_375', 'table_834')]: {
      lineHeight: '18px',
    },
  })
);
