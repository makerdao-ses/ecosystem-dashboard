import * as React from 'react';
import type { FC } from 'react';

interface Props {
  className?: string;
  fill: string;
}

const XSocialNetwork: FC<Props> = ({ className, fill = '"#5B646D"', ...props }) => (
  <svg
    className={className}
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.137 1.5h2.205L9.524 7.007l5.668 7.493h-4.439L7.277 9.955 3.3 14.5H1.093l5.154-5.89L.81 1.5h4.55l3.142 4.154L12.137 1.5zm-.774 11.68h1.222L4.697 2.75H3.385l7.978 10.43z"
      fill={fill}
    />
  </svg>
);

export default XSocialNetwork;
