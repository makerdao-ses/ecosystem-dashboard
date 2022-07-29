import * as React from 'react';

interface Props {
    width?: number;
    height?: number;
    fill?: string;
    style?: React.CSSProperties;
    onClick?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const ThereDots = ({ width = 12, height = 3, fill = '#231536', style = {}, onClick = () => { }, ...props }: Props) => {
  return (
        <svg
            style={style}
            width={width}
            height={height}
            onClick={onClick}
            viewBox="0 0 12 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm3 1.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                fill={fill}
            />
        </svg >
  );
};

export default ThereDots;
