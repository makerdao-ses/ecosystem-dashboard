import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface ThreeDotsProps {
  width?: number;
  height?: number;
  fill?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  fillDark?: string
}

export const ThreeDots = ({ fill = '#231536', width = 6, height = 21, fillDark = '#EDEFFF', ...props }: ThreeDotsProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <svg
    width={width}
    height={height}
    viewBox="0 0 6 21"
    fill="none"
    style={props.style}
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.5 3C5.5 1.61929 4.38071 0.5 3 0.5C1.61929 0.5 0.5 1.61929 0.5 3C0.5 4.38071 1.61929 5.5 3 5.5C4.38071 5.5 5.5 4.38071 5.5 3ZM3 8C4.38071 8 5.5 9.11929 5.5 10.5C5.5 11.8807 4.38071 13 3 13C1.61929 13 0.5 11.8807 0.5 10.5C0.5 9.11929 1.61929 8 3 8ZM3 15.5C4.38071 15.5 5.5 16.6192 5.5 18C5.5 19.3808 4.38071 20.5 3 20.5C1.61929 20.5 0.5 19.3808 0.5 18C0.5 16.6192 1.61929 15.5 3 15.5Z"
      fill={isLight ? fill : fillDark} />
  </svg>;
};
