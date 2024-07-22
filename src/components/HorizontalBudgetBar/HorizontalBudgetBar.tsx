import { styled } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

export type HorizontalBudgetBarProps = {
  actuals: number;
  prediction: number;
  budgetCap: number;
  className?: string;
  maxPercentage?: number;
};

const HorizontalBudgetBar: React.FC<HorizontalBudgetBarProps> = ({
  actuals,
  prediction,
  budgetCap,
  className,
  maxPercentage = 87,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [actualsWidth, setActualsWidth] = useState<number>(0);
  const [predictionWidth, setPredictionWidth] = useState<number>(0);
  const [budgetCapPosition, setBudgetCapPosition] = useState<number>(0);

  const updateBars = useCallback(() => {
    if (!barRef) return;
    const barWidth = barRef.current?.offsetWidth || 1;
    const max = (barWidth * maxPercentage) / 100;
    const maxValue = Math.max(actuals, prediction, budgetCap) || 1;

    setActualsWidth(((actuals / maxValue) * max * maxPercentage) / max);
    setPredictionWidth(((prediction / maxValue) * max * maxPercentage) / max);
    setBudgetCapPosition(((budgetCap / maxValue) * max * maxPercentage) / max);
  }, [actuals, budgetCap, maxPercentage, prediction]);

  useEffect(() => {
    updateBars();
  }, [updateBars]);

  return (
    <BarContainer ref={barRef} className={className}>
      {prediction > 0 && <Prediction data-type="prediction" width={predictionWidth} />}
      {actuals > 0 && <Actuals data-type="actuals" width={actualsWidth} />}
      {budgetCap > 0 && <BudgetCapLine data-type="budget" position={budgetCapPosition} />}
    </BarContainer>
  );
};

export default HorizontalBudgetBar;

const BarContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 9,
  overflow: 'hidden',
  borderRadius: 8,
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : '#232832',

  [theme.breakpoints.up('tablet_768')]: {
    height: 16,
  },
}));

const Actuals = styled('div')<{ width: number }>(({ theme, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: theme.palette.isLight ? theme.palette.colors.green[600] : theme.palette.colors.green[900],
  borderRadius: 8,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.85s ease-in-out',
}));

const Prediction = styled('div')<{ width: number }>(({ theme, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: theme.palette.isLight ? '#68FEE3' : '#1AAB9B',
  borderRadius: 8,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.85s ease-in-out',
}));

const BudgetCapLine = styled('div')<{ position: number }>(({ theme, position }) => ({
  position: 'absolute',
  top: 0,
  left: `${position}%`,
  width: 1,
  height: '100%',
  background: theme.palette.isLight ? theme.palette.colors.red[700] : theme.palette.colors.red[900],
}));
