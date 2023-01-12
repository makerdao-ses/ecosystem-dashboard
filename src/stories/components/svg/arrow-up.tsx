import * as React from 'react';
import type { CSSProperties } from 'react';
interface Props {
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

const ArrowUp = ({ width = 8, height = 6, fill = 'white', ...props }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 8 6"
    fill="none"
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4 0L7.4641 6H0.535898L4 0Z" fill={fill} />
  </svg>
);

export default ArrowUp;
