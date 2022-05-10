import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

const ThemeMode = ({
  width = 28,
  height = 28,
  fill = '#898989',
  ...props
}: Props) => {
  return (
    <svg
    style={{ cursor: 'pointer', padding: '2px' }}
      width={width}
      height={height}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14 19.333a5.333 5.333 0 100-10.666v10.666z" fill={fill} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 .667C6.636.667.667 6.636.667 14S6.637 27.333 14 27.333c7.364 0 13.334-5.97 13.334-13.333C27.334 6.636 21.364.667 14 .667zm0 2.666v5.333a5.333 5.333 0 000 10.667v5.334a10.667 10.667 0 100-21.334z"
        fill={fill}
      />
    </svg>
  );
};

export default ThemeMode;
