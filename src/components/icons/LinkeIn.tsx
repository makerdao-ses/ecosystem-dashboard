import * as React from 'react';
import type { FC } from 'react';

interface Props {
  className?: string;
  fill: string;
}

const LinkedIn: FC<Props> = ({ className, fill = '"#5B646D"', ...props }) => (
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
      d="M4.96 3C3.882 3 3 3.882 3 4.96v6.08C3 12.119 3.882 13 4.96 13h6.08c1.078 0 1.96-.882 1.96-1.96V4.96C13 3.882 12.118 3 11.04 3H4.96zm.492 1.65c.517 0 .835.34.845.785 0 .436-.328.785-.854.785h-.01c-.507 0-.835-.349-.835-.785 0-.446.338-.785.854-.785zm4.453 2.084c.994 0 1.739.65 1.739 2.045v2.606h-1.51v-2.43c0-.612-.219-1.028-.765-1.028-.418 0-.666.28-.775.552-.04.097-.05.232-.05.368v2.538h-1.51s.02-4.118 0-4.544h1.51v.643c.2-.31.56-.75 1.361-.75zm-5.218.107h1.51v4.544h-1.51V6.841z"
      fill={fill}
    />
  </svg>
);

export default LinkedIn;
