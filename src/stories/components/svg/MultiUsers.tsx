import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const MultiUsers: React.FC<Props> = ({ fill = '#fff', height = 34, width = 34, className, ...props }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_22641_222284)">
      <rect x={5} y={3} width={20} height={20} rx={10} fill={fill} shapeRendering="crispEdges" />
      <path
        d="M11.25 11.063a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM14.99 13.425c-.26-1.528-1.722-1.929-3.737-1.929-2.754 0-3.583.753-3.746 1.929-.045.324.135.619.44.703.507.14 1.496.31 3.306.31s2.799-.17 3.306-.31a.606.606 0 00.431-.703zM18.75 11.063a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#447AFB"
      />
      <path
        d="M22.49 13.425c-.26-1.528-1.722-1.929-3.737-1.929-2.754 0-3.583.753-3.746 1.929-.045.324.135.619.44.703.507.14 1.497.31 3.306.31 1.81 0 2.799-.17 3.306-.31a.606.606 0 00.431-.703z"
        fill="#447AFB"
      />
      <path d="M15 14a3 3 0 100-6 3 3 0 000 6z" fill="#fff" />
      <path
        d="M21.157 15.832c-.43-2.517-2.837-3.178-6.155-3.178-4.537 0-5.902 1.24-6.17 3.177-.075.534.222 1.02.725 1.159.835.23 2.464.51 5.445.51 2.98 0 4.61-.28 5.445-.51.503-.14.8-.626.71-1.158z"
        fill="#fff"
      />
      <path
        d="M15 13a2 2 0 100-4 2 2 0 000 4zM19.987 16.148c-.348-2.037-2.297-2.572-4.983-2.572-3.672 0-4.777 1.004-4.995 2.572-.06.432.18.825.587.938.676.186 1.995.413 4.408.413 2.413 0 3.731-.227 4.408-.413.407-.113.648-.507.575-.938z"
        fill="#447AFB"
      />
      <rect x={5.5} y={3.5} width={19} height={19} rx={9.5} stroke="#85A9FF" shapeRendering="crispEdges" />
    </g>
    <defs>
      <filter
        id="filter0_d_22641_222284"
        x={0}
        y={0}
        width={34}
        height={34}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dx={2} dy={4} />
        <feGaussianBlur stdDeviation={3.5} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.101961 0 0 0 0 0.670588 0 0 0 0 0.607843 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_22641_222284" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_22641_222284" result="shape" />
      </filter>
    </defs>
  </svg>
);

export default MultiUsers;
