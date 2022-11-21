import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const Warning = ({ fill = '#F77249', width = 20, height = 20, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.793 8.142c0-.68.54-1.232 1.208-1.232a1.22 1.22 0 011.208 1.232v2.464c0 .68-.541 1.232-1.208 1.232a1.22 1.22 0 01-1.208-1.232V8.142zM10 13.07a1.22 1.22 0 00-1.207 1.232c0 .68.54 1.232 1.208 1.232a1.22 1.22 0 001.208-1.232c0-.68-.541-1.232-1.208-1.232z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.903 2.01a2.392 2.392 0 014.194 0l7.581 13.534c.92 1.643-.242 3.687-2.097 3.687H2.419c-1.855 0-3.017-2.044-2.097-3.687L7.902 2.01zm9.678 14.757L10 3.232 2.42 16.767h15.16z"
        fill={fill}
      />
    </svg>
  );
};

export default Warning;
