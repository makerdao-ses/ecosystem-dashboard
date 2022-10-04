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
        d="M7.69339 10.8631C7.85404 11.0456 8.14598 11.0456 8.30664 10.8631L12.9036 5.63952C13.1255 5.38735 12.9398 5 12.597 5H3.40306C3.06023 5 2.87451 5.38735 3.09643 5.63952L7.69339 10.8631Z"
        fill={fill}
      />
    </svg>
  );
};
