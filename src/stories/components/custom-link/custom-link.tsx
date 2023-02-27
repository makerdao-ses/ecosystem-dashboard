import styled from '@emotion/styled';
import React from 'react';
import { LinkIcon } from '../svg/link-icon';
import type { CSSProperties } from 'react';

interface CustomLinkProps {
  children: JSX.Element | JSX.Element[] | string;
  href?: string;
  target?: string;
  iconWidth?: number;
  iconHeight?: number;
  style?: CSSProperties;
  fontSize?: number;
  fontSizeMobile?: number;
  fontWeight?: number;
  fontFamily?: string;
  withArrow?: boolean;
  marginLeft?: string;
  styleIcon?: CSSProperties;
  padding?: string;
  border?: string;
  lineHeight?: string;
  className?: string;
}

export const CustomLink = ({
  target = '_blank',
  iconWidth = 6,
  iconHeight = 6,
  fontSize = 11,
  lineHeight = '13px',
  fontWeight = 500,
  withArrow = true,
  fontFamily = 'Inter, sans-serif',
  marginLeft = '5px',
  styleIcon = {},
  border = 'none',
  padding = '0px',
  className,
  ...props
}: CustomLinkProps) => (
  <Container
    className={className}
    padding={padding}
    border={border}
    href={props.href}
    target={target}
    style={{
      pointerEvents: props.href ? 'all' : 'none',
      ...props.style,
    }}
    fontSize={fontSize}
    fontSizeMobile={props.fontSizeMobile}
    fontWeight={fontWeight}
    fontFamily={fontFamily}
    lineHeight={lineHeight}
    onClick={(evt) => evt.stopPropagation()}
  >
    {props.children}
    {withArrow && (
      <LinkIcon
        width={iconWidth}
        height={iconHeight}
        style={{
          marginLeft,
          ...styleIcon,
        }}
      />
    )}
  </Container>
);

const Container = styled.a<{
  fontSize: number;
  fontSizeMobile?: number;
  fontWeight: number;
  fontFamily: string;
  marginLeft?: string;
  padding: string;
  border?: string;
  lineHeight?: string;
}>(
  ({
    fontSize,
    fontSizeMobile,
    fontWeight = 500,
    fontFamily = 'Inter, sans-serif',
    marginLeft = '4px',
    padding,
    border,
    lineHeight,
  }) => ({
    fontStyle: 'normal',
    border,
    padding,
    fontWeight,
    fontFamily,
    fontSize: `${fontSizeMobile || fontSize}px`,
    lineHeight,
    letterSpacing: '1px',
    color: '#447AFB',
    textDecoration: 'none',
    marginLeft,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    background: 'transparent',
    paddingRight: '4px',
    '@media (min-width: 835px)': {
      fontSize: `${fontSize}px`,
      lineHeight: '19px',
    },
  })
);
