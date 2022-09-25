import React from 'react';
import { CustomChartItemModel } from '../../../core/models/custom-chart-item.model';
import max from 'lodash/max';
import styled from '@emotion/styled';
import { Popover, Typography, useMediaQuery } from '@mui/material';
import { useThemeContext } from '../../../core/context/ThemeContext';
import { ExpenditureLevel } from '../../../core/enums/expenditure-level.enum';

interface CustomBarChartProps {
  items?: Array<CustomChartItemModel>;
  maxValues?: number[];
  months?: string[];
}

const COLOR_GREEN = '#02CB9B';
const COLOR_RED = '#CB3A0D';
const COLOR_YELLOW = '#F08B04';
const COLOR_GRAY = '#D8E0E3';

export const PopoverPaperBar = (isLight: boolean) => ({
  background: isLight ? 'white' : '#000A13',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
});

export const CustomBarChart = (props: CustomBarChartProps) => {
  if (!props.items) return <span />;
  const isLight = useThemeContext().themeMode === 'light';
  const [anchorEl, setAnchorEl] = React.useState<SVGRectElement | null>(null);
  const [description, setDescription] = React.useState<{ month: string; budgetCap: string; actual: string } | null>(
    null
  );
  const isOnTouchDevice = useMediaQuery('(pointer: coarse)');

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
    if (!props.maxValues || props.maxValues.length === 0) return COLOR_RED;
    if (props.maxValues[pos] === 0) return COLOR_RED;
    const percent = (value * 100) / props.maxValues[pos];
    let color = COLOR_RED;
    if (percent > 0 && percent <= 90) {
      color = COLOR_GREEN;
    }

    if (percent > 90 && percent <= 100) {
      color = COLOR_YELLOW;
    }

    if (percent > 100) {
      color = COLOR_RED;
    }

    return color;
  };

  const getExpenditureLevel = (valueActual: number, budgetCapActual: number): string => {
    if (budgetCapActual === 0) return '0';
    const percent = (valueActual * 100) / budgetCapActual;
    let expenditureLevel = '';
    if (percent > 0 && percent <= 75) {
      expenditureLevel = ExpenditureLevel.LOW;
    }

    if (percent > 75 && percent <= 90) {
      expenditureLevel = ExpenditureLevel.OPTIMAL;
    }

    if (percent > 90 && percent <= 100) {
      expenditureLevel = ExpenditureLevel.STRETCHED;
    }
    if (percent > 100) {
      expenditureLevel = ExpenditureLevel.OVERBUDGET;
    }

    return expenditureLevel;
  };
  return (
    <>
      <Popover
        id={id}
        open={open && !isOnTouchDevice}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        sx={{
          pointerEvents: 'none',
        }}
        disableRestoreFocus
        PaperProps={{
          style: PopoverPaperBar(isLight),
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {description?.actual !== '0' ? (
          <Container
            levelExpenditure={
              getExpenditureLevel(
                parseFloat((description?.actual || '0').replace(/,/, '.')),
                parseFloat((description?.budgetCap || '0').replace(/,/, '.'))
              ) as ExpenditureLevel
            }
            isLight={isLight}
          >
            <Row style={{ marginBottom: '16px' }}>
              <StyleTypography>{description?.month}</StyleTypography>
              <StyleLevelExpenditure
                isLight={isLight}
                levelExpenditure={
                  getExpenditureLevel(
                    parseFloat((description?.actual || '0').replace(/,/, '.')),
                    parseFloat((description?.budgetCap || '0').replace(/,/, '.'))
                  ) as ExpenditureLevel
                }
              >
                {getExpenditureLevel(
                  parseFloat((description?.actual || '0').replace(/,/, '.')),
                  parseFloat((description?.budgetCap || '0').replace(/,/, '.'))
                )}
              </StyleLevelExpenditure>
            </Row>
            <Row style={{ marginBottom: '4px' }}>
              <TypographyValue isLight={isLight}>{description?.budgetCap}</TypographyValue>
              <TypographyValue isLight={isLight} style={{ textAlign: 'right' }}>
                {description?.actual}
              </TypographyValue>
            </Row>
            <Row>
              <TypographyDescription isLight={isLight}>Budget Cap</TypographyDescription>
              <TypographyDescription isLight={isLight}>Actuals</TypographyDescription>
            </Row>
          </Container>
        ) : (
          <NoDataProvided isLight={isLight}>No Data Provided</NoDataProvided>
        )}
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
              aria-describedby="id"
              height={isValueValid(item.value) ? calculateHeight(item.value) : 16}
              onMouseOver={(e) => handleMouseOver(e, i)}
              onMouseLeave={handleClose}
              fill={isValueValid(item.value) ? getColor(item.value, i) : COLOR_GRAY}
            >
              <animate
                attributeName="height"
                from="0"
                to={calculateHeight(item.value)}
                values={`0; ${calculateHeight(item.value) + 5}; ${calculateHeight(item.value) - 3}; ${calculateHeight(
                  item.value
                )}`}
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

const Container = styled.div<{ levelExpenditure?: ExpenditureLevel; isLight?: boolean }>(
  ({ levelExpenditure, isLight }) => ({
    padding: '16px',
    borderRadius: '6px',
    width: '202px',
    height: '102px',
    border: isLight
      ? levelExpenditure === ExpenditureLevel.LOW || levelExpenditure === ExpenditureLevel.OPTIMAL
        ? '1px solid #6EDBD0'
        : levelExpenditure === ExpenditureLevel.STRETCHED
        ? '1px solid #FEDB88'
        : levelExpenditure === ExpenditureLevel.OVERBUDGET
        ? '1px solid #F99374'
        : 'none'
      : levelExpenditure === ExpenditureLevel.LOW || levelExpenditure === ExpenditureLevel.OPTIMAL
      ? '1px solid rgba(0, 237, 24, 0.4)'
      : levelExpenditure === ExpenditureLevel.STRETCHED
      ? '1px solid rgba(255, 130, 55, 0.4)'
      : levelExpenditure === ExpenditureLevel.OVERBUDGET
      ? '1px solid rgba(255, 64, 133, 0.4)'
      : 'none',
  })
);

const Row = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const StyleTypography = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '14px',
  textAlign: 'center',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#9FAFB9',
});

const StyleLevelExpenditure = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isLight' && prop !== 'levelExpenditure',
})<{ levelExpenditure: ExpenditureLevel; isLight?: boolean }>(({ levelExpenditure, isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '11px',
  lineHeight: '13px',
  color: isLight
    ? levelExpenditure === ExpenditureLevel.LOW || levelExpenditure === ExpenditureLevel.OPTIMAL
      ? '#02CB9B'
      : levelExpenditure === ExpenditureLevel.STRETCHED
      ? '#F08B04'
      : '#CB3A0D'
    : levelExpenditure === ExpenditureLevel.LOW || levelExpenditure === ExpenditureLevel.OPTIMAL
    ? '#00ED18'
    : levelExpenditure === ExpenditureLevel.STRETCHED
    ? '#FF8237'
    : '#FF4085',
}));

const TypographyValue = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight?: boolean }>(
  ({ isLight }) => ({
    fontFamily: 'Inter,sans-serif',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '19px',
    letterSpacing: '0.3px',
    color: isLight ? '#000000' : '#EDEFFF',
  })
);

const TypographyDescription = styled(Typography, { shouldForwardProp: (prop) => prop !== 'isLight' })<{
  isLight?: boolean;
}>(({ isLight }) => ({
  fontFamily: 'Inter ,sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: isLight ? '#231536' : '#9FAFB9;',
}));

const NoDataProvided = styled.div<{ isLight?: boolean }>(({ isLight }) => ({
  padding: '16px',
  borderRadius: '6px',
  color: isLight ? '#231536' : '#D2D4EF',
}));
