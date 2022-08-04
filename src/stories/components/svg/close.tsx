import React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface CloseProps {
  width?: number;
  height?: number;
  fill?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  fillDark?: string;
}

export const Close = ({ fill = '#231536', width = 20, height = 20, fillDark = '#EDEFFF', ...props }: CloseProps) => {
  const isLight = useThemeContext().themeMode === 'light';
  return <svg
    width={width}
    height={height}
    viewBox="0 0 20 20"
    fill="none"
    style={props.style}
    onClick={props.onClick}
    xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.7437 19.441C17.4886 20.1858 18.6963 20.1858 19.4412 19.441C20.186 18.6961 20.186 17.4884 19.4412 16.7435L12.6977 10.0001L19.4414 3.25643C20.1862 2.51155 20.1862 1.30384 19.4414 0.558956C18.6965 -0.185937 17.4887 -0.185937 16.7438 0.558956L10.0002 7.30259L3.25617 0.55867C2.51129 -0.186223 1.30356 -0.186223 0.558675 0.55867C-0.186225 1.30355 -0.186225 2.51126 0.558675 3.25614L7.30266 10.0001L0.558828 16.7438C-0.186069 17.4887 -0.186069 18.6963 0.558828 19.4414C1.30371 20.1862 2.51144 20.1862 3.25632 19.4414L10.0002 12.6975L16.7437 19.441Z"
      fill={isLight ? fill : fillDark} />
  </svg>;
};
