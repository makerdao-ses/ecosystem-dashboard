import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const CheckMark = ({ fill = '#1AAB9B', height = 18, width = 22, ...props }: Props) => (
  <svg width={width} height={height} viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M21.332.429c.798.643.895 1.78.216 2.537l-12.896 14.4A1.94 1.94 0 017.221 18a1.943 1.943 0 01-1.441-.615l-5.31-5.76a1.737 1.737 0 01.178-2.54c.788-.654 1.986-.578 2.676.17l3.862 4.189L18.658.634c.679-.757 1.876-.85 2.674-.205z"
      fill={fill}
    />
  </svg>
);

export default CheckMark;
