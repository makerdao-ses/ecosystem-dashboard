import * as React from 'react';

interface Props {
    width?: number;
    height?: number;
    fill?: string;
    onClick?: () => void;
}

const Telegram = ({ fill = '#333', height = 18, width = 20, onClick, ...props }: Props) => {
  return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M19.85 2.14L16.9 16.565c-.223 1.018-.803 1.271-1.628.792l-4.495-3.435-2.17 2.163c-.24.249-.44.457-.903.457l.323-4.747 8.331-7.806c.363-.335-.078-.52-.563-.185l-10.3 6.724L1.063 9.09c-.965-.312-.982-1 .2-1.48L18.607.682c.803-.312 1.506.186 1.244 1.457z"
                fill={fill}
            />
        </svg>
  );
};

export default Telegram;
