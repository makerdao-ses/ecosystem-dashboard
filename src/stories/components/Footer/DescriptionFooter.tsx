import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import type { LinkInterface } from './Footer';

interface Props {
  title: string;
  children: LinkInterface[];
  style?: React.CSSProperties;
}

const DescriptionFooter = ({ title, children, style = {} }: Props) => {
  const { isLight } = useThemeContext();

  return (
    <div style={style}>
      <StyleTitle isLight={isLight}>{title}</StyleTitle>
      {children &&
        children.map((item, index) =>
          item.isNotLink ? (
            <Link href={item.url} passHref legacyBehavior key={index}>
              <CookiesLink isLight={isLight}>{item.title}</CookiesLink>
            </Link>
          ) : (
            <StyleChildren key={item.title} href={item.url} target={item.target || '_blank'} isLight={isLight}>
              {item.title}
            </StyleChildren>
          )
        )}
    </div>
  );
};

const StyleTitle = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'FT Base, sans-serif',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '18px',
    marginBottom: '16px',
    letterSpacing: '0.4px',
    color: isLight ? '#231536' : '#D1DEE6',
  })
);

const StyleChildren = styled.a<{ isLight: boolean }>(({ isLight }) => ({
  display: 'block',
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19.02px',
  color: isLight ? '#231536' : '#D1DEE6',
  marginBottom: '16px',
  textDecoration: 'none',
}));

const CookiesLink = styled.a<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19.02px',
  color: isLight ? '#231536' : '#D1DEE6',
  marginBottom: '16px',
  cursor: 'pointer',
  textDecoration: 'none',
}));
export default DescriptionFooter;
