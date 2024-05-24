import * as React from 'react';
import { useThemeContext } from '../../core/context/ThemeContext';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
}

const Github = ({ fill = '#231536', height = 19.66, width = 20.15, fillDark = '#D1DEE6', ...props }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <svg width={width} height={height} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.63.592A10.073 10.073 0 00.553 10.667c0 4.454 2.888 8.226 6.89 9.562.5.093.686-.216.686-.488 0-.241-.006-.872-.012-1.713-2.802.606-3.396-1.349-3.396-1.349-.457-1.163-1.12-1.478-1.12-1.478-.914-.625.069-.612.069-.612 1.008.074 1.546 1.039 1.546 1.039.897 1.54 2.357 1.095 2.932.835.093-.65.353-1.095.637-1.349-2.233-.247-4.583-1.113-4.583-4.972 0-1.101.39-1.998 1.039-2.703-.105-.26-.452-1.28.093-2.666 0 0 .847-.272 2.77 1.033a9.778 9.778 0 012.524-.34c.854.006 1.72.117 2.524.34 1.923-1.305 2.77-1.033 2.77-1.033.551 1.385.205 2.412.1 2.666.643.705 1.032 1.602 1.032 2.703 0 3.871-2.356 4.719-4.601 4.972.358.31.686.928.686 1.868 0 1.349-.012 2.431-.012 2.765 0 .272.18.581.693.482 4.001-1.336 6.884-5.108 6.884-9.555C20.705 5.1 16.195.591 10.629.591z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default Github;
