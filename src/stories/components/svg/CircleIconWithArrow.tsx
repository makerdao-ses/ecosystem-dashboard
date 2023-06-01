import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  onClick?: () => void;
}

const CircleIconWithArrow: React.FC<Props> = ({ height = 25, width = 24, onClick, ...props }) => {
  const { isLight } = useThemeContext();
  return (
    <svg
      onClick={onClick}
      cursor={onClick ? 'pointer' : 'default'}
      width={width}
      height={height}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.268 6.764a.924.924 0 011.293 0l4.525 4.461.646.638a.892.892 0 010 1.274l-.646.638-4.525 4.461a.924.924 0 01-1.293 0 .892.892 0 010-1.275l4.525-4.461-4.525-4.461a.892.892 0 010-1.275z"
        fill={isLight ? '#9FAFB9' : 'red'}
      />
      <rect x={0.5} y={1} width={23} height={23} rx={11.5} stroke={isLight ? '#9FAFB9' : 'red'} />
    </svg>
  );
};

export default CircleIconWithArrow;
