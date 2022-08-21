import React from 'react';
import { CustomChartItemModel } from '../../../core/models/custom-chart-item.model';
import max from 'lodash/max';
import styled from '@emotion/styled';
import { Popover } from '@mui/material';
import { PopoverPaperStyle } from '../custom-popover/custom-popover';
import { useThemeContext } from '../../../core/context/ThemeContext';

interface CustomBarChartProps {
  items?: Array<CustomChartItemModel>;
  maxValues?: number[];
  months?: string[]
}

const COLOR_GREEN = '#1AAB9B';
const COLOR_RED = '#CB3A0D';
const COLOR_YELLOW = '#FDC134';
const COLOR_GRAY = '#D8E0E3';

export const CustomBarChart = (props: CustomBarChartProps) => {
  if (!props.items) return <span/>;
  const isLight = useThemeContext().themeMode === 'light';
  const [anchorEl, setAnchorEl] = React.useState<SVGRectElement | null>(null);
  const [description, setDescription] = React.useState<{ month: string, budgetCap: string, actual: string } | null>(null);

  const handleMouseOver = (event: React.MouseEvent<SVGRectElement>, i: number) => {
    if (props.months?.length === 0) return;
    setAnchorEl(event.currentTarget);
    setDescription({
      month: (props?.months && props.months[i]) || 'unknown',
      budgetCap: ((props.maxValues && props.maxValues[i]) || 0).toLocaleString('en-US', {
        maximumFractionDigits: 0,
      }),
      actual: ((props?.items && props.items[i]?.value) || 0).toLocaleString('en-US', {
        maximumFractionDigits: 0,
      }),
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'graph-popover' : undefined;

  const padding = 8;
  const maxItemHeight = 30;

  const calculateHeight = (value: number): number => {
    if (!value) return 0;

    const highestCap = max(props.maxValues) ?? 0;

    if (highestCap === 0) return 0;
    return (value * maxItemHeight) / highestCap;
  };

  const isValueValid = (value: number): boolean => {
    return value > 0 && !!max(props.maxValues);
  };

  const getColor = (value: number, pos: number): string => {
    if (!props.maxValues) return COLOR_RED;
    const percent = (value * 100) / props.maxValues[pos];
    let color = COLOR_RED;

    if (percent > 50 && percent <= 75) {
      color = COLOR_YELLOW;
    }

    if (percent > 75 && percent <= 90) {
      color = COLOR_GREEN;
    }

    if (percent > 90 && percent <= 100) {
      color = COLOR_YELLOW;
    }

    return color;
  };

  return (
    <>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{
          pointerEvents: 'none',
        }}
        disableRestoreFocus
        PaperProps={{
          style: PopoverPaperStyle(isLight),
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Container>
          <Row>
            <b>Month</b>
            <span>{description?.month}</span>
          </Row>
          <Row>
            <b>Actual</b>
            <span>{description?.actual}</span>
          </Row>
          <Row>
            <b>Budget Cap</b>
            <span>{description?.budgetCap}</span>
          </Row>
        </Container>
      </Popover>
      <svg
        width={60}
        height={50}
        viewBox={'0 0 60 50'}
        style={{
          marginRight: '8px',
          marginLeft: '8px',
        }}
      >
        <g transform={'scale(1, -1) translate(-6, -50)'}>
          {props.items.map((item: CustomChartItemModel, i: number) => (
            <rect
              key={`item-${i}`}
              x={i * 20 + padding + 2.5}
              y="5"
              width="12"
              rx="1"
              aria-aria-describedby="id"
              height={
                isValueValid(item.value) ? calculateHeight(item.value) : 16
              }
              onMouseOver={(e) => handleMouseOver(e, i)}
              onMouseLeave={handleClose}
              fill={
                isValueValid(item.value) ? getColor(item.value, i) : COLOR_GRAY
              }
            >
              <animate
                attributeName="height"
                from="0"
                to={calculateHeight(item.value)}
                values={`0; ${calculateHeight(item.value) + 5}; ${
                  calculateHeight(item.value) - 3
                }; ${calculateHeight(item.value)}`}
                keyTimes="0; .7; .85; 1"
                dur="0.3s"
                fill="normal"
                begin={`${i * 0.02}s`}
              />
            </rect>
          ))}
          {props.maxValues?.map((cap: number, i: number) => {
            if (cap === 0) return <line key={`cap-${i}`} />;
            return (
              <line
                key={`cap-${i}`}
                strokeDasharray="4,3"
                x1={i * 20 + padding}
                x2={i * 20 + padding + 17}
                y1={calculateHeight(cap) + 5}
                y2={calculateHeight(cap) + 5}
                fill="#447AFB"
                strokeWidth="1px"
                stroke="#447AFB"
              >
                <animate attributeName="opacity" from="0" to="1" dur="0.4s" />
              </line>
            );
          })}
        </g>
      </svg>
    </>
  );
};

const Container = styled.div({
  padding: '16px'
});

const Row = styled.div({
  display: 'flex',
  '> b': {
    marginRight: '8px'
  }
});
