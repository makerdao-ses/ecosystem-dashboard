import * as React from 'react';
import type { FC } from 'react';

interface Props {
  className?: string;
}

const LinkSvg: FC<Props> = ({ className, ...props }) => (
  <svg
    className={className}
    width={21}
    height={22}
    viewBox="0 0 21 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.042 5.458a3.484 3.484 0 00-4.927 0L8.652 7.92a3.483 3.483 0 000 4.926.87.87 0 001.232-1.231l-.014-.014a1.742 1.742 0 01.014-2.45l2.463-2.463a1.742 1.742 0 012.463 2.464l-.872.872a4.37 4.37 0 01.257 2.206l1.847-1.847a3.484 3.484 0 000-4.926zM4.958 16.542a3.484 3.484 0 004.926 0l2.464-2.463a3.484 3.484 0 000-4.927.871.871 0 00-1.232 1.232c.68.68.68 1.783 0 2.463l-2.463 2.464a1.742 1.742 0 01-2.464-2.464l.873-.872a4.37 4.37 0 01-.257-2.206l-1.847 1.847a3.484 3.484 0 000 4.926z"
      fill="#B6BCC2"
    />
  </svg>
);

export default LinkSvg;
