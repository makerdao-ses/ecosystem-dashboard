interface CircleLegendChartProps {
  width?: number;
  height?: number;
  fill?: string;
}

const CircleLegendChart: React.FC<CircleLegendChartProps> = ({ fill = '#83A7FF;', width = 12, height = 12 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 13 13" fill="none">
    <circle cx="6.5" cy="6.5" r="5.5" stroke={fill} />
    <circle cx="6.5" cy="6.5" r="4" fill={fill} />
  </svg>
);

export default CircleLegendChart;
