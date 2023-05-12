import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { usLocalizedNumber } from '@ses/core/utils/humanization';
import { percentageRespectTo } from '@ses/core/utils/math';
import React from 'react';
import { getDisplacementDashLine, getProgressiveBarColor } from '../../utils/forecastHelper';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface Props {
  value: number;
  relativeValue: number;
}

const BarWithDottedLine: React.FC<Props> = ({ value, relativeValue }) => {
  const { isLight } = useThemeContext();
  const barColor = getProgressiveBarColor(value, relativeValue, isLight);
  const percent = percentageRespectTo(value, relativeValue);
  const displacement = getDisplacementDashLine(value, relativeValue);
  return (
    <Container>
      <ContainerBar>
        <BudgetBar isLight={isLight}>{<BarPercent width={percent} color={barColor} />}</BudgetBar>
        <VerticalBar displacement={displacement} />
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
  borderRadius: '6px',
  position: 'absolute',
  top: 0,
  right: `${displacement}%`,
  transform: 'rotate(180deg)',
}));

const BudgetBar = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: '100%',
  height: 6,
  overflow: 'hidden',
  borderRadius: 6,
  background: isLight ? '#ECF1F3' : 'red',
}));

const BarPercent = styled.div<{ width: number; color: string }>(({ width, color }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: color,
  borderRadius: 6,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));
const BudgetCap = styled.div<WithIsLight>(({ isLight }) => ({
  fontSize: 12,
  lineHeight: '15px',
  textAlign: 'right',
  color: isLight ? '#708390' : 'red',
}));
