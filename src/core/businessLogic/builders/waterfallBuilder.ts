import type { WaterfallChartSeriesData } from '@ses/containers/Finances/utils/types';
import type { EChartsOption } from 'echarts-for-react';

export class WaterfallChartSeriesBuilder {
  private readonly _seriesData: WaterfallChartSeriesData;

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

  withName(name: string): WaterfallChartSeriesBuilder {
    this._seriesData.name = name;
    return this;
  }

  withData(data: (number | string)[]): WaterfallChartSeriesBuilder {
    this._seriesData.data = data;
    return this;
  }

  withBarWidth(barWidth: number): WaterfallChartSeriesBuilder {
    this._seriesData.barWidth = barWidth;
    return this;
  }

  withStack(stack: string): WaterfallChartSeriesBuilder {
    this._seriesData.stack = stack;
    return this;
  }

  withType(type: string): WaterfallChartSeriesBuilder {
    this._seriesData.type = type;
    return this;
  }

  withLabel(label: {
    formatter?: (params: EChartsOption) => string;
    show: boolean;
    color?: string;
    position?: string;
    fontSize?: number;
  }): WaterfallChartSeriesBuilder {
    this._seriesData.label = label;
    return this;
  }

  withItemStyle(itemStyle: {
    borderRadius?: number;
    color?: ((params: EChartsOption) => string) | string;
  }): WaterfallChartSeriesBuilder {
    this._seriesData.itemStyle = itemStyle;
    return this;
  }

  withZIndex(zIndex: number): WaterfallChartSeriesBuilder {
    this._seriesData.zIndex = zIndex;
    return this;
  }

  withIsVisible(isVisible: boolean): WaterfallChartSeriesBuilder {
    this._seriesData.isVisible = isVisible;
    return this;
  }

  build(): WaterfallChartSeriesData {
    return this._seriesData;
  }
}
