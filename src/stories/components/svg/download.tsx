import React from 'react';

interface DownloadProps {
  width?: number,
  height?: number,
  fill?: string
}

export const Download = ({ fill = '#447AFB', width = 20, height = 20 }: DownloadProps) => {
  return <svg width={width} height={height} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M0 17.5C0 18.8807 1.02335 20 2.28571 20L17.7143 20C18.9767 20 20 18.8807 20 17.5V12.5C20 11.8097 19.4883 11.25 18.8571 11.25C18.2259 11.25 17.7143 11.8097 17.7143 12.5V17.5L2.28571 17.5L2.28571 12.5C2.28571 11.8097 1.77403 11.25 1.14286 11.25C0.51168 11.25 0 11.8097 0 12.5L0 17.5Z"
          fill={fill}/>
    <path
      d="M14.4287 10L10.0001 16L5.57157 10L8.85728 10L8.85728 1.25C8.85728 0.55965 9.36894 -2.2117e-07 10.0001 -1.93579e-07C10.6313 -1.65989e-07 11.143 0.55965 11.143 1.25L11.143 10L14.4287 10Z"
      fill={fill}/>
  </svg>;
};
