import { useThemeContext } from '@ses/core/context/ThemeContext';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  asSkeleton?: boolean;
}

const EqualSign: React.FC<Props> = ({ height = 15, width = 24, asSkeleton = false, ...props }) => {
  const { isLight } = useThemeContext();
  let fill = isLight ? '#ADAFD4' : '#48495F';
  if (asSkeleton) {
    fill = isLight ? '#ECF1F3' : '#31424E';
  }

  return (
    <svg width={width} height={height} {...props} viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="15.5" width="4" height="24" rx="2" transform="rotate(-90 0 15.5)" fill={fill} />
      <rect y="4.5" width="4" height="24" rx="2" transform="rotate(-90 0 4.5)" fill={fill} />
    </svg>
  );
};

export default EqualSign;
