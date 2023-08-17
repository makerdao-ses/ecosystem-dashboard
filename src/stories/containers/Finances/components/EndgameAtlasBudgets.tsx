import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const EndgameAtlasBudgets: React.FC<Props> = ({ height = 64, width = 64, className, ...props }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path fill="#E5E5E5" d="M0 0H64V64H0z" />
    <g clipPath="url(#clip0_1588_8778)">
      <path transform="translate(-240 -673)" fill="#fff" d="M0 0H1440V4765H0z" />
      <g filter="url(#filter0_dd_1588_8778)">
        <rect x={-176} y={-16} width={416} height={235} rx={6} fill="#fff" />
        <g clipPath="url(#clip1_1588_8778)">
          <path d="M58.3 36.947a37.491 37.491 0 01-53.021 0l26.51-26.51 26.51 26.51z" fill="#fff" />
          <mask
            id="a"
            style={{
              maskType: 'alpha',
            }}
            maskUnits="userSpaceOnUse"
            x={5}
            y={10}
            width={54}
            height={38}
          >
            <path d="M58.3 36.947a37.491 37.491 0 01-53.021 0l26.51-26.51 26.51 26.51z" fill="#D9D9D9" />
          </mask>
          <g mask="url(#a)" fill="#fff">
            <mask id="b">
              <path d="M58.3 27.482a37.491 37.491 0 01-53.021 0L31.789.972l26.51 26.51z" />
            </mask>
            <path
              d="M58.3 27.482a37.491 37.491 0 01-53.021 0L31.789.972l26.51 26.51z"
              stroke="#546978"
              strokeWidth={2.17341}
              mask="url(#b)"
            />
            <g>
              <mask id="c">
                <path d="M58.3 15.3a37.495 37.495 0 01-40.858 8.128A37.495 37.495 0 015.279 15.3l26.51-26.51L58.3 15.3z" />
              </mask>
              <path
                d="M58.3 15.3a37.495 37.495 0 01-40.858 8.128A37.495 37.495 0 015.279 15.3l26.51-26.51L58.3 15.3z"
                stroke="#546978"
                strokeWidth={2.17341}
                mask="url(#c)"
              />
            </g>
          </g>
          <path
            d="M58.3 37.49s-14.554 5.385-19.227 8.671c-5.724 4.026-7.284 6.386-7.284 6.386s-1.56-2.36-7.284-6.386c-4.672-3.286-19.226-8.67-19.226-8.67"
            stroke="#546978"
            strokeWidth={2.71676}
            strokeLinecap="round"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.47 43.581l13.311 8.694 13.312-8.694 13.632-6.173c.36-.163.767.1.767.495v3.553c0 .198-.108.38-.282.476l-27.429 15.06-27.429-15.06a.543.543 0 01-.282-.476v-3.553c0-.395.408-.657.768-.495l13.631 6.173z"
            fill="#546978"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3.805 37.904a.815.815 0 011.15-.743l13.651 6.182 13.181 8.608 13.181-8.608 13.65-6.182a.815.815 0 011.152.743v4.64a.815.815 0 01-.423.714l-27.56 15.13-27.56-15.13a.815.815 0 01-.422-.715v-4.64zm.927-.248a.272.272 0 00-.384.248v4.64c0 .098.054.19.141.237L31.787 57.77 59.086 42.78a.272.272 0 00.14-.238v-4.64a.272.272 0 00-.383-.247L45.23 43.821 31.787 52.6l-13.443-8.78-13.612-6.164z"
            fill="#546978"
          />
          <path
            d="M41.492 44.478l-9.191-32.245c-.15-.523-.889-.527-1.044-.006l-9.55 32.147"
            stroke="#546978"
            strokeWidth={2.17341}
          />
          <path
            d="M58.3 36.948L32.941 11.59a1.63 1.63 0 00-2.306 0L5.28 36.948"
            stroke="#546978"
            strokeWidth={2.71676}
            strokeLinecap="round"
          />
        </g>
        <rect x={-175.5} y={-15.5} width={415} height={234} rx={5.5} stroke="#D4D9E1" strokeOpacity={0.15} />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_dd_1588_8778"
        x={-216}
        y={-36}
        width={496}
        height={315}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy={1} />
        <feGaussianBlur stdDeviation={1.5} />
        <feColorMatrix values="0 0 0 0 0.746725 0 0 0 0 0.746725 0 0 0 0 0.746725 0 0 0 0.25 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1588_8778" />
        <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
        <feOffset dy={20} />
        <feGaussianBlur stdDeviation={20} />
        <feColorMatrix values="0 0 0 0 0.858824 0 0 0 0 0.890196 0 0 0 0 0.929412 0 0 0 0.4 0" />
        <feBlend in2="effect1_dropShadow_1588_8778" result="effect2_dropShadow_1588_8778" />
        <feBlend in="SourceGraphic" in2="effect2_dropShadow_1588_8778" result="shape" />
      </filter>
      <clipPath id="clip0_1588_8778">
        <path fill="#fff" transform="translate(-240 -673)" d="M0 0H1440V4765H0z" />
      </clipPath>
      <clipPath id="clip1_1588_8778">
        <path fill="#fff" d="M0 0H64V64H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default EndgameAtlasBudgets;
