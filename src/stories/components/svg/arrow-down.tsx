import * as React from 'react';
interface Props {
  width?: number;
  height?: number;
  onClick?: () => void;
  fill?: string;
}

const ArrowDown = ({
  width = 7,
  height = 6,
  onClick,
  fill = 'white',
  ...props
}: Props) => {
  return (
    <svg
    style={{ padding: '2px' }}
     onClick={onClick}
      width={width}
      height={height}
      viewBox='0 0 7 6'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M3.5 5.5L.469.25H6.53L3.5 5.5z'
        fill={fill}
      />
    </svg>
  );
};

export default ArrowDown;
