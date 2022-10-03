import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

export default ({ width = 10, height = 8, fill = '#231536' }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.833341 0C0.373104 0 0 0.33579 0 0.75C0 1.16421 0.373095 1.5 0.833341 1.5H9.16676C9.62701 1.5 10.0001 1.16421 10.0001 0.75C10.0001 0.33579 9.62701 0 9.16676 0H0.833341Z"
        fill={fill}
      />
      <path
        d="M1.5 3.75C1.5 3.33578 1.85818 3 2.3 3H7.7C8.14184 3 8.5 3.33578 8.5 3.75C8.5 4.16422 8.14184 4.5 7.7 4.5H2.3C1.85818 4.5 1.5 4.16422 1.5 3.75Z"
        fill={fill}
      />
      <path
        d="M2.5 6.75C2.5 6.33578 2.8731 6 3.33334 6H6.66676C7.12701 6 7.5001 6.33578 7.5001 6.75C7.5001 7.16422 7.12701 7.5 6.66676 7.5H3.33334C2.8731 7.5 2.5 7.16422 2.5 6.75Z"
        fill={fill}
      />
    </svg>
  );
};
