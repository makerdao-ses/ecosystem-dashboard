import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const VerticalRectangle = ({ height = 17, width = 6, ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="#C4C4C4" d="M0 0H6V17H0z" />
    </svg>
  );
};

export default VerticalRectangle;
