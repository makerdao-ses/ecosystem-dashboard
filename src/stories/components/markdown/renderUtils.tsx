import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import { useThemeContext } from '../../../core/context/ThemeContext';
import './markdown.module.scss';

export const customRenderer = {
  image(href: string) {
    return <div style={{ width: '100%' }}> <ImageTag src={href} className='img-container' key={href} /></div>;
  },
  paragraph(text: string) {
    const isLight = useThemeContext().themeMode === 'light';
    return <p className='paragraph' style={{
      backgroundColor: isLight ? 'white' : 'transparent',
      fontWeight: 400,
      fontSize: '16px',
      color: isLight ? '#231536' : '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={text}>{text}</p>;
  },
  list(text: string) {
    const isLight = useThemeContext().themeMode === 'light';
    return <li style={{
      fontSize: '16px',
      backgroundColor: isLight ? 'white' : 'transparent',
      color: isLight ? '#231536' : '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={text}>{text}</li>;
  },
  listitem(text: string) {
    const isLight = useThemeContext().themeMode === 'light';
    return <ul style={{
      fontSize: '16px',
      backgroundColor: isLight ? 'white' : 'transparent',
      color: isLight ? '#231536' : '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ul>;
  },
  code(text: string) {
    const isLight = useThemeContext().themeMode === 'light';
    return <code className='tag-code' key={text} style={{
      backgroundColor: isLight ? 'white' : 'transparent',
      color: isLight ? '#231536' : '#D2D4EF',
      fontFamily: 'FT Base, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px',
    }}>{text}</code>;
  },
  strong(text: string) {
    const isLight = useThemeContext().themeMode === 'light';
    return <strong key={text} style={{
      backgroundColor: isLight ? 'white' : 'transparent',
      color: isLight ? '#231536' : '#D2D4EF',
      fontFamily: 'FT Base, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px',
    }}>{text}</strong>;
    // }
  },
};

const ImageTag = styled.img({
  width: '660px',
  height: '308px',
  [lightTheme.breakpoints.between('table_834', 'desktop_1194')]: {
    display: 'block',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.between('table_375', 'table_834')]: {
    width: '327px',
    height: '152px',
    display: 'block',
    margin: '0 auto',
  },
  [lightTheme.breakpoints.down('table_375')]: {
    width: 'fit-content',
    height: 'auto',
  },
});
