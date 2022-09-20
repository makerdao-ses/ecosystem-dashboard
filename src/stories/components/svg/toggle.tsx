import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

const Toggle = ({ width = 20, height = 16, fill = '#626472', onClick, ...props }: Props) => {
  return (
    <svg
      style={{
        cursor: 'pointer',
        padding: '2px',
      }}
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1.667 0C.747 0 0 .716 0 1.6c0 .884.746 1.6 1.667 1.6h16.667c.92 0 1.666-.716 1.666-1.6 0-.884-.746-1.6-1.666-1.6H1.666zM0 8c0-.883.746-1.6 1.667-1.6H15c.92 0 1.667.717 1.667 1.6 0 .884-.746 1.6-1.667 1.6H1.667C.747 9.6 0 8.884 0 8zM0 14.4c0-.884.746-1.6 1.667-1.6h16.667c.92 0 1.666.716 1.666 1.6 0 .883-.746 1.6-1.666 1.6H1.666C.747 16 0 15.284 0 14.4z"
        fill={fill}
      />
    </svg>
  );
};

export default Toggle;
