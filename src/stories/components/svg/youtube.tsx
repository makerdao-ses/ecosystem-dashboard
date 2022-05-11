import * as React from 'react';
interface Props {
  width?: number;
  height?: number;
  fill?: string;
}

const Youtube = ({
  width = 21,
  height = 14,
  fill = '#C4C4C4',
}: Props) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M7.93695 9.5838V3.99017L13.34 6.79694L7.93695 9.5838ZM19.802 3.02174C19.802 3.02174 19.607 1.64921 19.007 1.04505C18.247 0.252789 17.394 0.248808 17.003 0.202029C14.205 0.000976696 10.006 0.000976562 10.006 0.000976562H9.99795C9.99795 0.000976562 5.79995 0.000976696 3.00095 0.202029C2.60995 0.248808 1.75795 0.251794 0.996953 1.04505C0.396953 1.64921 0.201953 3.02174 0.201953 3.02174C0.201953 3.02174 0.00195312 4.63214 0.00195312 6.24355V7.75343C0.00195312 9.36384 0.201953 10.9752 0.201953 10.9752C0.201953 10.9752 0.396953 12.3468 0.996953 12.9509C1.75695 13.7442 2.75695 13.7183 3.20195 13.8019C4.80195 13.9542 10.002 14.001 10.002 14.001C10.002 14.001 14.205 13.995 17.003 13.794C17.394 13.7472 18.247 13.7442 19.007 12.9509C19.607 12.3468 19.802 10.9752 19.802 10.9752C19.802 10.9752 20.002 9.36384 20.002 7.75343V6.24355C20.002 4.63214 19.802 3.02174 19.802 3.02174Z" fill={fill}/>
    </svg>

  );
};

export default Youtube;
