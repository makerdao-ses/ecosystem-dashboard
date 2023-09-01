import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const MultiUsersMobile: React.FC<Props> = ({ fill = '#fff', height = 38, width = 38, className, ...props }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 38 38"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_24106_111273)">
      <rect x={6} y={3.5} width={22} height={22} rx={11} fill={fill} shapeRendering="crispEdges" />
      <g clipPath="url(#clip0_24106_111273)">
        <path
          d="M12.884 12.366a1.65 1.65 0 100-3.3 1.65 1.65 0 000 3.3zM16.997 14.966c-.287-1.68-1.895-2.122-4.11-2.122-3.03 0-3.942.828-4.122 2.121-.05.357.149.681.485.774.558.154 1.646.341 3.636.341 1.99 0 3.079-.187 3.637-.341a.666.666 0 00.474-.773zM21.134 12.366a1.65 1.65 0 100-3.3 1.65 1.65 0 000 3.3z"
          fill="#1AAB9B"
        />
        <path
          d="M25.247 14.966c-.287-1.68-1.895-2.122-4.11-2.122-3.03 0-3.942.828-4.122 2.121-.05.357.149.681.485.774.558.154 1.646.341 3.636.341 1.99 0 3.079-.187 3.637-.341a.666.666 0 00.474-.773z"
          fill="#1AAB9B"
        />
        <path d="M17.01 15.596a3.3 3.3 0 100-6.6 3.3 3.3 0 000 6.6z" fill="#fff" />
        <path
          d="M23.781 17.609c-.472-2.769-3.12-3.496-6.77-3.496-4.99 0-6.492 1.364-6.788 3.494-.081.588.245 1.123.798 1.275.919.253 2.711.562 5.99.562 3.278 0 5.07-.308 5.989-.562.553-.152.881-.688.781-1.273z"
          fill="#fff"
        />
        <path
          d="M17.005 14.498a2.2 2.2 0 100-4.4 2.2 2.2 0 000 4.4zM22.493 17.962c-.382-2.24-2.526-2.83-5.48-2.83-4.04 0-5.256 1.105-5.495 2.83-.066.475.198.908.645 1.031.744.205 2.195.455 4.85.455 2.653 0 4.104-.25 4.848-.455.448-.123.713-.557.632-1.03z"
          fill="#1AAB9B"
        />
      </g>
      <rect
        x={6.55}
        y={4.05}
        width={20.9}
        height={20.9}
        rx={10.45}
        stroke="#6EDBD0"
        strokeWidth={1.1}
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_24106_111273"
        x={0.5}
        y={0.2}
        width={37.4}
        height={37.4}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx={2.2} dy={4.4} />
        <feGaussianBlur stdDeviation={3.85} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.101961 0 0 0 0 0.670588 0 0 0 0 0.607843 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_24106_111273" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_24106_111273" result="shape" />
      </filter>
      <clipPath id="clip0_24106_111273">
        <rect x={8.20312} y={5.69922} width={17.6} height={17.6} rx={8.8} fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);

export default MultiUsersMobile;
