import React from 'react';

interface SelectChevronDownProps {
  width?: number;
  height?: number;
  fill?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  className?: string;
}

export const SelectChevronDown: React.FC<SelectChevronDownProps> = ({
  width = 10,
  height = 6,
  fill = '#25273D',
  onClick,
  className,
  ...props
}: SelectChevronDownProps) => (
  <svg
    className={className}
    onClick={onClick}
    width={`${width}px`}
    height={`${height}px`}
    viewBox="0 0 10 6"
    fill={fill}
    style={props.style}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.28221 0.229512C0.988881 -0.0765039 0.513315 -0.0765039 0.219992 0.229512C-0.0733308 0.535524 -0.0733308 1.03168 0.219992 1.33769L4.46885 5.77042C4.47802 5.77998 4.48736 5.78924 4.49688 5.79821C4.50402 5.80494 4.51125 5.8115 4.51858 5.8179C4.81368 6.07559 5.25385 6.05979 5.53115 5.77049L9.78002 1.33777C10.0733 1.03175 10.0733 0.535602 9.78002 0.229584C9.48672 -0.076431 9.01112 -0.076431 8.71782 0.229584L5.00004 4.10822L1.28221 0.229512Z"
      fill={fill}
    />
  </svg>
);
