import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const ThreeDotsVerticalDarkMode = ({
  fill = '#EDEFFF',
  height = 35,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  style = {},
  width = 35,
  ...props
}: Props) => (
  <svg
    width={width}
    height={height}
    onClick={onClick}
    style={style}
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.5 10a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0zM18 15a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm0 7.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5z"
      fill={fill}
    />
    <rect x={0.5} y={0.5} width={width} height={height} rx={17} stroke="red" />
  </svg>
);

export default ThreeDotsVerticalDarkMode;
