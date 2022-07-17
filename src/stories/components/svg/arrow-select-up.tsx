import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string
}

const ArrowSelectUp = ({ width = 10, height = 6, fill = '#25273D', ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.282 5.77a.73.73 0 01-1.062 0 .808.808 0 010-1.108L4.469.23a.73.73 0 011.062 0L9.78 4.662a.808.808 0 010 1.108.73.73 0 01-1.062 0L5 1.892 1.282 5.77z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowSelectUp;
