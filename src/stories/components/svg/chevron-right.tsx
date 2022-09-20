import React from 'react';

interface ChevronRightProps {
  width?: number;
  height?: number;
  fill?: string;
}

export const ChevronRight = ({ fill = '#1AAB9B', width = 16, height = 16 }: ChevronRightProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.19126 3.21999C6.44628 2.92667 6.85974 2.92667 7.11476 3.21999L10.347 6.93776L10.8087 7.46888C11.0638 7.7622 11.0638 8.23778 10.8087 8.5311L10.347 9.06221L7.11476 12.78C6.85974 13.0733 6.44628 13.0733 6.19126 12.78C5.93625 12.4867 5.93625 12.0111 6.19126 11.7178L9.42349 7.99999L6.19126 4.28221C5.93625 3.98889 5.93625 3.51332 6.19126 3.21999Z"
        fill={fill}
      />
    </svg>
  );
};
