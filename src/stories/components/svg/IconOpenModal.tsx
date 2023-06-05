import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  onClick?: () => void;
}

const IconOpenModal: React.FC<Props> = ({ height = 17, width = 16, onClick, ...props }) => {
  const { isLight } = useThemeContext();
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      onClick={onClick}
      cursor={onClick ? 'pointer' : 'default'}
    >
      <rect
        x={0.727273}
        y={5.79881}
        width={9.97404}
        height={9.97402}
        rx={0.727273}
        fill={isLight ? '#9FAFB9' : 'red'}
        stroke={isLight ? '#9FAFB9' : 'red'}
        strokeWidth={1.45455}
      />
      <rect
        x={3.15696}
        y={1.22727}
        width={12.1141}
        height={12.1141}
        rx={0.727273}
        fill={isLight ? '#fff' : 'red'}
        stroke={isLight ? '#fff' : 'red'}
        strokeWidth={1.45455}
      />
      <rect
        x={4.15696}
        y={1.22727}
        width={11.1169}
        height={11.1169}
        rx={0.727273}
        fill={isLight ? '#fff' : 'red'}
        stroke={isLight ? '#9FAFB9' : 'red'}
        strokeWidth={1.45455}
      />
    </svg>
  );
};

export default IconOpenModal;
