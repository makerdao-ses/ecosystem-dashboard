import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CommentEnum } from '../../../../core/enums/comment.enum';
import { getColorLineCard } from '../../../../core/utils/color.utils';
import { CommentChip } from './comment-chip';

interface Props {
  commentStatus: CommentEnum;
  code: string;
  reviewerName: string;
  date: string;
  auditor?: string;
}

const StatusCommentItem = ({ commentStatus, reviewerName, code, date, auditor = '' }: Props) => {
  const { isLight } = useThemeContext();
  const colorLine = useMemo(() => getColorLineCard(commentStatus, isLight), [commentStatus, isLight]);
  return (
    <Container isLight={isLight}>
      <ColorLine colorLine={colorLine} />
      <ContainerInside>
        <CommentChip commentStatus={commentStatus} />
        {commentStatus === CommentEnum.Draft && !auditor && (
          <TextDescription isLight={isLight}>
            {reviewerName} <span>{code} Core Unit</span> submitted on {date}
          </TextDescription>
        )}
        {commentStatus === CommentEnum.Review && !auditor && (
          <TextDescription isLight={isLight}>
            {reviewerName} <span>{code} Core Unit</span> submitted for review on {date}
          </TextDescription>
        )}

        {auditor && commentStatus === CommentEnum.Final && (
          <TextDescription isLight={isLight}>
            {auditor} <span>Auditor</span> Approved on {date}
          </TextDescription>
        )}
      </ContainerInside>
    </Container>
  );
};

const Container = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  height: '74px',
  width: '100%',
  background: isLight ? '#FFFFFF' : '#10191F',
  borderRadius: '6px',
  alignItems: 'center',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '10px 15px 20px 6px rgba(20, 0, 141, 0.1);',
}));

const ContainerInside = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '16px 32px',
  height: '100%',
});

const ColorLine = styled.div<{ colorLine: string }>(({ colorLine }) => ({
  width: '8px',
  backgroundColor: colorLine,
  height: '100%',
  float: 'left',
  borderRadius: '6px',
}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TextDescription = styled.p<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#708390',
  marginLeft: '40px',
  '> span': {
    color: '#231536',
  },
}));

export default StatusCommentItem;
