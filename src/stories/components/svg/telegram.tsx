import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
}

const Telegram = ({ fill = '#211634', height = 17, width = 19.55, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.497 1.548l-2.95 14.427c-.223 1.018-.803 1.271-1.628.792l-4.495-3.435-2.17 2.163c-.24.249-.44.457-.903.457l.323-4.747 8.332-7.806c.362-.335-.079-.52-.563-.186l-10.3 6.725-4.435-1.44c-.964-.312-.982-1 .201-1.48L18.254.092c.803-.313 1.505.185 1.243 1.457z"
        fill={fill}
      />
    </svg>
  );
};

export default Telegram;
