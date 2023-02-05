import type { CSSProperties } from '@emotion/serialize';

export interface SplitLine {
  show: boolean;
}

export interface LineStyle {
  color: string;
}

export interface AxisLine {
  show: boolean;
  lineStyle: LineStyle;
}
export interface AxisTick {
  show: boolean;
}

export interface AxisLabel {
  color: string;
  align: 'left' | 'center' | 'right';
  fontFamily: 'string';
  fontWeight: number | string;
  fontSize: number | string;
  lineHeight: number;
  baseline: string;
}
export interface XCoordinate {
  type: string;
  data: string[];
  splitLine: SplitLine;
  axisLine: AxisLine;
  axisTick: AxisTick;
  axisLabel: AxisLabel;
}

export interface YCoordinate {
  type: string;
  // eslint-disable-next-line spellcheck/spell-checker
  zlevel: number;
  axisLine: AxisLine;
  splitLine: SplitLine;
}

export interface Series {
  name: string;
  type: string;
  data: number | string[];
  showBackground: boolean;
  stack: string;
  backgroundStyle: CSSProperties;
  itemStyle: CSSProperties;
}

export interface Graph {
  xAxis: XCoordinate;
  yAxis: YCoordinate;
  series: Series | Series[];
}
