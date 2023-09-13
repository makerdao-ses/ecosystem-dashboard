import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
  fill?: string;
}

const EndgameAtlasBudgets: React.FC<Props> = ({ height = 64, fill = '#9FAFB9', width = 64, className, ...props }) => (
  <svg
    className={className}
    width={height}
    height={width}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_24608_226984)">
      <path d="M19.003 23s5 2.5 12.5 2.5 12.5-2 12.5-2M12.003 31.5s7 6 19.5 6 20.5-6 20.5-6" stroke={fill} />
      <path
        d="M58.3 37.49s-14.554 5.385-19.227 8.671c-5.724 4.026-7.284 6.386-7.284 6.386s-1.56-2.36-7.284-6.386c-4.672-3.286-19.226-8.67-19.226-8.67"
        stroke={fill}
        strokeWidth={2.71676}
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.467 43.581l13.312 8.694 13.313-8.694 13.63-6.173c.36-.163.768.1.768.495v3.553c0 .198-.108.38-.282.476L31.78 56.992 4.35 41.931a.543.543 0 01-.282-.476v-3.553c0-.395.408-.657.768-.495l13.631 6.173z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.8 37.906a.815.815 0 011.152-.743l13.65 6.182 13.181 8.608 13.181-8.608 13.65-6.182a.815.815 0 011.152.743v4.64a.815.815 0 01-.423.714l-27.56 15.13-27.56-15.13a.815.815 0 01-.422-.715v-4.64zm.928-.248a.272.272 0 00-.384.248v4.64c0 .098.054.19.141.237l27.298 14.988 27.299-14.988a.272.272 0 00.14-.238v-4.64a.272.272 0 00-.383-.247l-13.612 6.164-13.444 8.78-13.443-8.78-13.612-6.164z"
        fill={fill}
      />
      <path
        d="M41.492 44.478l-9.191-32.245c-.15-.523-.889-.527-1.044-.006l-9.55 32.147"
        stroke={fill}
        strokeWidth={2.17341}
      />
      <path
        d="M58.3 36.948L32.941 11.59a1.63 1.63 0 00-2.306 0L5.28 36.948"
        stroke={fill}
        strokeWidth={2.71676}
        strokeLinecap="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_24608_226984">
        <path fill="#fff" d="M0 0H64V64H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default EndgameAtlasBudgets;
