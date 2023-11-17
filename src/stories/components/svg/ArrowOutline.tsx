import Link from 'next/link';
import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  className?: string;
  href: string;
}

const ArrowOutline: React.FC<Props> = ({ className, height = 28, width = 40, href, ...props }) => (
  <Link href={href} legacyBehavior>
    <svg
      cursor="pointer"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M24.934 13.94l.058.06-.058.06-.357.376-3.218 3.383a.567.567 0 01-.831 0 .64.64 0 010-.873l2.215-2.329H15.58c-.325 0-.588-.276-.588-.617 0-.341.263-.617.588-.617h7.163l-2.215-2.329a.64.64 0 010-.873.567.567 0 01.83 0l3.219 3.382.357.376z"
        fill="#231536"
      />
      <rect x={0.5} y={0.5} width={39} height={27} rx={13.5} stroke="#D4D9E1" />
    </svg>
  </Link>
);

export default ArrowOutline;
