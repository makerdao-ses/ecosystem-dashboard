import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface RelativeBudgetBarProps {
  discontinued: number;
  actuals: number;
  prediction: number;
  maxPercentage?: number;
}

const RelativeBudgetBar: React.FC<RelativeBudgetBarProps> = ({
  discontinued,
  actuals,
  prediction,
  maxPercentage = 100,
}) => {
  const { isLight } = useThemeContext();
  const barRef = useRef<HTMLDivElement>(null);
  const [discontinuedWidth, setDiscontinuedWidth] = useState<number>(0);
  const [actualsWidth, setActualsWidth] = useState<number>(0);
  const [predictionWidth, setPredictionWidth] = useState<number>(0);

  const updateBars = useCallback(() => {
    if (!barRef) return;
    const barWidth = barRef.current?.offsetWidth || 1;
    const max = (barWidth * maxPercentage) / 100;
    const maxValue = Math.max(actuals, prediction, discontinued) || 1;

    setActualsWidth(((actuals / maxValue) * max * maxPercentage) / max);
    setPredictionWidth(((prediction / maxValue) * max * maxPercentage) / max);
    setDiscontinuedWidth(((discontinued / maxValue) * max * maxPercentage) / max);
  }, [actuals, discontinued, prediction, maxPercentage]);

  useEffect(() => {
    updateBars();
  }, [updateBars]);

  return (
    <BudgetBar isLight={isLight} ref={barRef}>
      {prediction > 0 && <Prediction isLight={isLight} width={predictionWidth} />}
      {actuals > 0 && <Actuals isLight={isLight} width={actualsWidth} />}
      {discontinued > 0 && <Discontinued isLight={isLight} width={discontinuedWidth} />}
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

  [lightTheme.breakpoints.up('tablet_768')]: {
    height: 12,
  },
}));

const Actuals = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: isLight ? '#0EB19F' : '#027265',
  borderRadius: 6,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));

const Prediction = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: isLight ? '#68FEE3' : '#1AAB9B',
  borderRadius: 6,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));

const Discontinued = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: isLight ? '#027265' : '#2C3F3B',
  borderRadius: 6,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));
