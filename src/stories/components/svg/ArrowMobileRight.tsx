import React from 'react';

interface Props {
  width?: number;
  height?: number;
  onClick?: () => void;
  fill?: string;
  style?: React.CSSProperties;
}

const ArrowMobileRight = ({ width = 5, height = 10, fill = '#1AAB9B', onClick, style = {}, ...props }: Props) => {
  return (
    <svg
      style={style}
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 5 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.191.22a.595.595 0 01.924 0l3.232 3.718.462.53a.833.833 0 010 1.063l-.462.531L1.115 9.78a.595.595 0 01-.924 0 .833.833 0 010-1.062L3.423 5 .191 1.282a.833.833 0 010-1.062z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowMobileRight;
