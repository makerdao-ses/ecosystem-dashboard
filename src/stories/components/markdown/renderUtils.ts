import './markdown.scss';
import { createElement as h } from 'react';

const makerRender = ({
  forEachHeading,
}: {
  forEachHeading?: (
    level: number,
    htmlCleanedText: string,
    escapedText: string
  ) => void;
}) => ({
  heading(text: string, level: number) {
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

    const htmlCleanedText = text.replace(/<[^<>]+>/gm, '');

    return `<div class='titleMarkdown'>
      <h${level} class='show-link'>
      <a class='link margin-left--20' href='#${escapedText}' target='_parent'><span class='hide'></span></a>${htmlCleanedText}</h${level}>
      </div>`;
  },
  table(header: string, body: string) {
    return `<div style='overflow-x:auto; margin-bottom: 16px;'>
                  <table style='overflow-x:auto; margin-bottom: 16px;'>
                    <thead>${header}</thead>
                    <tbody>${body}</tbody>
                  </table>
                </div>`;
  },
  image(href: string, title: string) {
    return `<div class='img-container'><img src=${href}  alt=${title} style='width:769px;max-height: 469px;'/></div>`;
  },
});

export default makerRender;

export const customRenderer = {
  image(href: string, title: string): JSX.Element {
    const img = h('img', { src: href, style: { border: '1px solid red' } });
    return h('div', { className: 'img-container' }, [img, img]);
  },
};
