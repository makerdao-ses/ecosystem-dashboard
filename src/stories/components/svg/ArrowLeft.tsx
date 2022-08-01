import React from 'react';

interface Props {
    width?: number;
    height?: number;
    onClick?: () => void;
    fill?: string;
    style?: React.CSSProperties;

}

const ArrowLeft = ({ height = 17, width = 16, fill = '#1AAB9B', onClick, style = {}, ...props }: Props) => {
  return (
        <svg
            style={style}
            cursor={onClick ? 'pointer' : 'default'}
            onClick={onClick}
            width={width}
            height={height}
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10.688 2.981a.5.5 0 01.048.651l-.049.057-4.312 4.313 4.313 4.313a.5.5 0 01.048.65l-.049.057a.5.5 0 01-.65.048l-.057-.048-4.666-4.667a.5.5 0 01-.049-.65l.049-.057L9.98 2.981a.5.5 0 01.707 0z"
                fill={fill}
            />
        </svg>
  );
};

export default ArrowLeft;
