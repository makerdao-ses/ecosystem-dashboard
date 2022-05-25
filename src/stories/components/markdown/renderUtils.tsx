import React from 'react';
import './markdown.scss';

export const customRenderer = {
  image(href: string) {
    return <img src={href} className='img-container'style={{
      width: '769px',
      maxHeight: '469px'
    }} key={href} />;
  },
  paragraph(text: string) {
    return <p className='paragraph' key={text}>{text}</p>;
  },
  code(text: string) {
    return <code className='tag-code' key={text}>{text}</code>;
  },
};
