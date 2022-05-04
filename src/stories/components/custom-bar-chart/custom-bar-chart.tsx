import React from 'react';

export interface CustomChartItem {
  label?: string,
  value: number,
}

interface CustomBarChartProps {
  items: Array<CustomChartItem>,
  maxValue: number,
}

export const CustomBarChart = (props: CustomBarChartProps) => {
  if (!props.items) return <span>Placeholder</span>;

  const itemWidth = 12;
  const itemSpace = 8;
  const padding = 15;
  const width = props.items.length * (itemWidth + itemSpace) + 2 * padding;
  const maxItemHeight = 30;

  const calculateHeight = (value: number):number => {
    if (!value) return 0;

    return value * maxItemHeight / props.maxValue;
  };

  return <svg width={width} height={50} viewBox={`0 0 ${width} 50`} transform={'scale(1, -1)'}>
    {props.items.map((item, i) =>
      <rect key={`item-${i}`}
        x={(i * 20) + padding + 2.5}
        y={5} width={12}
        rx={1}
        height={calculateHeight(item.value)}
        fill={item.value <= props.maxValue ? '#1AAB9B' : '#F75524'}>
        <animate
          attributeName="height"
          from="0"
          to={calculateHeight(item.value)}
          values={`0; ${calculateHeight(item.value) + 5}; ${calculateHeight(item.value) - 3}; ${calculateHeight(item.value)}`}
          keyTimes={'0; .7; .85; 1'}
          dur="0.3s"
          fill="normal"
          begin={`${i * 0.02}s`}
        />
      </rect>
    )}
    <line
      strokeDasharray={'4,2'}
      x1={padding}
      x2={width - padding}
      y1={maxItemHeight + 5}
      y2={maxItemHeight + 5}
      fill={'black'}
      strokeWidth={'1px'}
      stroke={'black'}
    >
      <animate
        attributeName="opacity"
        from="0"
        to="1"
        dur="0.4s"
      />
    </line>
  </svg>;
};
