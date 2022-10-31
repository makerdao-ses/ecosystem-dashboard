import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { LinkInterface } from './footer';

interface Props {
  title: string;
  children: LinkInterface[];
  style?: React.CSSProperties;
}

const DescriptionFooter = ({ title, children, style = {} }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  const router = useRouter();

  const HandleOnClick = useCallback(
    (url: string) => () => {
      router.push(url);
    },
    []
  );
  return (
    <div style={style}>
      <StyleTitle isLight={isLight}>{title}</StyleTitle>
      {children &&
        children.map((item, index) => {
          return item.isNotLink ? (
            <CookiesLink isLight={isLight} onClick={HandleOnClick(item.url)} key={index}>
              {item.title}
            </CookiesLink>
          ) : (
            <StyleChildren href={item.url} target={item.target || '_blank'} key={item.title} isLight={isLight}>
              {item.title}
            </StyleChildren>
          );
        })}
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

const CookiesLink = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'FT Base, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '19.02px',
  color: isLight ? '#231536' : '#D1DEE6',
  marginBottom: '16px',
  cursor: 'pointer',
}));
export default DescriptionFooter;
