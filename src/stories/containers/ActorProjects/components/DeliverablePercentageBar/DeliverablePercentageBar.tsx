import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface DeliverablePercentageBarProps {
  percentage: number;
}

const DeliverablePercentageBar: React.FC<DeliverablePercentageBarProps> = ({ percentage }) => {
  const { isLight } = useThemeContext();

  return (
    <ProgressContainer>
      <ProgressBar progress={percentage * 100} isLight={isLight} />
      <Label isLight={isLight}>{percentage * 100}%</Label>
    </ProgressContainer>
  );
};

export default DeliverablePercentageBar;

const ProgressContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 16,
  width: '100%',
});

const ProgressBar = styled.div<WithIsLight & { progress: number }>(({ isLight, progress }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  borderRadius: 6,
  overflow: 'hidden',
  background: isLight ? '#ECF1F3' : '#10191F',
  boxShadow: isLight ? '2px 4px 7px 0px rgba(26, 171, 155, 0.25)' : 'none',

  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 6,
    width: `${progress}%`,
    background: isLight ? '#6EDBD0' : '#2DC1B1',
  },
}));

const Label = styled.div<WithIsLight>(({ isLight }) => ({
  width: 44,
  minWidth: 44,
  fontSize: 14,
  lineHeight: 'normal',
  textAlign: 'right',
  color: isLight ? '#231536' : '#D2D4EF',
}));
