import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  fillThereDots?: string;
}

const ThreeDotsWithCircleGreen = ({
  width = 16,
  height = 16,
  fill = '#B6EDE7',
  fillThereDots = '#1AAB9B',
  style = {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  ...props
}: Props) => (
  <svg
    onClick={onClick}
    style={style}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={16} height={16} rx={8} fill={fill} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm3 1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
      fill={fillThereDots}
    />
  </svg>
);

export default ThreeDotsWithCircleGreen;
