import * as React from 'react';
interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const ArrowDown = ({ width = 8, height = 6, fill = 'white' }: Props) => (
  <svg width={width} height={height} viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L0.535898 0H7.4641L4 6Z" fill={fill} />
  </svg>
);

export default ArrowDown;
