import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const LogOut = ({ fill = '#231536', width = 16, height = 12, ...props }: Props) => (
  <svg width={width} height={height} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.375 0C1.339 0 .5.768.5 1.714v8.572C.5 11.233 1.34 12 2.375 12h3.75c.518 0 .938-.384.938-.857 0-.474-.42-.857-.938-.857h-3.75V1.714h3.75c.518 0 .938-.383.938-.857 0-.473-.42-.857-.938-.857h-3.75zM15.5 6l-3.75-2.571v1.714H5.187c-.517 0-.937.384-.937.857s.42.857.938.857h6.562v1.714L15.5 6z"
      fill={fill}
    />
  </svg>
);

export default LogOut;
