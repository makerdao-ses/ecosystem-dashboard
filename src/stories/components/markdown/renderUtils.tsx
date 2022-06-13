import React from 'react';
import './markdown.scss';

export const customRenderer = {
  image(href: string) {
    return <img src={href} className='img-container' style={{
      width: '660px',
      height: '308px'
    }} key={href} />;
  },
  paragraph(text: string) {
    return <p className='paragraph' style={{ backgroundColor: 'white' }} key={text}>{text}</p>;
  },
  code(text: string) {
    return <code className='tag-code' key={text} style={{ backgroundColor: 'white' }}>{text}</code>;
  },
};
