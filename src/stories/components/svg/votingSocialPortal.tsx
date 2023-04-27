import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
}

const VotingSocialPortal: React.FC<Props> = ({
  fill = '#708390',
  height = 20,
  width = 22,
  fillDark = '#D1DEE6',
  ...props
}) => {
  const { isLight } = useThemeContext();
  return (
    <svg width={width} height={height} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M20.172 5.777V1.062M15.54 1.063h4.634"
        stroke={isLight ? fill : fillDark}
        strokeWidth={2.10642}
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.106 4.95A2.106 2.106 0 000 7.055V17.89c0 1.163.943 2.106 2.106 2.106h11.636a2.106 2.106 0 002.107-2.106V7.056a2.106 2.106 0 00-2.107-2.107H2.107zm.432 8.046a1.222 1.222 0 01-.055-1.706 1.172 1.172 0 011.677-.055l2.08 2.186 5.517-5.612a1.172 1.172 0 011.678 0 1.222 1.222 0 010 1.707l-7.14 7.264-3.757-3.784zM20.694 1.813a1.075 1.075 0 000-1.502 1.032 1.032 0 00-1.477 0l-3.647 3.71a2.11 2.11 0 011.314 1.654c.037-.029.073-.06.106-.094l3.704-3.768z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default VotingSocialPortal;
