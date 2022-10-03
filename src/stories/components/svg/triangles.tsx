import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

export default ({ width = 16, height = 16, fill = '#231536' }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2L10.5981 6.5H5.40192L8 2Z" fill={fill} />
      <path d="M8 14L5.40192 9.5H10.5981L8 14Z" fill={fill} />
    </svg>
  );
};
