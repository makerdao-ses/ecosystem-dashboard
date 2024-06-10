export interface CircleAvatarProps {
  width: string;
  height: string;
  name: string;
  image?: string;
  fontSize?: string;
  identIcon?: boolean;
  onClick?: () => void;
  className?: string;
}
