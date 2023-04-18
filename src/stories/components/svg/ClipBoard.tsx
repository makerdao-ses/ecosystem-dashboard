import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const ClipBoard: React.FC<Props> = ({ fill = '#9FAFB9', height = 17, width = 17, ...props }) => (
  <svg width={width} height={height} viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.418 5.752c0-.829.69-1.5 1.541-1.5h5.394c.852 0 1.542.671 1.542 1.5v6.75c0 .828-.69 1.5-1.542 1.5H6.96c-.851 0-1.541-.672-1.541-1.5v-6.75zm6.935 0H6.96v6.75h5.394v-6.75z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.105 3.502c0-.829.69-1.5 1.542-1.5h6.165v1.5H4.647v7.5H3.105v-7.5z"
      fill={fill}
    />
  </svg>
);

export default ClipBoard;
