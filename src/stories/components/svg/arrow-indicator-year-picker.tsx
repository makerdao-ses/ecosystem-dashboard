import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';
import type { CSSProperties } from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  style?: CSSProperties;
}

const ArrowIndicatorYearPicker = ({ fill = '#139D8D', height = 8, width = 24, style = {}, ...props }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <svg
      style={style}
      width={width}
      height={height}
      viewBox="0 0 24 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0 6a2 2 0 002 2h20a2 2 0 002-2V4.271a2 2 0 00-1.566-1.952l-10-2.223a2 2 0 00-.868 0l-10 2.223A2 2 0 000 4.27V6z"
        fill={isLight ? fill : '#139D8D'}
      />
    </svg>
  );
};

export default ArrowIndicatorYearPicker;
