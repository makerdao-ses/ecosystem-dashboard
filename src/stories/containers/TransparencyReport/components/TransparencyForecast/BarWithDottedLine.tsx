import styled from '@emotion/styled';
import { CustomPopover } from '@ses/components/CustomPopover/CustomPopover';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import React, { useState } from 'react';
import { getBorderColor, getDisplacementDashLine, getProgressiveBarColor } from '../../utils/forecastHelper';
import PopoverForecastDescription from '../PopverForecastDescription/PopoverForecastDescription';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';
import type { DateTime } from 'luxon';

interface Props {
  value: number;
  relativeValue: number;
  month?: DateTime;
}

const BarWithDottedLine: React.FC<Props> = ({ value, relativeValue, month }) => {
  const { isLight } = useThemeContext();
  const monthFormatted = month?.toFormat('MMMM') || '3 Months Budget Cap';
  const [hover, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };
  const barColor = getProgressiveBarColor(value, relativeValue, isLight, hover);
  const percent = percentageRespectTo(value, relativeValue);
  const displacement = getDisplacementDashLine(value, relativeValue);
  const borderColor = getBorderColor(value, relativeValue, isLight);
  return (
    <Container>
      <ContainerBar>
        <BudgetBar isLight={isLight}>{<BarPercent width={percent} color={barColor} />}</BudgetBar>

        <CustomPopover
          popoverStyle={{
            border: `1px solid ${borderColor}`,
            boxShadow: isLight
              ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
              : '10px 15px 20px 6px rgba(20, 0, 141, 0.1)',
            background: isLight ? 'white' : '#000A13',
            borderRadius: '6px',
          }}
          popupStyle={{}}
          id="mouse-over-information"
          title={
            <PopoverForecastDescription
              relativeValue={relativeValue}
              value={value}
              month={monthFormatted}
              budgetCap={relativeValue}
              forecast={value}
            />
          }
        >
          <VerticalBar displacement={displacement} onMouseEnter={handleMouseOver} onMouseOut={handleMouseOut} />
        </CustomPopover>
      </ContainerBar>
      <BudgetCap isLight={isLight}>{usLocalizedNumber(relativeValue)}</BudgetCap>
    </Container>
  );
};

export default BarWithDottedLine;

const Container = styled.div({
  paddingTop: 4,
  width: 100,
  display: 'flex',
  flexDirection: 'column',
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 400,
  letterSpacing: '0.3px',
  fontFeatureSettings: "'tnum' on, 'lnum' on",
});
const ContainerBar = styled.div({
  height: 14,
  paddingTop: 4,
  paddingBottom: 4,
  marginBottom: 2,
  position: 'relative',
  width: '100%',
});

const VerticalBar = styled.div<{ displacement: number }>(({ displacement }) => ({
  height: 14,
  width: 1,
  border: '1px dashed #447AFB',
  backgroundSize: '4px 4px',
  borderRadius: '6px',
  position: 'absolute',
  top: 0,
  right: `${displacement}%`,
  transform: 'rotate(180deg)',
  cursor: 'pointer',
}));

const BudgetBar = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: '100%',
  height: 6,
  overflow: 'hidden',
  borderRadius: 2,
  background: isLight ? '#ECF1F3' : '#48495F',
}));

const BarPercent = styled.div<{ width: number; color: string }>(({ width, color }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: color,
  borderRadius: 2,
  width: `${width}%`,
  height: '100%',
  transition: 'width, background 0.5s ease-in-out',
}));
const BudgetCap = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  textAlign: 'right',
  color: isLight ? '#708390' : '#546978',
}));
