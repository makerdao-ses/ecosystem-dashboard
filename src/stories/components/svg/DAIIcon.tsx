import React from 'react';
import type { SVGIconProps } from '@ses/core/utils/typesHelpers';

interface Props {
  backGroundColor?: string;
}

const DAIIcon: React.FC<SVGIconProps & Props> = ({
  width = 24,
  height = 24,
  className,
  backGroundColor = '#FBCC5F',
  fill = 'white',
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20.0002" cy="19.9999" r="16.6667" fill="url(#paint0_linear_18189_196221)" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.6788 12.1511H20.0277C23.8895 12.1511 26.8168 14.2268 27.9058 17.2472H29.8835V19.0728H28.3223C28.3528 19.3613 28.3684 19.6552 28.3684 19.9538V19.9986C28.3684 20.3348 28.3487 20.6653 28.3101 20.9889H29.8835V22.8145H27.8682C26.7505 25.7929 23.8458 27.8488 20.0277 27.8488H13.6788V22.8145H11.4727V20.9889H13.6788V19.0728H11.4727V17.2472H13.6788V12.1511ZM15.4537 22.8145V26.2111H20.0277C22.8502 26.2111 24.9472 24.8508 25.9234 22.8145H15.4537ZM26.4672 20.9889H15.4537V19.0728H26.47C26.5108 19.3743 26.5317 19.6834 26.5317 19.9986V20.0435C26.5317 20.3659 26.5099 20.6816 26.4672 20.9889ZM20.0277 13.7861C22.8632 13.7861 24.9665 15.1824 25.9368 17.2472H15.4537V13.7861H20.0277Z"
      fill={fill}
    />
    <defs>
      <linearGradient
        id="paint0_linear_18189_196221"
        x1="20.0002"
        y1="-1.38897"
        x2="20.0002"
        y2="40.1666"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={backGroundColor} />
        <stop offset="1" stopColor={backGroundColor} />
      </linearGradient>
    </defs>
  </svg>
);

export default DAIIcon;
