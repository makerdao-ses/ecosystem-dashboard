import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

export default ({ width = 16, height = 16, fill = '#231536' }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.69339 5.13691C7.85404 4.95436 8.14598 4.95436 8.30664 5.13691L12.9036 10.3605C13.1255 10.6127 12.9398 11 12.597 11H3.40306C3.06023 11 2.87451 10.6127 3.09643 10.3605L7.69339 5.13691Z"
        fill={fill}
      />
    </svg>
  );
};
