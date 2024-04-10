import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import lightTheme from 'styles/theme/light';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

export type HorizontalBudgetBarProps = {
  actuals: number;
  prediction: number;
  budgetCap: number;
  className?: string;
};

const HorizontalBudgetBar: React.FC<HorizontalBudgetBarProps> = ({ actuals, prediction, budgetCap, className }) => {
  const { isLight } = useThemeContext();
  const barRef = useRef<HTMLDivElement>(null);
  const [actualsWidth, setActualsWidth] = useState<number>(0);
  const [predictionWidth, setPredictionWidth] = useState<number>(0);
  const [budgetCapPosition, setBudgetCapPosition] = useState<number>(0);

  const updateBars = useCallback(() => {
    if (!barRef) return;
    const barWidth = barRef.current?.offsetWidth || 1;
    const maxPercentage = 87;
    const max = (barWidth * maxPercentage) / 100;
    const maxValue = Math.max(actuals, prediction, budgetCap) || 1;

    setActualsWidth(((actuals / maxValue) * max * maxPercentage) / max);
    setPredictionWidth(((prediction / maxValue) * max * maxPercentage) / max);
    setBudgetCapPosition(((budgetCap / maxValue) * max * maxPercentage) / max);
  }, [actuals, budgetCap, prediction]);

  useEffect(() => {
    updateBars();
  }, [updateBars]);

  return (
    <BarContainer isLight={isLight} ref={barRef} className={className}>
      {prediction > 0 && <Prediction isLight={isLight} width={predictionWidth} />}
      {actuals > 0 && <Actuals isLight={isLight} width={actualsWidth} />}
      {budgetCap > 0 && <BudgetCapLine position={budgetCapPosition} />}
    </BarContainer>
  );
};

export default HorizontalBudgetBar;

const BarContainer = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: '100%',
  height: 9,
  overflow: 'hidden',
  borderRadius: 4,
  background: isLight ? '#ECF1F3' : '#10191F',

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 16,
    borderRadius: 8,
  },
}));

const Actuals = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: isLight ? '#0EB19F' : '#027265',
  borderRadius: 4,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.85s ease-in-out',

  [lightTheme.breakpoints.up('tablet_768')]: {
    borderRadius: 8,
  },
}));

const Prediction = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: isLight ? '#68FEE3' : '#1AAB9B',
  borderRadius: 4,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.85s ease-in-out',

  [lightTheme.breakpoints.up('tablet_768')]: {
    borderRadius: 8,
  },
}));

const BudgetCapLine = styled.div<{ position: number }>(({ position }) => ({
  position: 'absolute',
  top: 0,
  left: `${position}%`,
  width: 2,
  height: '100%',
  background: '#F99374',
}));
