import React, { CSSProperties } from 'react';

interface Props {
  width?: number;
  height?: number;
  style?: CSSProperties;
  fill?: string;
}

const Magnifier = ({ width = 20, height = 20, fill = '#25273D', ...props }: Props) => {
  return (
    <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.949 11.9475C14.0629 9.83367 14.0629 6.40638 11.949 4.29249C9.83512 2.17861 6.40779 2.17861 4.29389 4.29249C2.17998 6.40638 2.17998 9.83367 4.29389 11.9475C6.40779 14.0614 9.83512 14.0614 11.949 11.9475ZM13.8628 13.8613C17.0337 10.6905 17.0337 5.54956 13.8628 2.37874C10.6919 -0.792099 5.55096 -0.792098 2.3801 2.37874C-0.790762 5.54956 -0.790762 10.6905 2.3801 13.8613C5.55096 17.0321 10.6919 17.0321 13.8628 13.8613Z"
        fill={fill}
      />
      <path
        d="M10.9922 12.9045L12.906 10.9907L19.6042 17.6889C20.1327 18.2174 20.1327 19.0742 19.6042 19.6027C19.0758 20.1311 18.2188 20.1311 17.6905 19.6027L10.9922 12.9045Z"
        fill={fill}
      />
    </svg>
  );
};

export default Magnifier;
