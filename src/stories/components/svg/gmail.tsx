import * as React from 'react';
interface Props {
    width?: number;
    height?: number;
}

const Gmail = ({ height = 32, width = 32, ...props }: Props) => {
  return (
        <svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M24 22h-2v-8.75L15.998 17l-6-3.75V22h-2V10h1.2l6.8 4.25 6.8-4.25H24v12zm0-14H7.997c-1.11 0-2 .89-2 2v12a2 2 0 002 2H24a2 2 0 002-2V10a2 2 0 00-2-2z"
                fill="#C4C4C4"
            />
        </svg>
  );
};
export default Gmail;
