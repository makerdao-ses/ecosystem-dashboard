import styled from '@emotion/styled';
import React from 'react';
import lightTheme from '../../../../styles/theme/light';
import './markdown.module.scss';

export const customRenderer = {
  image(href: string) {
    return <div style={{ width: '100%' }}><ImageTag src={href} className='img-container' key={href} /></div>;
  },
  paragraph(text: string) {
    return <p className='paragraph' style={{
      backgroundColor: 'white',
      color: '#231536',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={text}>{text}</p>;
  },
  list(text: string) {
    return <p className='ol_tags' style={{
      backgroundColor: 'white',
      color: '#231536',
      lineHeight: '19px',
      fontFamily: 'FT Base, sans-serif',
    }} key={text}>{text}</p>;
  },
  code(text: string) {
    return <code className='tag-code' key={text} style={{
      backgroundColor: 'white',
      color: '#231536',
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
});
