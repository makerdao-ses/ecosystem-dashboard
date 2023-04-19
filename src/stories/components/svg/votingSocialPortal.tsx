import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
}

const VotingSocialPortal: React.FC<Props> = ({
  fill = '#9FAFB9',
  height = 22,
  width = 23,
  fillDark = '#D1DEE6',
  ...props
}) => {
  const { isLight } = useThemeContext();
  return (
    <svg width={width} height={height} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.005.752L9.755.729a1.25 1.25 0 00-.005 2.5l8.232.017L16.21 5.01a2 2 0 011.777 1.758l1.759-1.752-.017 8.232a1.25 1.25 0 002.5.006l.023-11.25A1.25 1.25 0 0021.005.752zm-5.019 8.01a2 2 0 00-1.784-1.752l-6.194 6.17a2 2 0 001.731 1.803l6.247-6.221z"
        fill={isLight ? fill : fillDark}
      />
      <path
        d="M7.026 10.94a1.25 1.25 0 00-1.767 1.768l1.767-1.768zm.72 4.255l.883.883 1.768-1.767-.884-.884-1.768 1.768zm-2.487-2.487l2.486 2.486 1.768-1.767-2.487-2.487-1.767 1.768z"
        fill={isLight ? fill : fillDark}
      />
      <path
        d="M17.747 16.004v3.032c0 .5-.405.905-.905.905H2.905A.905.905 0 012 19.036V5.1c0-.5.405-.905.905-.905h3.032"
        stroke={fill}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default VotingSocialPortal;
