import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

interface Props {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  fill?: string;
  fillDark?: string;
}

const CheckboxOff = ({ height = 12, width = 12, fill = '#9FAFB9', fillDark, ...props }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <svg
      width={width}
      height={height}
      style={props.style}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1" y="1" width="10" height="10" rx="1" stroke={isLight ? fill : fillDark} strokeWidth="2" />
    </svg>
  );
};

export default CheckboxOff;
