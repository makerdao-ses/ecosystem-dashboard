import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import lightTheme from '../../../../styles/theme/light';
import { ButtonType } from '../../../core/enums/button-type.enum';
import AddIcon from '../svg/add';
import { useMediaQuery } from '@mui/material';

interface CustomButtonProps {
  label: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | (() => void) | Promise<any>;
  widthText?: string;
  styleText?: CSSProperties;
  isHightLight?: boolean;
  borderColor?: string;
  buttonType?: ButtonType;
  allowsHover?: boolean;
  active?: boolean;
  withIcon?: boolean;
  width?: number;
  height?: number;
  fill?: string;
  type?: 'button' | 'submit';
  padding?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customStyles: { [id: string]: any } = {
  Default: {
    textColor: '#231536',
    textColorDark: '#D2D4EF',
    background: '#FFFFFF',
    backgroundDark: 'transparent',
    borderColor: '#D4D9E1',
    borderColorDark: '#343442',
    activeColorText: '#1AAB9B',
    activeBackground: 'transparent',
    activeBorderColor: '#1AAB9B',
    activeColorTextDark: '#1AAB9B',
    activeBackgroundDark: 'transparent',
    activeBorderColorDark: '#1AAB9B',
  },
  Primary: {
    textColor: '#1AAB9B',
    textColorDark: '#6EDBD0',
    background: '#E7FCFA',
    backgroundDark: '#06554C',
    borderColor: '#1AAB9B',
    borderColorDark: '#1AAB9B',
  },
  Secondary: {
    textColor: '#1AAB9B',
    textColorDark: '#1AAB9B',
    background: 'white',
    backgroundDark: 'transparent',
    borderColor: '#1AAB9B',
    borderColorDark: '#1AAB9B',
  },
  PrimaryMobile: {
    textColor: '#098C7D',
    textColorDark: '#1AAB9B',
    background: 'transparent',
    backgroundDark: 'transparent',
    borderColor: '#098C7D',
    borderColorDark: '#1AAB9B',
  },
  Danger: {
    textColor: '#F77249',
    textColorDark: '#FF8237',
    background: 'transparent',
    backgroundDark: 'transparent',
    borderColor: '#F77249',
    borderColorDark: '#FF8237',
    activeColorText: '#F77249',
    activeBackground: '#FDEDE8',
    activeBorderColor: '#F77249',
    activeColorTextDark: '#FF8237',
    activeBackgroundDark: '#FDEDE8',
    activeBorderColorDark: '#F77249',
  },
};

export const CustomButton = ({
  isHightLight = false,
  buttonType = ButtonType.Default,
  allowsHover = true,
  active,
  withIcon = false,
  fill,
  height,
  width,
  type = 'button',
  padding = '15px 16px',
  ...props
}: CustomButtonProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  const phoneOrTable = useMediaQuery(lightTheme.breakpoints.between('table_375', 'desktop_1194'));
  return (
    <Container
      padding={padding}
      active={active}
      allowsHover={allowsHover}
      className={`${props.className} no-select`}
      isLight={isLight}
      buttonType={buttonType}
      type={type}
      disabled={props.disabled}
      onClick={props.onClick}
      styles={{
        backgroundColor: isLight
          ? active
            ? customStyles[buttonType].activeBackground
            : customStyles[buttonType].background
          : active
          ? customStyles[buttonType].activeBackgroundDark
          : customStyles[buttonType].backgroundDark,
        borderColor: !phoneOrTable
          ? isLight
            ? active
              ? customStyles[buttonType].activeBorderColor
              : customStyles[buttonType]?.borderColor
            : active
            ? customStyles[buttonType].activeBorderColorDark
            : customStyles[buttonType]?.borderColorDark
          : '#25273D',
        ...props.style,
      }}
      isHightLight={isHightLight}
    >
      <Text
        width={props.widthText}
        style={{
          color: isLight
            ? props.disabled
              ? ' #9FAFB9'
              : active
              ? customStyles[buttonType].activeColorText
              : customStyles[buttonType].textColor
            : props.disabled
            ? '#48495F'
            : active
            ? customStyles[buttonType].activeColorTextDark
            : customStyles[buttonType].textColorDark,
          ...props.styleText,
        }}
      >
        {props.label}
        {withIcon && (
          <AddIcon
            fill={fill}
            height={height}
            width={width}
            style={{
              marginLeft: 7.53,
            }}
          />
        )}
      </Text>
    </Container>
  );
};

const Container = styled.button<{
  isLight?: boolean;
  isHightLight?: boolean;
  styles?: CSSProperties;
  buttonType: ButtonType;
  allowsHover: boolean;
  active?: boolean;
  padding?: string;
}>(({ isLight, styles, buttonType, allowsHover, active = false, padding }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  border: '1px solid',
  borderRadius: '22px',
  transition: 'all .3s ease',
  transitionProperty: 'border, color',
  padding,
  boxSizing: 'border-box',
  cursor: 'pointer',
  '&:hover:not(:disabled)': allowsHover
    ? {
        borderColor: isLight
          ? buttonType === ButtonType.Default
            ? active
              ? '#1AAB9B'
              : '#231536'
            : buttonType === ButtonType.Danger
            ? active
              ? '#F75524'
              : '#FAB6A1'
            : buttonType === ButtonType.Primary
            ? '#1AAB9B'
            : '#098C7D'
          : buttonType === ButtonType.Primary
          ? '#027265'
          : buttonType === ButtonType.Default
          ? '##1AAB9B'
          : '#027265',
        background: isLight
          ? buttonType === ButtonType.Default
            ? active
              ? '#E7FCFA'
              : '#FFFFFF'
            : buttonType === ButtonType.Danger
            ? active
              ? '#FBE1D9'
              : 'transparent'
            : buttonType === ButtonType.Primary
            ? '#B6EDE7'
            : 'white'
          : buttonType === ButtonType.Default
          ? 'transparent'
          : buttonType === ButtonType.Primary
          ? '#042F2A'
          : 'transparent',
      }
    : undefined,
  ...(styles ?? {}),
}));

const Text = styled.div<{ width?: string }>(({ width = 'fit-content' }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  whiteSpace: 'nowrap',
  width,
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    lineHeight: '18px',
  },
}));
