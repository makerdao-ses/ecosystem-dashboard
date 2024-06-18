import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
}

const RedArrowUp: React.FC<Props> = ({ height = 16, width = 16, ...props }) => (
  <svg width={width} height={height} {...props} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.3"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM7.98754 3.08496C8.54815 3.07318 9.22775 3.80852 9.22775 3.80852L11.7989 6.8727C12.1539 7.29578 12.0987 7.96901 11.6756 8.32401C11.2526 8.67902 10.6218 8.62383 10.2668 8.20076L9.08496 6.79228V12C9.08496 12.5523 8.55228 13.085 8 13.085C7.44772 13.085 6.87663 12.5523 6.87663 12L6.87663 6.79228L5.76607 8.1158C5.41107 8.53887 4.78031 8.59406 4.35724 8.23905C3.93416 7.88405 3.87898 7.29578 4.23398 6.8727L6.80513 3.80852C6.80513 3.80852 7.4463 3.09634 7.98754 3.08496Z"
      fill={'#F77249'}
    />
  </svg>
);

export default RedArrowUp;
