import React, { CSSProperties } from 'react';
import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { LinkIcon } from '../svg/link-icon';

interface CustomLinkProps {
  children: JSX.Element | JSX.Element[] | string,
  href?: string;
  target?: string;
  iconWidth?: number;
  iconHeight?: number;
  style?: CSSProperties;
}

export const CustomLink = ({ target = '_blank', iconWidth = 6, iconHeight = 6, ...props }: CustomLinkProps) => {
  return <Container
    href={props.href}
    target={target}
    style={props.style}
    onClick={(evt) => evt.stopPropagation()}>
    {props.children}
    <LinkIcon width={iconWidth} height={iconHeight} style={{ marginLeft: '5px' }}/>
  </Container>;
};

const Container = styled.a(({ theme }) => ({
  fontFamily: (theme as Theme).typography.fontFamily,
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  letterSpacing: '1px',
  color: '#447AFB',
  textDecoration: 'none',
  marginLeft: '4px',
  cursor: 'pointer',
}));
