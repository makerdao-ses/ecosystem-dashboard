import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const LegacyIcon: React.FC<Props> = ({ className, height = 62, width = 62, ...props }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_21609_263074)">
      <circle cx={29} cy={27} r={24} fill="#ECF1F3" />
      <path
        d="M25.844 39.406h6.187v5.157c0 .569-.461 1.03-1.031 1.03h-4.125c-.57 0-1.031-.461-1.031-1.03v-5.157z"
        fill="#546978"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.355 22.906c-2.654-6.242-5.425-16.5-5.425-16.5s-2.772 10.258-5.426 16.5c-1.79 4.21-4.81 9.61-6.819 13.063h7.438a4.812 4.812 0 019.625 0h7.426c-2.01-3.453-5.028-8.852-6.819-13.063zm7.83 14.782h-26.51c-.298.5-.542.906-.719 1.199-.139.23.03.52.299.52h27.35c.268 0 .437-.29.298-.52-.177-.293-.421-.7-.718-1.2zm-11.187-13.75a2.062 2.062 0 11-4.125 0 2.062 2.062 0 014.125 0zm1.031 0a3.094 3.094 0 11-6.187 0 3.094 3.094 0 016.187 0z"
        fill="#546978"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_21609_263074"
        x={0}
        y={0}
        width={62}
        height={62}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx={2} dy={4} />
        <feGaussianBlur stdDeviation={3.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.101961 0 0 0 0 0.670588 0 0 0 0 0.607843 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_21609_263074" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_21609_263074" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default LegacyIcon;
