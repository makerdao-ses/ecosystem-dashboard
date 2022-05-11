import React from 'react';

interface Props {
    width?: number;
    height?: number;
    onClick?: () => void;
}

const ArrowRight = ({ width = 16, height = 17, onClick, ...props }: Props) => {
  return (
        <svg
        cursor={onClick ? 'pointer' : 'default'}
            width={width}
            onClick={onClick}
            height={height}
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M5.312 2.981a.5.5 0 00-.048.651l.048.057 4.313 4.313-4.313 4.313a.5.5 0 00-.048.65l.048.057a.5.5 0 00.651.048l.057-.048 4.666-4.667a.5.5 0 00.049-.65l-.049-.057L6.02 2.981a.5.5 0 00-.708 0z"
                fill="#000"
            />
        </svg>
  );
};

export default ArrowRight;
