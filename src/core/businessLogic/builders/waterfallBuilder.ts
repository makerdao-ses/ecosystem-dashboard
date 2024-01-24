import type { WaterFallChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { EChartsOption } from 'echarts-for-react';

export class WaterFallChartSeriesBuilder {
  private readonly _seriesData: WaterFallChartSeriesData;

  constructor() {
    this._seriesData = {
      name: '',
      data: [],
      type: 'bar', // Default type can be set to 'bar' or any other default value
      label: {
        show: false,
      },
    };
  }

  withName(name: string): WaterFallChartSeriesBuilder {
    this._seriesData.name = name;
    return this;
  }

  withData(data: (number | string)[]): WaterFallChartSeriesBuilder {
    this._seriesData.data = data;
    return this;
  }

  withBarWidth(barWidth: number): WaterFallChartSeriesBuilder {
    this._seriesData.barWidth = barWidth;
    return this;
  }

  withStack(stack: string): WaterFallChartSeriesBuilder {
    this._seriesData.stack = stack;
    return this;
  }

  withType(type: string): WaterFallChartSeriesBuilder {
    this._seriesData.type = type;
    return this;
  }

  withLabel(label: {
    formatter?: (params: EChartsOption) => string;
    show: boolean;
    color?: string;
    position?: string;
    fontSize?: number;
  }): WaterFallChartSeriesBuilder {
    this._seriesData.label = label;
    return this;
  }

  withItemStyle(itemStyle: {
    borderRadius?: number;
    color?: ((params: EChartsOption) => string) | string;
  }): WaterFallChartSeriesBuilder {
    this._seriesData.itemStyle = itemStyle;
    return this;
  }

  withZIndex(zIndex: number): WaterFallChartSeriesBuilder {
    this._seriesData.zIndex = zIndex;
    return this;
  }

  withIsVisible(isVisible: boolean): WaterFallChartSeriesBuilder {
    this._seriesData.isVisible = isVisible;
    return this;
  }

  build(): WaterFallChartSeriesData {
    return this._seriesData;
  }
}
