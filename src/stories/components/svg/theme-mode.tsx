import * as React from 'react';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: () => void;
  fillDark?: string;
}

const MoonMode = ({
  width = 21,
  height = 21,
  fill = '#211634',
  fillDark = '#EDEFFF',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClick = () => {},
  ...props
}: Props) => {
  const isLight = useThemeContext().themeMode === 'light';
  return (
    <svg
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: '2px',
      }}
      width={width}
      height={height}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.619.556a.766.766 0 00-1 1A8.79 8.79 0 017.205 13.32a8.78 8.78 0 01-4.787.166 8.842 8.842 0 01-1.333-.433A.783.783 0 00.06 14.07a10.353 10.353 0 0010.388 6.398 10.349 10.349 0 009.263-7.94A10.308 10.308 0 0013.619.556zm4.567 11.605a8.804 8.804 0 01-6.967 6.619 8.798 8.798 0 01-8.867-3.701 10.389 10.389 0 0012.192-7.753 10.2 10.2 0 00.067-4.46 8.753 8.753 0 013.575 9.295z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default MoonMode;
