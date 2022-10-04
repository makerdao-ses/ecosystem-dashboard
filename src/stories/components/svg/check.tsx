import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

export default ({ height = 16, width = 16, fill = '#231536' }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6963 4.19046C13.059 4.47661 13.1031 4.98149 12.7947 5.31813L6.93271 11.7181C6.77032 11.8954 6.53279 11.9983 6.28205 12C6.03131 12.0016 5.79222 11.9019 5.6271 11.7268L3.21331 9.16681C2.89979 8.8343 2.9361 8.32889 3.29441 8.03794C3.65271 7.747 4.19734 7.78069 4.51085 8.1132L6.26641 9.97509L11.4811 4.28189C11.7894 3.94525 12.3335 3.90432 12.6963 4.19046Z"
        fill={fill}
      />
    </svg>
  );
};
