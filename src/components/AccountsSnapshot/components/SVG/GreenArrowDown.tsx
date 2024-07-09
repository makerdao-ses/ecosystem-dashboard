import { useTheme } from '@mui/material';
import { colorPalette } from '@ses/styles/theme/colorPalette';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const GreenArrowDown: React.FC<Props> = ({ height = 16, width = 16, ...props }) => {
  const isLight = useTheme().palette.isLight;

  return (
    <svg width={width} height={height} {...props} viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        opacity="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0.5C3.58172 0.5 0 4.08172 0 8.5C0 12.9183 3.58172 16.5 8 16.5C12.4183 16.5 16 12.9183 16 8.5C16 4.08172 12.4183 0.5 8 0.5ZM8.01246 13.415C7.45185 13.4268 6.77225 12.6915 6.77225 12.6915L4.2011 9.6273C3.8461 9.20422 3.90128 8.53099 4.32436 8.17599C4.74743 7.82098 5.37819 7.87617 5.73319 8.29924L6.91504 9.70772L6.91504 4.5C6.91504 3.94771 7.44772 3.41504 8 3.41504C8.55228 3.41504 9.12337 3.94771 9.12337 4.5L9.12337 9.70772L10.2339 8.3842C10.5889 7.96113 11.2197 7.90594 11.6428 8.26095C12.0658 8.61595 12.121 9.20422 11.766 9.6273L9.19487 12.6915C9.19487 12.6915 8.5537 13.4037 8.01246 13.415Z"
        fill={isLight ? colorPalette.green[700] : colorPalette.green[900]}
      />
    </svg>
  );
};

export default GreenArrowDown;
