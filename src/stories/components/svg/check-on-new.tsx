import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
  fillBorderArrow?: string;
}

const CheckOnComponent = ({
  fill = '#1AAB9B',
  height = 12,
  width = 12,
  fillDark = '#1AAB9B',
  fillBorderArrow = 'transparent',
  ...props
}: Props) => {
  const { isLight } = useThemeContext();
  return (
    <svg width={width} height={height} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M0 3C0 1.34315 1.34315 0 3 0H13C14.6569 0 16 1.34315 16 3V13C16 14.6569 14.6569 16 13 16H3C1.34315 16 0 14.6569 0 13V3Z"
        fill={fillBorderArrow}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 .5A1.5 1.5 0 00.5 2v9A1.5 1.5 0 002 12.5h9a1.5 1.5 0 001.5-1.5V2A1.5 1.5 0 0011 .5H2zm8.053 4.257a.75.75 0 00-1.106-1.014L5.402 7.611 4.076 6.02a.75.75 0 10-1.152.96l1.875 2.25a.75.75 0 001.129.027l4.125-4.5z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default CheckOnComponent;
