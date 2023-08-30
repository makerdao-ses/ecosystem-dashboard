import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

const ArrowNavigationForCards: React.FC<Props> = ({
  fill = '#434358',
  className,
  height = 33,
  width = 32,
  ...props
}) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 32 33"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M25.89 16.394l.11.106-.11.106-.679.658-6.115 5.92a1.142 1.142 0 01-1.578 0 1.056 1.056 0 010-1.528l4.21-4.076H8.115C7.5 17.58 7 17.097 7 16.5c0-.597.5-1.08 1.116-1.08h13.611l-4.21-4.076a1.056 1.056 0 010-1.528 1.142 1.142 0 011.58 0l6.113 5.92h.001l.68.658z"
      fill={fill}
    />
  </svg>
);

export default ArrowNavigationForCards;
