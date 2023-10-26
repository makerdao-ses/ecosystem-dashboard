import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const AtlasIcon: React.FC<Props> = ({ className, height = 61, width = 62, ...props }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 62 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_22414_191754)">
      <ellipse cx={29} cy={26.5} rx={24} ry={23.5} fill="#ECF1F3" />
      <g clipPath="url(#clip0_22414_191754)">
        <mask
          id="a"
          style={{
            maskType: 'alpha',
          }}
          maskUnits="userSpaceOnUse"
          x={10}
          y={10}
          width={38}
          height={26}
        >
          <path d="M47.085 28.4a25.778 25.778 0 01-36.452 0L28.86 10.176 47.085 28.4z" fill="#D9D9D9" />
        </mask>
        <g mask="url(#a)">
          <mask id="b" fill="#fff">
            <path d="M47.085 21.893a25.776 25.776 0 01-36.452 0L28.86 3.668l18.226 18.226z" />
          </mask>
          <path
            d="M47.085 21.893a25.776 25.776 0 01-36.452 0L28.86 3.668l18.226 18.226z"
            stroke="#546978"
            strokeWidth={1.49422}
            mask="url(#b)"
          />
          <mask id="c" fill="#fff">
            <path d="M47.085 13.519a25.775 25.775 0 01-36.452 0L28.86-4.707l18.226 18.226z" />
          </mask>
          <path
            d="M47.085 13.519a25.775 25.775 0 01-36.452 0L28.86-4.707l18.226 18.226z"
            stroke="#546978"
            strokeWidth={1.49422}
            mask="url(#c)"
          />
        </g>
        <path
          d="M47.077 28.774s-10.005 3.702-13.218 5.961c-3.935 2.768-5.007 4.39-5.007 4.39s-1.073-1.622-5.008-4.39c-3.213-2.26-13.218-5.96-13.218-5.96"
          stroke="#546978"
          strokeWidth={1.86777}
          strokeLinecap="round"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.696 32.962l9.152 5.976L38 32.962l9.372-4.244a.374.374 0 01.528.34v2.443a.374.374 0 01-.194.327L28.848 42.181 9.991 31.828a.374.374 0 01-.194-.327v-2.443c0-.271.28-.452.527-.34l9.372 4.244z"
          fill="#546978"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.617 29.058a.56.56 0 01.792-.51l9.384 4.25 9.062 5.917 9.062-5.918 9.385-4.25a.56.56 0 01.791.511v3.19a.56.56 0 01-.29.49L28.855 43.142 9.908 32.74a.56.56 0 01-.29-.491v-3.19zm.638-.17a.187.187 0 00-.264.17v3.19c0 .068.037.13.097.163l18.767 10.304 18.768-10.304a.187.187 0 00.097-.163v-3.19a.187.187 0 00-.264-.17l-9.359 4.238-9.242 6.036-9.242-6.036-9.358-4.238z"
          fill="#546978"
        />
        <path
          d="M35.523 33.578l-6.32-22.169c-.102-.36-.61-.362-.717-.004L21.92 33.506"
          stroke="#546978"
          strokeWidth={1.49422}
        />
        <path
          d="M47.077 28.4L29.644 10.968a1.12 1.12 0 00-1.585 0L10.626 28.401"
          stroke="#546978"
          strokeWidth={1.86777}
          strokeLinecap="round"
        />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_22414_191754"
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_22414_191754" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_22414_191754" result="shape" />
      </filter>
      <clipPath id="clip0_22414_191754">
        <rect x={7} y={3} width={44} height={44} rx={20} fill="#fff" />
      </clipPath>
    </defs>
  </svg>
);

export default AtlasIcon;
