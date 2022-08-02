import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { LinkIcon } from '../svg/link-icon';

interface CustomLinkProps {
  children: JSX.Element | JSX.Element[] | string,
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
  marginLeft?: string
  styleIcon?: CSSProperties;
}

export const CustomLink = ({
  target = '_blank',
  iconWidth = 6,
  iconHeight = 6,
  fontSize = 12,
  fontWeight = 500,
  withArrow = true,
  fontFamily = 'FT Base, sans-serif',
  marginLeft = '5px',
  styleIcon = {},
  ...props
}: CustomLinkProps) => {
  return <Container
    href={props.href}
    target={target}
    style={{
      pointerEvents: props.href ? 'all' : 'none',
      ...props.style
    }}
    fontSize={fontSize}
    fontSizeMobile={props.fontSizeMobile}
    fontWeight={fontWeight}
    fontFamily={fontFamily}
    onClick={(evt) => evt.stopPropagation()}>
    {props.children}
    {withArrow && <LinkIcon
        width={iconWidth}
        height={iconHeight}
        style={{
          marginLeft,
          ...styleIcon
        }} />}
  </Container>;
};

const Container = styled.a<{ fontSize: number, fontSizeMobile?: number, fontWeight: number, fontFamily: string, marginLeft?: string }>(({ fontSize, fontSizeMobile, fontWeight, fontFamily, marginLeft = '4px' }) => ({
  fontStyle: 'normal',
  fontWeight,
  fontFamily,
  fontSize: `${fontSizeMobile || fontSize}px`,
  lineHeight: '14px',
  letterSpacing: '1px',
  color: '#447AFB',
  textDecoration: 'none',
  marginLeft,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  '@media (min-width: 835px)': {
    fontSize: `${fontSize}px`
  }
}));
