import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  fillDark?: string;
}

const ProfileForum: React.FC<Props> = ({
  width = 23,
  fill = '#9FAFB9',
  height = 23,
  fillDark = '#D1DEE6',
  ...props
}) => {
  const { isLight } = useThemeContext();
  return (
    <svg width={width} height={height} viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 15.85h14.725a2 2 0 002-2V4c.318 0 .698.126.923.351A1.2 1.2 0 0123 5.2V22l-4.8-4.8h-12a1.2 1.2 0 01-.849-.351c-.225-.226-.351-.68-.351-.999z"
        fill={isLight ? fill : fillDark}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 13.333v-12A1.334 1.334 0 0018.667 0H1.333A1.333 1.333 0 000 1.333V20l5.333-5.333h13.334A1.333 1.333 0 0020 13.333zM10 6.8A2.4 2.4 0 1010 2a2.4 2.4 0 000 4.8zm.005.692c3.223 0 5.562.642 5.98 3.087.088.517-.202.99-.69 1.125-.812.224-2.395.496-5.29.496s-4.478-.272-5.29-.496c-.488-.135-.776-.607-.704-1.126.26-1.881 1.587-3.086 5.994-3.086z"
        fill={isLight ? fill : fillDark}
      />
    </svg>
  );
};

export default ProfileForum;
