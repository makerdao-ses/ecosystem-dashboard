import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { useThemeContext } from '../../../core/context/ThemeContext';
import lightTheme from '../../../../styles/theme/light';
import { ButtonType } from '../../../core/enums/button-type.enum';

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
  buttonType?: ButtonType;
  isHadPopover?: boolean;
  allowsHover?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const customStyles: { [id: string]: any } = {
  Default: {
    textColor: '#231536',
    textColorDark: '#D2D4EF',
    background: '#FFFFFF',
    backgroundDark: 'transparent',
    borderColor: '#D4D9E1',
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
};

export const CustomButton = ({
  isHightLight = false,
  buttonType = ButtonType.Default,
  isHadPopover = false,
  ...props
}: CustomButtonProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container
      isHadPopover={isHadPopover}
      className={props.className}
      isLight={isLight}
      buttonType={buttonType}
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
      styles={{
        backgroundColor: isLight ? customStyles[buttonType].background : customStyles[buttonType].backgroundDark,
        borderColor: isLight ? customStyles[buttonType]?.borderColor : customStyles[buttonType]?.borderColorDark,
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
              : customStyles[buttonType].textColor
            : props.disabled
            ? '#48495F'
            : customStyles[buttonType].textColorDark,
          ...props.styleText,
        }}
      >
        {props.label}
      </Text>
    </Container>
  );
};

const Container = styled.button<{
  isLight?: boolean;
  isHightLight?: boolean;
  isPrimary?: boolean;
  styles?: CSSProperties;
  buttonType: ButtonType;
  isHadPopover?: boolean;
}>(({ isLight, styles, buttonType, isHadPopover = false, allowsHover }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  border: '1px solid',
  borderRadius: '22px',
  transition: 'all .3s ease',
  transitionProperty: 'border, color',
  padding: '15px 16px',
  boxSizing: 'border-box',
  cursor: 'pointer',
  '&:hover:not(:disabled)': allowsHover
    ? {
        borderColor: isLight
          ? buttonType === ButtonType.Default && !isHadPopover
            ? '#231536'
            : buttonType === ButtonType.Default && isHadPopover
            ? '#1AAB9B'
            : buttonType === ButtonType.Primary
            ? '#1AAB9B'
            : '#098C7D'
          : buttonType === ButtonType.Primary
          ? '#027265'
          : '#027265',
        background: isLight
          ? buttonType === ButtonType.Default
            ? '#FFFFFF'
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
