import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';
import type { CSSProperties } from 'react';
interface Props {
  width?: number;
  height?: number;
  style?: CSSProperties;
}

export default ({ width = 64, height = 64, ...props }: Props) => {
  const { isLight } = useThemeContext();

  return isLight ? (
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
  ) : (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="22" height="22" rx="11" fill="#708390" />
      <path
        d="M11.9997 11.3333C13.4725 11.3333 14.6663 10.1394 14.6663 8.66667C14.6663 7.19391 13.4725 6 11.9997 6C10.5269 6 9.33301 7.19391 9.33301 8.66667C9.33301 10.1394 10.5269 11.3333 11.9997 11.3333Z"
        fill="#405361"
      />
      <path
        d="M18.6489 16.3932C18.1851 13.9697 15.5868 13.3333 12.0049 13.3333C7.10837 13.3333 5.63513 14.5272 5.34521 16.3921C5.26518 16.9068 5.58498 17.3744 6.1277 17.508C7.02954 17.7299 8.78808 18 12.0049 18C15.2218 18 16.9803 17.7299 17.8822 17.508C18.4249 17.3744 18.7469 16.9053 18.6489 16.3932Z"
        fill="#405361"
      />
      <rect x="1" y="1" width="22" height="22" rx="11" stroke="#546978" stroke-width="2" />
    </svg>
  );
};
