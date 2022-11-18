import * as React from 'react';

interface Props {
  fill?: string;
  width?: number;
  height?: number;
}

const MoonWithCircle = ({ fill = '#231536', height = 34, width = 34, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20.615 7.058a.766.766 0 00-1 1 8.79 8.79 0 01-5.413 11.763 8.78 8.78 0 01-4.787.166 8.841 8.841 0 01-1.333-.433.783.783 0 00-1.025 1.017 10.353 10.353 0 0010.387 6.397 10.349 10.349 0 009.263-7.94 10.307 10.307 0 00-6.092-11.97zm4.567 11.604a8.804 8.804 0 01-6.967 6.618 8.797 8.797 0 01-8.867-3.7 10.389 10.389 0 0012.192-7.753 10.2 10.2 0 00.067-4.46 8.753 8.753 0 013.575 9.295z"
        fill={fill}
      />
      <rect x={0.5} y={0.5} width={33} height={33} rx={16.5} stroke="#D4D9E1" />
    </svg>
  );
};

export default MoonWithCircle;
