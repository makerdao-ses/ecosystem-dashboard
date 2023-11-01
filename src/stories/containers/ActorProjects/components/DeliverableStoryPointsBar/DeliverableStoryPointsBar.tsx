import styled from '@emotion/styled';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';
import type { WithIsLight } from '@ses/core/utils/typesHelpers';

interface DeliverableStoryPointsBarProps {
  total: number;
  completed: number;
}

const DeliverableStoryPointsBar: React.FC<DeliverableStoryPointsBarProps> = ({ total, completed }) => {
  const { isLight } = useThemeContext();

  return (
    <ProgressContainer>
      <ProgressBar compacted={total > 10}>
        {Array.from({ length: total }).map((_, index) => (
          <StoryPoint key={index} completed={index < completed} isLight={isLight} />
        ))}
      </ProgressBar>
      <Label isLight={isLight}>
        <Completed isLight={isLight}>{completed}</Completed> of {total}
      </Label>
    </ProgressContainer>
  );
};

export default DeliverableStoryPointsBar;

const ProgressContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  height: 16,
  width: '100%',
});

const ProgressBar = styled.div<{ compacted: boolean }>(({ compacted }) => ({
  display: 'flex',
  gap: compacted ? 2 : 4,
  alignItems: 'center',
  height: '100%',
  width: '100%',
}));

const StoryPoint = styled.div<WithIsLight & { completed: boolean }>(({ isLight, completed }) => ({
  width: '100%',
  height: '100%',
  borderRadius: 4,
  background: completed ? (isLight ? '#6EDBD0' : 'red') : isLight ? '#ECF1F3' : 'red',
  boxShadow: isLight ? '2px 4px 7px 0px rgba(26, 171, 155, 0.25)' : '2px 4px 7px 0px red',
}));

const Label = styled.div<WithIsLight>(({ isLight }) => ({
  width: 'fit-content',
  minWidth: 'fit-content',
  fontSize: 14,
  lineHeight: 'normal',
  fontWeight: 500,
  textAlign: 'right',
  color: isLight ? '#231536' : 'red',
}));

const Completed = styled.span<WithIsLight>(({ isLight }) => ({
  color: isLight ? '#6EDBD0' : 'red',
  fontWeight: 700,
}));
