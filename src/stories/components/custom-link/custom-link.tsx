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
  fontWeight?: number;
  fontFamily?: string;
  withArrow?: boolean;
  marginLeft?: string
}

export const CustomLink = ({ target = '_blank', iconWidth = 6, iconHeight = 6, fontSize = 12, fontWeight = 500, withArrow = true, fontFamily = 'FT Base, sans-serif', marginLeft = '5px', ...props }: CustomLinkProps) => {
  return <Container
    href={props.href}
    target={target}
    style={props.style}
    fontSize={fontSize}
    fontWeight={fontWeight}
    fontFamily={fontFamily}
    onClick={(evt) => evt.stopPropagation()}>
    {props.children}
    {withArrow && <LinkIcon width={iconWidth} height={iconHeight} style={{ marginLeft }} />}
  </Container>;
};

const Container = styled.a<{ fontSize: number, fontWeight: number, fontFamily: string, marginLeft?: string }>(({ fontSize, fontWeight, fontFamily, marginLeft = '4px' }) => ({
  fontStyle: 'normal',
  fontWeight,
  fontFamily,
  fontSize: `${fontSize}px`,
  lineHeight: '14px',
  letterSpacing: '1px',
  color: '#447AFB',
  textDecoration: 'none',
  marginLeft,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
}));
