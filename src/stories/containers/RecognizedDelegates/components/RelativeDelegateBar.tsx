import styled from '@emotion/styled';
import { percentageRespectTo } from '@ses/core/utils/math';
import lightTheme from '@ses/styles/theme/themes';
import React from 'react';

interface RelativeBarProps {
  otherExpenses: number;
  recognizedDelegates: number;
}

export const RelativeDelegateBar: React.FC<RelativeBarProps> = ({ otherExpenses, recognizedDelegates }) => {
  const percentOther = percentageRespectTo(otherExpenses, otherExpenses + recognizedDelegates);
  const percentDelegates = percentageRespectTo(recognizedDelegates, otherExpenses + recognizedDelegates);

  return (
    <DelegateBar>
      {otherExpenses > 0 && <OtherExpenses width={percentOther} />}
      {recognizedDelegates > 0 && <RecognizedDelegates width={percentDelegates} />}
    </DelegateBar>
  );
};

const DelegateBar = styled.div({
  position: 'relative',
  width: '100%',
  height: 24,
  overflow: 'hidden',
  borderRadius: 6,

  background: '#D2D4EF',
  alignItems: 'center',

  [lightTheme.breakpoints.up('table_834')]: {
    height: 12,
  },
});

const OtherExpenses = styled.div<{ width: number }>(({ width }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  background: '#D2D4EF',

  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));

const RecognizedDelegates = styled.div<{ width: number }>(({ width }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  background: '#447AFB',
  width: `${width}%`,
  height: '100%',
  transition: 'width 0.5s ease-in-out',
}));
