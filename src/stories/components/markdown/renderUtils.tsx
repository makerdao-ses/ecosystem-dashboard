import React from 'react';
import './markdown.module.scss';

export const customRenderer = {
  image(href: string) {
    return <img src={href} className='img-container' style={{
      width: '660px',
      height: '308px'
    }} key={href} />;
  },
  paragraph(text: string) {
    return <p className='paragraph' style={{
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
