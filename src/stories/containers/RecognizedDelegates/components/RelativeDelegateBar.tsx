import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import { percentageRespectTo } from '@ses/core/utils/math';
import lightTheme from '@ses/styles/theme/light';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface RelativeBarProps {
  otherExpenses: number;
  recognizedDelegates: number;
}

export const RelativeDelegateBar: React.FC<RelativeBarProps> = ({ otherExpenses, recognizedDelegates }) => {
  const { isLight } = useThemeContext();
  const percentOther = percentageRespectTo(otherExpenses, otherExpenses + recognizedDelegates);
  const percentDelegates = percentageRespectTo(recognizedDelegates, otherExpenses + recognizedDelegates);

  return (
    <DelegateBar isLight={isLight}>
      {otherExpenses > 0 && <OtherExpenses isLight={isLight} width={percentOther} />}
      {recognizedDelegates > 0 && <RecognizedDelegates isLight={isLight} width={percentDelegates} />}
    </DelegateBar>
  );
};

const DelegateBar = styled.div<WithIsLight>(({ isLight }) => ({
  position: 'relative',
  width: '100%',
  height: 24,
  overflow: 'hidden',
  borderRadius: 6,
  background: isLight ? '#ECF1F3' : '#10191F',
  alignItems: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    height: 12,
  },
}));

const OtherExpenses = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  background: isLight ? '#ECF1F3' : '#ECF1F3',

  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));

const RecognizedDelegates = styled.div<WithIsLight & { width: number }>(({ isLight, width }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  background: isLight ? '#447AFB' : '#447AFB',

  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));
