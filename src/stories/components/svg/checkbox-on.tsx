import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillBorderArrow?: string
}

const CheckboxOn = ({ height = 16, width = 16, fill = '#1AAB9B', fillBorderArrow = '#B6EDE7' }: Props) => {
  return <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 3C0 1.34315 1.34315 0 3 0H13C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3Z" fill={fillBorderArrow} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 2C2.67157 2 2 2.67157 2 3.5V12.5C2 13.3285 2.67157 14 3.5 14H12.5C13.3285 14 14 13.3285 14 12.5V3.5C14 2.67157 13.3285 2 12.5 2H3.5ZM11.5529 6.25679C11.8327 5.95146 11.8121 5.47703 11.5068 5.19714C11.2015 4.91724 10.727 4.93787 10.4471 5.24321L6.9019 9.11075L5.57616 7.51987C5.31099 7.20166 4.83807 7.15866 4.51986 7.42383C4.20165 7.689 4.15866 8.16192 4.42384 8.48015L6.29883 10.7302C6.43737 10.8963 6.64096 10.9947 6.8573 10.9998C7.07364 11.0049 7.28164 10.9163 7.42786 10.7568L11.5529 6.25679Z"
      fill={fill} />
  </svg>;
};

export default CheckboxOn;
