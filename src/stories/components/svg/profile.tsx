import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const Profile = ({ fill = '#231536', height = 12, width = 14.12, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.3 6c1.56 0 2.824-1.343 2.824-3S8.86 0 7.3 0C5.74 0 4.477 1.343 4.477 3S5.74 6 7.3 6zM14.337 10.45c-.49-2.336-3.242-2.95-7.034-2.95C2.118 7.5.558 8.651.25 10.45c-.085.496.254.947.829 1.075.955.214 2.817.475 6.223.475 3.406 0 5.268-.26 6.223-.475.574-.128.915-.58.811-1.074z"
        fill={fill}
      />
    </svg>
  );
};

export default Profile;
