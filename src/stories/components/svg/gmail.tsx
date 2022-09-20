import * as React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
}
const Gmail = ({ fill = '#9FAFB9', height = 16, width = 21, fillDark, ...props }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <svg width={width} height={height} viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19 14h-2V5.25L11 9 4.998 5.25V14h-2V2h1.2l6.8 4.25L17.8 2H19v12zm0-14H2.999c-1.11 0-2 .89-2 2v12a2 2 0 002 2h16A2 2 0 0021 14V2a2 2 0 00-2-2z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default Gmail;
