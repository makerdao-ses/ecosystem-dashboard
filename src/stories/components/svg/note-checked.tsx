import * as React from 'react';

interface Props {
  width?: number;
  height?: number;
  fill?: string;
  background?: string;
}

const NoteChecked = ({ fill = '#1AAB9B', background = '#E7FCFA', height = 32, width = 32, ...props }: Props) => {
  return (
    <svg width={width} height={height} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width={width} height={height} rx="11" fill={background} />
      <path
        d="M11.2314 6C9.19217 6 7.53906 7.70132 7.53906 9.8V18.6679C7.53906 22.165 10.374 25 13.8712 25H16.1544V22.4667H13.1667C11.4181 22.4667 10.0006 21.0492 10.0006 19.3006V9.8C10.0006 9.10045 10.5516 8.53333 11.2314 8.53333H19.8468C20.5265 8.53333 21.0775 9.10045 21.0775 9.8V17.4H23.5391V9.8C23.5391 7.70132 21.886 6 19.8468 6H11.2314Z"
        fill={fill}
      />
      <path d="M12 19H15V17H12V19Z" fill={fill} />
      <path d="M19 15.998V13.998H12V15.998H19Z" fill={fill} />
      <path d="M19 13H12V11H19V13Z" fill={fill} />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M26.6956 16.1926C27.0583 16.4787 27.1697 17.1193 26.8613 17.456L20.9993 23.856C20.8369 24.0332 20.5321 24.1126 20.2814 24.1143C20.0306 24.116 19.6644 24.0312 19.4993 23.8561L17.1517 21.3595C16.8382 21.027 16.9354 20.331 17.2937 20.0401C17.652 19.7491 18.3899 19.7076 18.7034 20.0401L20.2814 21.7261L25.369 16.1716C25.6773 15.8349 26.3328 15.9064 26.6956 16.1926Z"
        fill={fill}
      />
    </svg>
  );
};

export default NoteChecked;
