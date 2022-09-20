import * as React from 'react';

interface Props {
  fill?: string;
  width?: number;
  height?: number;
}

const Makerdao = ({ fill = '#fff', width = 48, height = 48, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx={24} cy={24} r={24} fill="url(#paint0_linear_2674_15832)" />
      <path
        d="M9.754 32.47V18.629l10.557 7.9v5.943h2.695v-6.5a1.56 1.56 0 00-.627-1.25l-12.803-9.58C8.54 14.365 7.06 15.1 7.06 16.39v16.08h2.695zM38.951 32.47V18.629l-10.557 7.9v5.943H25.7v-6.5c0-.492.232-.954.627-1.25l12.803-9.58c1.036-.776 2.518-.04 2.518 1.249v16.08H38.95z"
        fill={fill}
      />
      <defs>
        <linearGradient id="paint0_linear_2674_15832" x1={24} y1={0} x2={24} y2={48} gradientUnits="userSpaceOnUse">
          <stop stopColor="#1AAB9B" />
          <stop offset={1} stopColor="#24EBD5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Makerdao;
