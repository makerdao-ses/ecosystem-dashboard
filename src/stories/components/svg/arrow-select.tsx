import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const ArrowSelect = ({ width = 10, height = 6, fill = '#25273D', ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.282.23A.73.73 0 00.22.23a.808.808 0 000 1.108L4.469 5.77a.78.78 0 00.05.048.729.729 0 001.012-.048L9.78 1.338a.808.808 0 000-1.108.73.73 0 00-1.062 0L5 4.108 1.282.23z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowSelect;
