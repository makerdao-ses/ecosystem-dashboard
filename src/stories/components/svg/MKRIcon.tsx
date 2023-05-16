import React from 'react';
import type { SVGIconProps } from '@ses/core/utils/typesHelpers';

const MKRIcon: React.FC<SVGIconProps> = ({ width = 24, height = 24, className }) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20.0002" cy="19.9999" r="16.6667" fill="url(#paint0_linear_18189_196229)" />
    <g clipPath="url(#clip0_18189_196229)">
      <path
        d="M10.621 25.5555V15.7506L17.4038 21.3464V25.5555H19.1356V20.9513C19.1356 20.6034 18.9868 20.2756 18.7328 20.0666L10.507 13.2798C9.84122 12.7305 8.88916 13.2513 8.88916 14.1652V25.5555H10.621Z"
        fill="white"
      />
      <path
        d="M29.3794 25.5555V15.7506L22.5966 21.3464V25.5555H20.8647V20.9513C20.8647 20.6034 21.0136 20.2756 21.2676 20.0666L29.4934 13.2798C30.1592 12.7305 31.1112 13.2513 31.1112 14.1645V25.5555H29.3794Z"
        fill="white"
      />
    </g>
    <defs>
      <linearGradient
        id="paint0_linear_18189_196229"
        x1="20.0002"
        y1="3.33325"
        x2="20.0002"
        y2="36.6666"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#1AAB9B" />
        <stop offset="1" stopColor="#64D3C7" />
      </linearGradient>
      <clipPath id="clip0_18189_196229">
        <rect width="22.2222" height="12.5" fill="white" transform="translate(8.88916 13.0554)" />
      </clipPath>
    </defs>
  </svg>
);

export default MKRIcon;
