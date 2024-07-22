import { styled } from '@mui/material';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import React, { useState } from 'react';

import SESTooltip from '@/components/SESTooltip/SESTooltip';
import PopoverForecastDescription from '@/views/CoreUnitBudgetStatement/components/PopverForecastDescription/PopoverForecastDescription';
import {
  getBorderColor,
  getDisplacementDashLine,
  getPercentFullBar,
  getProgressiveBarColor,
} from '@/views/CoreUnitBudgetStatement/utils/forecastHelper';
import type { DateTime } from 'luxon';

interface Props {
  value: number | string;
  relativeValue: number | string;
  month?: DateTime;
  isTotal?: boolean;
}

const BarWithDottedLine: React.FC<Props> = ({ value, relativeValue, month, isTotal = false }) => {
  const { isLight } = useThemeContext();
  const monthFormatted = month?.toFormat('MMMM') || '3 Months Budget Cap';
  const [hover, setHover] = useState(false);
  const showComponent = typeof value === 'number' && typeof relativeValue === 'number';

  const handleMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHover(true);
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHover(false);
  };

  if (!showComponent) return <ContainerNA>N/A</ContainerNA>;
  const barColor = getProgressiveBarColor(value, relativeValue, isLight, hover);
  const percent = getPercentFullBar(value, relativeValue);
  const displacement = getDisplacementDashLine(value, relativeValue);
  const borderColor = getBorderColor(value, relativeValue, isLight);
  return (
    <Container>
      <Forecast isTotal={isTotal} isNegative={value < 0}>
        {usLocalizedNumber(value, 2)}
      </Forecast>
      <ContainerBar>
        <BudgetBar>{<BarPercent width={percent} color={barColor} />}</BudgetBar>

        <SESTooltipStyled
          showAsModal
          borderColor={borderColor}
          content={<PopoverForecastDescription relativeValue={relativeValue} value={value} month={monthFormatted} />}
        >
          <ContendBarForSpace
            onMouseEnter={handleMouseOver}
            onMouseOut={handleMouseOut}
            displacement={displacement}
            onClick={handleMouseOver}
          >
            <VerticalBar onMouseEnter={handleMouseOver} onMouseOut={handleMouseOut} onClick={handleMouseOver} />
          </ContendBarForSpace>
        </SESTooltipStyled>
      </ContainerBar>
      <BudgetCap>{usLocalizedNumber(relativeValue, 2)}</BudgetCap>
    </Container>
  );
};

export default BarWithDottedLine;

const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  alignItems: 'flex-end',
  flex: 1,
  justifyContent: 'flex-end',
  [theme.breakpoints.up('tablet_768')]: {
    paddingRight: 16,
  },
  [theme.breakpoints.up('desktop_1024')]: {
    paddingRight: 16,
  },
}));

const ContainerBar = styled('div')(({ theme }) => ({
  height: 14,
  display: 'flex',
  position: 'relative',
  width: 100,
  alignItems: 'center',
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    width: 75,
  },
}));

const VerticalBar = styled('div')<{ displacement?: number }>(({ displacement, theme }) => ({
  height: 16,
  borderRadius: 6,
  border: `1px dashed ${theme.palette.isLight ? theme.palette.colors.blue[700] : theme.palette.colors.blue[900]}`,
  right: `${displacement}%`,
  transform: 'rotate(180deg)',
  cursor: 'pointer',
  marginRight: -4,
}));

const BudgetBar = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 6,
  overflow: 'hidden',
  borderRadius: 2,
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[400],
}));

const BarPercent = styled('div')<{ width: number; color: string }>(({ width, color }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: color,
  borderRadius: 2,
  width: `${width}%`,
  height: '100%',
  transition: 'width, background 0.5s ease-in-out',
}));
const BudgetCap = styled('div')(({ theme }) => ({
  fontSize: 12,
  fontWeight: 500,
  lineHeight: '18px',
  textAlign: 'right',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[300] : theme.palette.colors.charcoal[600],
  marginRight: 2,
}));

const ContendBarForSpace = styled('div')<{ displacement: number }>(({ displacement }) => ({
  width: 6,
  position: 'absolute',
  right: `${displacement}%`,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  top: 0,
  cursor: 'pointer',
}));

const Forecast = styled('div')<{ isTotal: boolean; isNegative?: boolean }>(({ theme, isTotal, isNegative }) => ({
  fontSize: 14,
  lineHeight: '22px',
  textAlign: 'right',
  fontWeight: isTotal ? 600 : 600,
  color: theme.palette.isLight
    ? isNegative
      ? '#F75524'
      : theme.palette.colors.gray[900]
    : isNegative
    ? '#F75524'
    : theme.palette.colors.gray[50],
  [theme.breakpoints.between('tablet_768', 'desktop_1024')]: {
    fontSize: 16,
    lineHeight: '22px',
  },
  [theme.breakpoints.up('desktop_1024')]: {
    lineHeight: '24px',
  },
}));

const SESTooltipStyled = styled(SESTooltip)<{ borderColor: string }>(({ borderColor, theme }) => ({
  padding: 0,
  marginTop: 0,
  width: '100%',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  border: `2px solid ${borderColor}`,
  minWidth: 298,
  borderRadius: 12,
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
}));

const ContainerNA = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: 0,
  width: '100%',
  [theme.breakpoints.up('tablet_768')]: {
    paddingRight: 16,
  },
}));
