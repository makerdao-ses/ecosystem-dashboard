import styled from '@emotion/styled';
import { ParenthesisNumber } from '@ses/containers/transparency-report/transparency-report';
import { useThemeContext } from '@ses/core/context/ThemeContext';
import React from 'react';

type CommentsTabProps = {
  hasNewComments: boolean;
  numbersComments: number;
};

const CommentsTab: React.FC<CommentsTabProps> = ({ hasNewComments, numbersComments }) => {
  const { isLight } = useThemeContext();
  return (
    <CommentsContainer>
      {hasNewComments && <DotIndicator isLight={isLight} />}
      <ParenthesisNumber>
        Comments<span>{`(${numbersComments})`}</span>
      </ParenthesisNumber>
    </CommentsContainer>
  );
};

export default CommentsTab;

const CommentsContainer = styled.div({
  position: 'relative',
});

const DotIndicator = styled.span<{ isLight: boolean }>(({ isLight }) => ({
  minWidth: '6px',
  minHeight: '6px',
  borderRadius: '50%',
  background: isLight ? '#F75524' : '#FF8237',
  position: 'absolute',
  top: 0,
  right: -8,
}));
