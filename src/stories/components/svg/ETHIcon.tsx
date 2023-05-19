import React from 'react';
import type { SVGIconProps } from '@ses/core/utils/typesHelpers';

const ETHIcon: React.FC<SVGIconProps> = ({ width = 24, height = 24, className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.0002 36.6666C29.2049 36.6666 36.6668 29.2047 36.6668 19.9999C36.6668 10.7952 29.2049 3.33325 20.0002 3.33325C10.7954 3.33325 3.3335 10.7952 3.3335 19.9999C3.3335 29.2047 10.7954 36.6666 20.0002 36.6666Z"
      fill="url(#paint0_linear_18189_196225)"
    />
    <path d="M20.0001 10V23.8136L13.3336 20.1855L20.0001 10Z" fill="white" />
    <path d="M20.0001 10L26.6667 20.1855L20.0001 23.8136V10Z" fill="white" />
    <path d="M20 24.9763V29.9999L13.3335 21.35L20 24.9763Z" fill="white" />
    <path d="M20 29.9999V24.9763L26.6668 21.35L20 29.9999Z" fill="white" />
    <defs>
      <linearGradient
        id="paint0_linear_18189_196225"
        x1="4.51641"
        y1="20.0005"
        x2="36.463"
        y2="45.0005"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#6580EB" />
        <stop offset="1" stopColor="#8EA2F2" />
      </linearGradient>
    </defs>
  </svg>
);

export default ETHIcon;
