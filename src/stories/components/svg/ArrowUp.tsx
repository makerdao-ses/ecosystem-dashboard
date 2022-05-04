import * as React from 'react';
interface Props {
  width?: number;
  height?: number;
  isSelect?: boolean;
  onClick?: () => void;
}

const ArrowUp = ({
  width = 7,
  height = 7,
  isSelect = true,
  onClick,
  ...props
}: Props) => {
  return (
    <svg
      style={{ cursor: 'pointer', padding: '2px' }}
      onClick={onClick}
      width={width}
      height={height}
      viewBox='0 0 7 6'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M3.5.5l3.031 5.25H.47L3.5.5z'
        fill={isSelect ? '#fff' : '#31394d'}
      />
    </svg>
  );
};

export default ArrowUp;
