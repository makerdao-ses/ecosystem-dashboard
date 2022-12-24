import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface BreadcrumbSeparatorProps {
  width?: number;
  height?: number;
  fill?: string;
  style?: React.CSSProperties;
  fillDark?: string;
}

export const BreadcrumbSeparator = ({
  fill = '#D1DEE6',
  fillDark,
  width = 10,
  height = 20,
  style = {},
}: BreadcrumbSeparatorProps) => {
  const { isLight } = useThemeContext();
  return (
    <svg style={style} width={width} height={height} viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.382524 0.439986C0.892556 -0.146662 1.71948 -0.146662 2.22952 0.439986L8.69398 7.87553L9.61747 8.93776C10.1275 9.5244 10.1275 10.4756 9.61747 11.0622L8.69398 12.1244L2.22952 19.5599C1.71948 20.1467 0.892557 20.1467 0.382524 19.5599C-0.127508 18.9733 -0.127508 18.0221 0.382524 17.4355L6.84699 9.99998L0.382524 2.56443C-0.127508 1.97779 -0.127508 1.02663 0.382524 0.439986Z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};
