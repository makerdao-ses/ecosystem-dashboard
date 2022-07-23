
interface Props {
  width?: number;
  height?: number;
  onClick?: () => void;
  fill?: string;
  style?: React.CSSProperties;

}
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ArrowMobileLeft = ({ fill = '#1AAB9B', height = 10, onClick = () => { }, style = {}, width = 6, ...props }: Props) => {
  return (

    <svg
      style={style}
      width={width}
      height={height}
      onClick={onClick} 
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.77.22a.808.808 0 00-1.108 0L.784 3.938l-.554.53a.73.73 0 000 1.063l.554.531L4.662 9.78a.808.808 0 001.108 0 .73.73 0 000-1.062L1.892 5 5.77 1.282a.73.73 0 000-1.062z"
        fill={fill}
      />
    </svg>
  );
};

export default ArrowMobileLeft;
