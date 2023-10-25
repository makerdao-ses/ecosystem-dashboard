import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const ScopeIcon: React.FC<Props> = ({ className, height = 62, width = 62, ...props }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 62 62"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_22049_265685)">
      <circle cx={29} cy={27} r={24} fill="#ECF1F3" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.794 21.51c1.386.64 3.676 1.331 3.676 1.331.406.147.827.253 1.255.317l6.094.904a5.985 5.985 0 013.248 1.586l.786.75.786-.75a5.985 5.985 0 013.249-1.585l6.094-.905c.428-.064.848-.17 1.255-.317 0 0 2.29-.691 3.675-1.33 1.147-.53 2.833-1.556 2.833-1.556l-1.241 1.978a4.987 4.987 0 01-2.526 2.037l-2.063.747a8.476 8.476 0 01-1.64.414l-6.095.905c-.813.12-1.57.49-2.165 1.057l-2.162 2.059-2.162-2.06a3.989 3.989 0 00-2.165-1.056l-6.094-.905a8.476 8.476 0 01-1.641-.414l-2.063-.747a4.987 4.987 0 01-2.526-2.037l-1.241-1.978s1.687 1.027 2.833 1.556z"
        fill="#546978"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.356 17.991c1.179.569 3.09 1.299 3.09 1.299.458.192.938.332 1.428.415l5.017.85a5.984 5.984 0 013.112 1.551l.851.805.852-.805a5.984 5.984 0 013.112-1.552l5.016-.85c.491-.082.97-.222 1.43-.415 0 0 1.91-.729 3.089-1.298 1.154-.557 2.88-1.573 2.88-1.573l-1.269 2.053a4.987 4.987 0 01-2.31 1.978l-1.618.68a8.48 8.48 0 01-1.869.542l-5.016.85a3.99 3.99 0 00-2.075 1.034l-2.222 2.101-2.221-2.1a3.99 3.99 0 00-2.075-1.035l-5.017-.85a8.48 8.48 0 01-1.868-.543l-1.617-.68a4.987 4.987 0 01-2.312-1.977l-1.267-2.053s1.725 1.016 2.88 1.573z"
        fill="#546978"
      />
      <path
        d="M13.997 24.934l-3.216-1.523 2.434 2.306a12.466 12.466 0 005.37 2.997l.655.175a12.466 12.466 0 019.143 10.322l.475 3.398v-8.644a7.106 7.106 0 00-5.877-6.999l-5.804-1.02c-1.1-.193-2.17-.533-3.18-1.012zM43.722 24.934l3.215-1.523-2.433 2.306a12.467 12.467 0 01-5.37 2.997l-.656.175a12.466 12.466 0 00-9.142 10.322l-.475 3.398v-8.644a7.106 7.106 0 015.877-6.999l5.804-1.02c1.1-.193 2.17-.533 3.18-1.012z"
        fill="#546978"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.953 17.664a.175.175 0 00.03.233c.42.364 1.825 1.631 2.368 2.76.247.512.495 1.368.495 1.368s.25-.856.495-1.368c.544-1.129 1.948-2.396 2.37-2.76a.175.175 0 00.028-.233l-2.752-3.903a.172.172 0 00-.281 0l-2.753 3.903zm5.273.012l-2.375-3.366-2.375 3.366h4.75z"
        fill="#546978"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_22049_265685"
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_22049_265685" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_22049_265685" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default ScopeIcon;
