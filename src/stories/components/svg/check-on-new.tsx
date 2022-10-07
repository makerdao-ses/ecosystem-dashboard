import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const CheckOnComponent = ({ fill = '#1AAB9B', height = 13, width = 13, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 .5A1.5 1.5 0 00.5 2v9A1.5 1.5 0 002 12.5h9a1.5 1.5 0 001.5-1.5V2A1.5 1.5 0 0011 .5H2zm8.053 4.257a.75.75 0 00-1.106-1.014L5.402 7.611 4.076 6.02a.75.75 0 10-1.152.96l1.875 2.25a.75.75 0 001.129.027l4.125-4.5z"
        fill={fill}
      />
    </svg>
  );
};

export default CheckOnComponent;
