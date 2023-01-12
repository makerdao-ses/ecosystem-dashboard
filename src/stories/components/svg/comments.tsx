import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const Comments = ({ fill = '#708390', height = 11, width = 12, ...props }: Props) => (
  <svg width={width} height={height} viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9.077 0H2.923C1.308 0 0 1.226 0 2.74v3.315c0 1.413 1.154 2.58 2.615 2.725l.031 1.932c0 .115.077.202.17.26.046.014.092.028.138.028.061 0 .138-.014.184-.058l2.97-2.148h2.969C10.692 8.794 12 7.57 12 6.055V2.74C12 1.225 10.692 0 9.077 0zm1.217 6.055c0 .68-.68 1.163-1.217 1.163H6c-.061 0-.138.014-.185.057l-1.874 1.39V7.564c0-.159-.138-.289-.307-.289-.856 0-1.928-.54-1.928-1.22V2.74c0-.681.35-1.162 1.217-1.162h6.154c.661 0 1.217.632 1.217 1.162v3.316z"
      fill={fill}
    />
  </svg>
);

export default Comments;
