import styled from '@emotion/styled';
import AddIcon from '@ses/components/svg/add';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { ButtonType } from '@ses/core/enums/buttonTypeEnum';
import Link from 'next/link';
import React from 'react';
import lightTheme from 'styles/theme/light';
import { allowsHoverStyleButton, customStyles } from '../../../core/utils/sharedStyle';
import type { CSSProperties } from 'react';

interface CustomButtonProps {
  label: string | JSX.Element;
  className?: string;
  disabled?: boolean;
  style?: CSSProperties;
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
  href?: string;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export const LinkButton = ({
  isHightLight = false,
  buttonType = ButtonType.Default,
  allowsHover = true,
  active = false,
  withIcon = false,
  fill,
  height,
  width,
  type = 'button',
  padding = '15px 16px',
  href,
  target = '_self',
  ...props
}: CustomButtonProps) => {
  const { isLight } = useThemeContext();

  return (
    <Link href={href ?? ''} passHref legacyBehavior>
      <Container
        target={target}
        padding={padding}
        active={active}
        allowsHover={allowsHover}
        className={`${props.className} no-select`}
        isLight={isLight}
        buttonType={buttonType}
        type={type}
        styles={{
          backgroundColor: isLight
            ? active
              ? customStyles[buttonType].activeBackground
              : customStyles[buttonType].background
            : active
            ? customStyles[buttonType].activeBackgroundDark
            : customStyles[buttonType].backgroundDark,
          borderColor: isLight
            ? allowsHover
              ? active
                ? customStyles[buttonType].activeBorderColor
                : customStyles[buttonType]?.borderColor
              : customStyles[buttonType].borderColorMobile
            : allowsHover
            ? active
              ? customStyles[buttonType].activeBorderColorDark
              : customStyles[buttonType]?.borderColorDark
            : customStyles[buttonType].borderColorMobileDark,
          ...props.style,
        }}
        isHightLight={isHightLight}
      >
        <Text
          disabled={props.disabled}
          allowsHover={allowsHover}
          active={active}
          buttonType={buttonType}
          isLight={isLight}
          width={props.widthText}
          style={{
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
    </Link>
  );
};

const Container = styled.a<{
  isLight: boolean;
  isHightLight?: boolean;
  styles?: CSSProperties;
  buttonType: ButtonType;
  allowsHover: boolean;
  active?: boolean;
  padding?: string;
}>(({ isLight, styles, buttonType, allowsHover, active = false, padding }) => ({
  display: 'inline-block',
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
  textDecoration: 'none',
  '&:hover:not(:disabled)': allowsHoverStyleButton(allowsHover, isLight, active, buttonType),
  ...(styles ?? {}),
}));

const Text = styled.div<{
  width?: string;
  isLight: boolean;
  buttonType: ButtonType;
  active: boolean;
  allowsHover: boolean;
  style: CSSProperties;
  disabled?: boolean;
}>(({ width = 'fit-content', isLight, buttonType, active, allowsHover, style, disabled = false }) => ({
  fontSize: '14px',
  lineHeight: '18px',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  width,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  color: isLight
    ? disabled
      ? ' #9FAFB9'
      : active
      ? customStyles[buttonType].activeColorText
      : customStyles[buttonType].textColor
    : disabled
    ? '#48495F'
    : active
    ? customStyles[buttonType].activeColorTextDark
    : customStyles[buttonType].textColorDark,
  '&:hover:not(:disabled)': allowsHoverStyleButton(allowsHover, isLight, active, buttonType),
  ...(style ?? {}),
  [lightTheme.breakpoints.between('mobile_375', 'table_834')]: {
    lineHeight: '18px',
  },
}));
