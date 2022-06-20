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
  withArrow?: boolean;
}

export const CustomLink = ({ target = '_blank', iconWidth = 6, iconHeight = 6, fontSize = 12, fontWeight = 500, withArrow = true, ...props }: CustomLinkProps) => {
  return <Container
    href={props.href}
    target={target}
    style={props.style}
    fontSize={fontSize}
    fontWeight={fontWeight}
    onClick={(evt) => evt.stopPropagation()}>
    {props.children}
    {withArrow && <LinkIcon width={iconWidth} height={iconHeight} style={{ marginLeft: '5px' }}/>}
  </Container>;
};

const Container = styled.a<{ fontSize: number, fontWeight: number }>(({ fontSize, fontWeight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight,
  fontSize: `${fontSize}px`,
  lineHeight: '14px',
  letterSpacing: '1px',
  color: '#447AFB',
  textDecoration: 'none',
  marginLeft: '4px',
  cursor: 'pointer',
}));
