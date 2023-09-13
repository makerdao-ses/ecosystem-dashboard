import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const MakerDAOLegacyBudgets: React.FC<Props> = ({ height = 64, fill = '#9FAFB9', width = 64, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M27.398 51.5h9V59a1.5 1.5 0 01-1.5 1.5h-6a1.5 1.5 0 01-1.5-1.5v-7.5z" fill={fill} />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M39.79 27.5c-3.86-9.08-7.892-24-7.892-24s-4.032 14.92-7.893 24c-2.604 6.124-6.994 13.977-9.918 19h10.811a7 7 0 1114 0h10.81c-2.924-5.023-7.314-12.876-9.918-19zM51.178 49h-38.56c-.433.727-.789 1.32-1.046 1.744a.5.5 0 00.435.756h39.781a.5.5 0 00.435-.756c-.257-.425-.613-1.017-1.045-1.744zm-16.28-20a3 3 0 11-6 0 3 3 0 016 0zm1.5 0a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
      fill={fill}
    />
  </svg>
);

export default MakerDAOLegacyBudgets;
