import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import lightTheme from '@ses/styles/theme/themes';
import React, { useCallback, useEffect, useState } from 'react';

import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface RelativeDaiBarProps {
  total: number;
  value: number;
  className?: string;
}

export const BarPercentRelativeToTotal: React.FC<RelativeDaiBarProps> = ({ className, total, value }) => {
  const { isLight } = useThemeContext();
  const [percent, setPercent] = useState<number>(0);

  const updateBars = useCallback(() => {
    setPercent((value * 100) / total);
  }, [total, value]);

  useEffect(() => {
    updateBars();
  }, [updateBars]);

  return (
    <BudgetBar className={className} isLight={isLight}>
      {value > 0 && <BarPercent isLight={isLight} width={percent} />}
    </BudgetBar>
  );
};

export default BarPercentRelativeToTotal;

const BudgetBar = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: '100%',
  height: 17,
  overflow: 'hidden',
  borderRadius: 6,
  background: isLight ? '#ECF1F3' : '#1E2C37',
  boxShadow: isLight ? '2px 4px 7px rgba(26, 171, 155, 0.25)' : '2px 3px 10px rgba(23, 35, 44, 0.7)',
  [lightTheme.breakpoints.up('table_834')]: {
    height: 19,
  },
}));

const BarPercent = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  background: isLight ? '#0EB19F' : '#027265',
  borderRadius: 6,
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));
