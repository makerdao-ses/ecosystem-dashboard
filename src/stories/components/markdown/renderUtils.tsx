import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import './markdown.module.scss';

export const customRenderer = {
  image(href: string) {
    return <div style={{
      width: '100%',
    }}><ImageTag src={href} className='img-container' key={Math.random()} /></div>;
  },
  paragraph(text: string) {
    return <p className='paragraph' style={{
      backgroundColor: 'transparent',
      color: '#231536',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</p>;
  },
  list(text: string) {
    return <ul className='ol_tags' style={{
      backgroundColor: 'transparent',
      color: '#231536',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ul>;
  },
  listitem(text: string) {
    return <li className='ol_' style={{
      backgroundColor: 'transparent',
      color: '#231536',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</li>;
  },
  code(text: string) {
    return <code className='tag-code' key={Math.random()} style={{
      backgroundColor: 'transparent',
      color: '#231536',
      fontFamily: 'FT Base, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px',
    }}>{text}</code>;
  },
};

export const customRendererDark = {
  image(href: string) {
    return <div style={{
      width: '100%',
    }}><ImageTag src={href} className='img-container' key={href} /></div>;
  },
  paragraph(text: string) {
    return <p className='paragraph' style={{
      backgroundColor: 'transparent',
      color: '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</p>;
  },
  list(text: string) {
    return <ul className='ol_tags' style={{
      backgroundColor: 'transparent',
      color: '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</ul>;
  },
  listitem(text: string) {
    return <li className='ol_' style={{
      backgroundColor: 'transparent',
      color: '#D2D4EF',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={Math.random()}>{text}</li>;
  },
  code(text: string) {
    return <code className='tag-code' key={Math.random()} style={{
      backgroundColor: 'transparent',
      color: '#D2D4EF',
      fontFamily: 'FT Base, sans-serif',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '19px',
    }}>{text}</code>;
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
