import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

const ArrowInternalLink: React.FC<Props> = ({ className, width = 24, height = 24, fill = '#5B667E', ...props }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.907 11.91L20 12l-.093.09-.571.553v.001l-5.15 4.984a.962.962 0 01-1.329 0 .89.89 0 010-1.286l3.545-3.432H4.94c-.52 0-.94-.407-.94-.91 0-.502.42-.91.94-.91h11.462L12.857 7.66a.89.89 0 010-1.287.962.962 0 011.33 0l5.148 4.985.572.554z"
      fill={fill}
    />
  </svg>
);

export default ArrowInternalLink;
