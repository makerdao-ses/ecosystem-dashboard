interface Props {
  checked: boolean;
  width?: number;
  height?: number;
  className?: string;
}

const RadioInputSVG: React.FC<Props> = ({ checked, className, width = 12, height = 12 }) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 12 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6.5" r="5.625" stroke="#231536" strokeWidth="0.75" />
    {checked && <circle cx="6" cy="6.5" r="4" fill="#231536" />}
  </svg>
);

export default RadioInputSVG;
