import type { CSSProperties } from 'react';

export interface CircleAvatarProps {
  width: string;
  height: string;
  name: string;
  image?: string;
  fontSize?: string;
  style?: CSSProperties;
  imageStyle?: CSSProperties;
  identIcon?: boolean;
  border?: string;
  onClick?: () => void;
  className?: string;
}
