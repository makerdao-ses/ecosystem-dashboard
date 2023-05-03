import React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillCircle?: string;
  onClick?: () => void;
}

export const ArrowSwiperPrevious: React.FC<Props> = ({
  fillCircle = '#fff',
  height = 76,
  width = 76,
  fill = '#D4D9E1',
  onClick,
  ...props
}) => (
  <svg
    cursor={onClick ? 'pointer' : 'default'}
    onClick={onClick}
    width={width}
    height={height}
    viewBox="0 0 76 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g opacity={0.6} filter="url(#filter0_d_17842_226006)">
      <circle cx={38} cy={32} r={32} fill={fillCircle} />
    </g>
    <path
      opacity={0.8}
      d="M19.664 33.73c-1.333-.77-1.333-2.694 0-3.463l26-15.011c1.333-.77 3 .192 3 1.732V47.01c0 1.54-1.667 2.502-3 1.732l-26-15.011z"
      fill={fill}
    />
    <defs>
      <filter
        id="filter0_d_17842_226006"
        x={0}
        y={0}
        width={76}
        height={76}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy={6} />
        <feGaussianBlur stdDeviation={3} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.458824 0 0 0 0 0.458824 0 0 0 0 0.458824 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_17842_226006" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_17842_226006" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default ArrowSwiperPrevious;
