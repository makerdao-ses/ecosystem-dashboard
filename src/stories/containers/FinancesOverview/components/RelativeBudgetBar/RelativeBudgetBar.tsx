import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface RelativeBudgetBarProps {
  budgetCap: number;
  actuals: number;
  prediction: number;
}

const RelativeBudgetBar: React.FC<RelativeBudgetBarProps> = ({ budgetCap, actuals, prediction }) => {
  const { isLight } = useThemeContext();
  const barRef = useRef<HTMLDivElement>(null);
  const [actualsWidth, setActualsWidth] = useState<number>(0);
  const [predictionWidth, setPredictionWidth] = useState<number>(0);

  const updateBars = useCallback(() => {
    if (!barRef) return;
    const barWidth = barRef.current?.offsetWidth || 1;
    const maxPercentage = 87;
    const max = (barWidth * maxPercentage) / 100;
    const maxValue = Math.max(actuals, prediction, budgetCap) || 1;

    setActualsWidth(((actuals / maxValue) * max * maxPercentage) / max);
    setPredictionWidth(((prediction / maxValue) * max * maxPercentage) / max);
  }, [actuals, budgetCap, prediction]);

  useEffect(() => {
    updateBars();
  }, [updateBars]);

  return (
    <BudgetBar isLight={isLight} ref={barRef}>
      {prediction > 0 && <Prediction isLight={isLight} width={predictionWidth} />}
      {actuals > 0 && <Actuals isLight={isLight} width={actualsWidth} />}
    </BudgetBar>
  );
};

export default RelativeBudgetBar;

const BudgetBar = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: '100%',
  height: 24,
  overflow: 'hidden',
  borderRadius: 6,
  background: isLight ? '#ECF1F3' : '#10191F',
  boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 3px 10px rgba(23, 35, 44, 0.7)',

  [lightTheme.breakpoints.up('table_834')]: {
    height: 12,
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
}));
