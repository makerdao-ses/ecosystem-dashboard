import * as React from 'react';
import type { CSSProperties } from 'react';
interface Props {
  width?: number;
  height?: number;
  style?: CSSProperties;
}

export default ({ width = 64, height = 64, ...props }: Props) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    style={props.style}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="mask0_10256_101183" maskUnits="userSpaceOnUse" x="1" y="1" width="62" height="62">
      <rect
        x="2.55469"
        y="2.55566"
        width="58.8889"
        height="58.8889"
        rx="17"
        fill="#C4C4C4"
        stroke="#E7FCFA"
        strokeWidth="2"
      />
    </mask>
    <g mask="url(#mask0_10256_101183)" />
    <rect x="2" y="2" width="60" height="60" rx="30" fill="#D4D9E1" />
    <path
      d="M32.0017 30.2222C35.9292 30.2222 39.1128 27.0385 39.1128 23.1111C39.1128 19.1838 35.9292 16 32.0017 16C28.0744 16 24.8906 19.1838 24.8906 23.1111C24.8906 27.0385 28.0744 30.2222 32.0017 30.2222Z"
      fill="#708390"
    />
    <path
      d="M49.7316 43.7155C48.495 37.2527 41.566 35.5557 32.0144 35.5557C18.957 35.5557 15.0283 38.7394 14.2552 43.7124C14.0418 45.085 14.8946 46.3319 16.3418 46.688C18.7467 47.2798 23.4362 48.0001 32.0144 48.0001C40.5928 48.0001 45.2822 47.2798 47.6871 46.688C49.1344 46.3319 49.9929 45.0811 49.7316 43.7155Z"
      fill="#708390"
    />
    <rect x="2" y="2" width="60" height="60" rx="30" stroke="#9FAFB9" strokeWidth="4" />
  </svg>
);
