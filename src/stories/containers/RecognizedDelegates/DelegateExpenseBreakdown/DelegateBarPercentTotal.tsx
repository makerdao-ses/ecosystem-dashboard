import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/light';
import React, { useCallback, useEffect, useState } from 'react';

import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface RelativeDaiBarProps {
  totalDai: number;
  numberDai: number;
}

export const DelegateBarPercentTotal: React.FC<RelativeDaiBarProps> = ({ totalDai, numberDai }) => {
  const { isLight } = useThemeContext();
  const [percentDai, setPercentDai] = useState<number>(0);

  const updateBars = useCallback(() => {
    setPercentDai((numberDai * 100) / totalDai);
  }, [numberDai, totalDai]);

  useEffect(() => {
    updateBars();
  }, [updateBars]);

  return (
    <BudgetBar isLight={isLight}>{numberDai > 0 && <BarPercent isLight={isLight} width={percentDai} />}</BudgetBar>
  );
};

export default DelegateBarPercentTotal;

const BudgetBar = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: '100%',
  height: 12,
  overflow: 'hidden',
  borderRadius: 6,
  background: isLight ? '#ECF1F3' : '#10191F',
  boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 3px 10px rgba(23, 35, 44, 0.7)',

  [lightTheme.breakpoints.up('table_834')]: {
    height: 12,
  },
}));

const BarPercent = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: isLight ? '#0EB19F' : '#1AAB9B',
  borderRadius: 6,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));
