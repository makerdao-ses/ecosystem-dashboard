import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
}

const CircleWithArrow: React.FC<Props> = ({ height = 24, width = 24, className, ...props }) => {
  const { isLight } = useThemeContext();

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={width} height={height} rx={12} fill={isLight ? '#D1DEE6' : '#405361'} />
      <path
        d="M16.934 11.94l.058.06-.058.06-.357.376-3.218 3.383a.567.567 0 01-.831 0 .64.64 0 010-.873l2.215-2.329H7.58c-.325 0-.588-.276-.588-.617 0-.341.263-.617.588-.617h7.163l-2.215-2.329a.64.64 0 010-.873.567.567 0 01.83 0l3.219 3.382.357.376z"
        fill={isLight ? '#231536' : '#D1DEE6'}
      />
    </svg>
  );
};

export default CircleWithArrow;
