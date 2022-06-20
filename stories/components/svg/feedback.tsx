import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

const FeedBack = ({
  width = 23,
  height = 23,
  fill = '#898989',
  onClick,
  ...props
}: Props) => {
  return (
    <svg
    style={{
      cursor: 'pointer',
      padding: '2px'
    }}
      onClick={onClick}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path
        d='M20.45.156c.619 0 1.143.215 1.572.646.43.43.644.938.644 1.523v13.22c0 .62-.215 1.146-.644 1.576-.43.43-.953.646-1.571.646H5.045l-4.379 4.39V2.324c0-.585.215-1.093.644-1.523.43-.43.953-.646 1.571-.646h17.57zm-2.215 13.22v-2.22H5.045v2.22h13.19zm0-3.304v-2.22H5.045v2.22h13.19zm0-3.305V4.546H5.045v2.22h13.19z'
        fill={
          fill
        }
      />
    </svg>
  );
};

export default FeedBack;
