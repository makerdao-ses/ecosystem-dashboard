import { Popover, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { DateTime } from 'luxon';
import Link from 'next/link';
import React from 'react';
import { ExpenditureLevel } from '../../../core/enums/expenditureLevelEnum';
import type { CustomChartItemModel } from '../../../core/models/customChartItemModel';

interface CustomBarChartProps {
  items?: Array<CustomChartItemModel>;
  maxValues?: number[];
  months?: string[];
  code?: string;
}

export const PopoverPaperBar = (isLight: boolean) => ({
  background: isLight ? 'white' : '#000A13',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
  borderRadius: '6px',
});

export const CustomBarChart = (props: CustomBarChartProps) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const COLOR_GREEN = isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900];
  const COLOR_RED = isLight ? theme.palette.colors.red[800] : theme.palette.colors.red[900];
  const COLOR_YELLOW = isLight ? theme.palette.colors.orange[800] : theme.palette.colors.orange[800];
  const COLOR_GRAY = '#D7D8D9';
  const isOnTouchDevice = useMediaQuery('(pointer: coarse)');
  const [anchorEl, setAnchorEl] = React.useState<SVGRectElement | null>(null);
  const [description, setDescription] = React.useState<{ month: string; budgetCap: string; actual: string } | null>(
    null
  );
  if (!props.items) return <span />;
  const monthsProps = props?.months?.map((date) => DateTime.fromISO(date).toFormat('MMMM'));
  const monthsLinks = props?.months?.map((date) => DateTime.fromISO(date).toFormat('LLLyyyy'));

  const handleMouseOver = (event: React.MouseEvent<SVGRectElement>, i: number) => {
    if (props.months?.length === 0) return;
    setAnchorEl(event.currentTarget);
    setDescription({
      month: (monthsProps && monthsProps[i]) || 'unknown',
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
  const maxBarHeight = 50;
  const calculateHeight = (value: number): number => {
    if (!value) return 16;

    const allItems = [...(props?.items?.map((item) => item?.value || 0) || []), ...(props?.maxValues || [])];
    const max = Math.max(...allItems);
    const maxLimit = 45;

    return (value / max) * maxLimit;
  };

  const hasMonthValue = (monthIndex: number): boolean =>
    !!props.items?.[monthIndex]?.value || !!props.maxValues?.[monthIndex];

  const getColor = (value: number, pos: number): string => {
    if (!props.maxValues || props.maxValues.length === 0) return COLOR_RED;
    if (!value) return COLOR_GRAY;
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
                Number(description?.actual.split(',').join('') || 0),
                Number(description?.budgetCap.split(',').join('') || 0)
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
                    Number(description?.actual.split(',').join('') || 0),
                    Number(description?.budgetCap.split(',').join('') || 0)
                  ) as ExpenditureLevel
                }
              >
                {getExpenditureLevel(
                  Number(description?.actual.split(',').join('') || 0),
                  Number(description?.budgetCap.split(',').join('') || 0)
                )}
              </StyleLevelExpenditure>
            </Row>
            <Row style={{ marginBottom: '4px' }}>
              <TypographyValue>{description?.budgetCap}</TypographyValue>
              <TypographyValue style={{ textAlign: 'right' }}>{description?.actual}</TypographyValue>
            </Row>
            <Row>
              <TypographyDescription>Budget Cap</TypographyDescription>
              <TypographyDescription>Actuals</TypographyDescription>
            </Row>
          </Container>
        ) : (
          <NoDataProvided>No Data Provided</NoDataProvided>
        )}
      </Popover>
      <SVGStyle>
        <MonthTextGroup>
          {monthsProps?.map((month: string, i: number) => (
            <Link
              key={`month-${i}`}
              href={`${siteRoutes.coreUnitReports(props?.code || '')}?viewMonth=${monthsLinks && monthsLinks[i]}`}
              legacyBehavior
            >
              <a onClick={(event: React.SyntheticEvent) => event.stopPropagation()}>
                <text
                  x={i * 20 + padding - 2}
                  y={57}
                  fill={
                    isLight
                      ? props.items?.[i]?.value
                        ? '#434358'
                        : '#D8E0E3'
                      : props.items?.[i]?.value
                      ? '#D8E0E3'
                      : '#434358'
                  }
                >
                  {month.charAt(0)}
                </text>
              </a>
            </Link>
          ))}
        </MonthTextGroup>
        <g transform={'scale(1, -1) translate(-6, -50)'}>
          {props.items.map((item: CustomChartItemModel, i: number) => (
            <Link
              key={`item-${i}`}
              href={`${siteRoutes.coreUnitReports(props?.code || '')}?viewMonth=${monthsLinks && monthsLinks[i]}`}
              legacyBehavior
            >
              <a onClick={(event: React.SyntheticEvent) => event.stopPropagation()}>
                <rect
                  x={i * 20 + padding + 2.5}
                  y="5"
                  width="12"
                  rx="1"
                  aria-describedby="id"
                  height={hasMonthValue(i) ? calculateHeight(item.value) : 16}
                  onMouseOver={(e) => handleMouseOver(e, i)}
                  onMouseLeave={handleClose}
                  fill={hasMonthValue(i) ? getColor(item.value, i) : COLOR_GRAY}
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
              </a>
            </Link>
          ))}
          {props.maxValues?.map((cap: number, i: number) => {
            if (cap === 0) return <line key={`cap-${i}`} />;
            return (
              <line
                key={`cap-${i}`}
                strokeDasharray="4,3"
                x1={i * 20 + padding}
                x2={i * 20 + padding + 17}
                y1={calculateHeight(cap) + 5 > maxBarHeight ? maxBarHeight : calculateHeight(cap) + 5}
                y2={calculateHeight(cap) + 5 > maxBarHeight ? maxBarHeight : calculateHeight(cap) + 5}
                fill="#447AFB"
                strokeWidth="1px"
                stroke="#447AFB"
              >
                <animate attributeName="opacity" from="0" to="1" dur="0.4s" />
              </line>
            );
          })}
        </g>
      </SVGStyle>
    </>
  );
};

const Container = styled('div')<{ levelExpenditure?: ExpenditureLevel; isLight?: boolean }>(
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

const Row = styled('div')({
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

const TypographyValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter,sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '19px',
  letterSpacing: '0.3px',
  color: theme.palette.isLight ? '#000000' : '#EDEFFF',
}));

const TypographyDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter ,sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '17px',
  color: theme.palette.isLight ? '#231536' : '#9FAFB9',
}));

const NoDataProvided = styled('div')(({ theme }) => ({
  padding: '16px',
  borderRadius: '6px',
  color: theme.palette.isLight ? '#231536' : '#D2D4EF',
}));

const MonthTextGroup = styled('g')({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 10,
  lineHeight: '12px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
});

const SVGStyle = styled('svg')(({ theme }) => ({
  width: 60,
  height: 57,
  viewBox: '0 0 60 57',
  marginRight: '0px',
  marginLeft: '4px',
  [theme.breakpoints.up('desktop_1024')]: {
    marginRight: '2px',
    marginLeft: '6px',
  },
  [theme.breakpoints.up('desktop_1280')]: {
    marginRight: '0px',
    marginLeft: '16px',
  },
}));
