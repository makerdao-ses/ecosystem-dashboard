import { Popover, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import { siteRoutes } from '@ses/config/routes';
import { DateTime } from 'luxon';
import Link from 'next/link';
import React from 'react';
import { ExpenditureLevel } from '../../../core/enums/expenditureLevelEnum';
import type { CustomChartItemModel } from '../../../core/models/customChartItemModel';
import type { Theme } from '@mui/material';

interface CustomBarChartProps {
  items?: Array<CustomChartItemModel>;
  maxValues?: number[];
  months?: string[];
  code?: string;
}

const PopoverPaperBar = (theme: Theme) => ({
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  borderRadius: 12,
});

export const CustomBarChart = (props: CustomBarChartProps) => {
  const theme = useTheme();
  const isLight = theme.palette.isLight;
  const COLOR_GREEN = isLight ? theme.palette.colors.green[700] : theme.palette.colors.green[900];
  const COLOR_RED = isLight ? theme.palette.colors.red[800] : theme.palette.colors.red[900];
  const COLOR_ORANGE = isLight ? theme.palette.colors.orange[700] : theme.palette.colors.orange[800];
  const COLOR_GRAY = isLight ? theme.palette.colors.gray[300] : theme.palette.colors.gray[700];
  const LINE = isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900];
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
      color = COLOR_ORANGE;
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
          style: PopoverPaperBar(theme),
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
          >
            <Row>
              <StyleMonth>{description?.month}</StyleMonth>
              <StyleLevelExpenditure
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
            <Row>
              <ContainerDescription>
                <TypographyValue>{description?.actual}</TypographyValue>
                <TypographyDescription>Actuals</TypographyDescription>
              </ContainerDescription>
              <ContainerDescription isAlignStart={false}>
                <TypographyValue>{description?.budgetCap}</TypographyValue>
                <TypographyDescription>Budget Cap</TypographyDescription>
              </ContainerDescription>
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
                        ? theme.palette.colors.gray[900]
                        : theme.palette.colors.gray[300]
                      : props.items?.[i]?.value
                      ? theme.palette.colors.slate[50]
                      : theme.palette.colors.gray[700]
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
                <BarMonth
                  color={
                    hasMonthValue(i)
                      ? getColor(item.value, i)
                      : isLight
                      ? theme.palette.colors.gray[400]
                      : theme.palette.colors.gray[700]
                  }
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
                </BarMonth>
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
                fill={LINE}
                strokeWidth="1px"
                stroke={LINE}
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

const Container = styled('div')<{ levelExpenditure?: ExpenditureLevel }>(({ levelExpenditure, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '8px 16px 8px 16px',
  borderRadius: 12,
  width: 240,
  height: 94,
  gap: 8,
  border: theme.palette.isLight
    ? levelExpenditure === ExpenditureLevel.LOW || levelExpenditure === ExpenditureLevel.OPTIMAL
      ? `2px solid ${theme.palette.colors.green[200]}`
      : levelExpenditure === ExpenditureLevel.STRETCHED
      ? `2px solid ${theme.palette.colors.orange[200]}`
      : levelExpenditure === ExpenditureLevel.OVERBUDGET
      ? `2px solid ${theme.palette.colors.red[200]}`
      : `2px solid ${theme.palette.colors.charcoal[100]}`
    : levelExpenditure === ExpenditureLevel.LOW || levelExpenditure === ExpenditureLevel.OPTIMAL
    ? '2px solid #27633B'
    : levelExpenditure === ExpenditureLevel.STRETCHED
    ? '1px solid #8C5412'
    : levelExpenditure === ExpenditureLevel.OVERBUDGET
    ? '1px solid #82302C'
    : `2px solid ${theme.palette.colors.charcoal[700]}`,
}));

const Row = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const ContainerDescription = styled('div')<{ isAlignStart?: boolean }>(({ isAlignStart = true }) => ({
  display: 'flex',
  flexDirection: 'column',

  alignItems: isAlignStart ? 'flex-start' : 'flex-end',
}));
const StyleMonth = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[400] : theme.palette.colors.charcoal[400],
}));

const StyleLevelExpenditure = styled(Typography)<{ levelExpenditure: ExpenditureLevel }>(
  ({ levelExpenditure, theme }) => ({
    fontFamily: 'Inter, sans-serif',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '14px',
    lineHeight: '22px',
    color: theme.palette.isLight
      ? levelExpenditure === ExpenditureLevel.LOW || levelExpenditure === ExpenditureLevel.OPTIMAL
        ? theme.palette.colors.green[700]
        : levelExpenditure === ExpenditureLevel.STRETCHED
        ? theme.palette.colors.orange[700]
        : theme.palette.colors.red[700]
      : levelExpenditure === ExpenditureLevel.LOW || levelExpenditure === ExpenditureLevel.OPTIMAL
      ? theme.palette.colors.green[900]
      : levelExpenditure === ExpenditureLevel.STRETCHED
      ? theme.palette.colors.orange[900]
      : theme.palette.colors.red[900],
  })
);

const TypographyValue = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter,sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: 16,
  lineHeight: '24px',

  color: theme.palette.isLight ? theme.palette.colors.charcoal[800] : theme.palette.colors.charcoal[100],
}));

const TypographyDescription = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter ,sans-serif',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[500] : theme.palette.colors.charcoal[500],
}));

const NoDataProvided = styled('div')(({ theme }) => ({
  padding: '16px',
  borderRadius: '6px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
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

const BarMonth = styled('rect')<{ color: string }>(({ theme, color }) => ({
  transition: 'fill 0.3s ease',
  '&:hover': {
    fill: theme.palette.isLight
      ? color === theme.palette.colors.red[800]
        ? theme.palette.colors.red[900]
        : color === theme.palette.colors.green[700]
        ? theme.palette.colors.green[800]
        : color === theme.palette.colors.orange[700]
        ? color === theme.palette.colors.orange[800]
        : theme.palette.colors.gray[400]
      : color === theme.palette.colors.red[900]
      ? theme.palette.colors.red[800]
      : color === theme.palette.colors.green[900]
      ? theme.palette.colors.green[800]
      : color === theme.palette.colors.orange[800]
      ? theme.palette.colors.orange[700]
      : theme.palette.colors.gray[700],
  },
}));
