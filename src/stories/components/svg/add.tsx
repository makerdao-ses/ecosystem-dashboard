import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  style?: React.CSSProperties;
}

const AddIcon = ({ fill = '#1AAB9B', height = 12.5, width = 12.94, style = {}, ...props }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      style={style}
    >
      <path
        d="M6.077 12.357c0 .493.414.893.925.893.51 0 .924-.4.924-.893V7.893h4.622c.51 0 .924-.4.924-.893s-.413-.893-.924-.893H7.926V1.643c0-.493-.414-.893-.924-.893s-.925.4-.925.893v4.464H1.456c-.51 0-.925.4-.925.893s.414.893.925.893h4.621v4.464z"
        fill={fill}
      />
    </svg>
  );
};

export default AddIcon;
