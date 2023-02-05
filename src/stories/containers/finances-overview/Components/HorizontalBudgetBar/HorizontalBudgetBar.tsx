import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import lightTheme from 'styles/theme/light';
import type { WithIsLight } from '@ses/core/utils/types-helpers';

export type HorizontalBudgetBarProps = {
  actuals: number;
  prediction: number;
  budgetCap: number;
};

// disable unused variable till this implementation is finished
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const HorizontalBudgetBar: React.FC<HorizontalBudgetBarProps> = ({ actuals, prediction, budgetCap }) => {
  const { isLight } = useThemeContext();

  return (
    <BarContainer isLight={isLight}>
      {prediction - actuals > 0 && <Difference isLight={isLight} width={40 + 15} />}
      <Actuals isLight={isLight} width={40} />
      <BudgetCapLine />
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

  [lightTheme.breakpoints.up('table_834')]: {
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

  [lightTheme.breakpoints.up('table_834')]: {
    borderRadius: 8,
  },
}));

const Difference = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: isLight ? '#68FEE3' : '#1AAB9B',
  borderRadius: 4,
  width: `calc(${width}% - 4px)`,
  height: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    borderRadius: 8,
  },
}));

const BudgetCapLine = styled.div({
  position: 'absolute',
  top: 0,
  right: 19,
  width: 1,
  height: '100%',
  background: '#F75524',
});
