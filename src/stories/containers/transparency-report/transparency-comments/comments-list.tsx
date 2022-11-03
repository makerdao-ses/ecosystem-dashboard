import styled from '@emotion/styled';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import Comments from '../../../components/svg/comments';
import CommentItem from './comment-item';
import { Dictionary } from 'lodash';
import { CommentsDto } from '../../../../core/models/dto/core-unit.dto';
import { DateTime } from 'luxon';

interface Props {
  comments: Dictionary<CommentsDto[]>;
  code: string;
}
export const ListItemsComments = ({ comments, code }: Props) => {
  const { isLight } = useThemeContext();

  return (
    <Container>
      {Object.keys(comments).map((comment) => (
        <div key={comment}>
          <ContainerSummaryDate>
            <ActualDate isLight={isLight}>{DateTime.fromISO(comment).toFormat('dd-MMM-y')}</ActualDate>

            <Comments />

            <NumberComments isLight={isLight}>{`${
              comments[comment]?.length === 1 ? '1 Comment' : `${comments[comment].length} Comments`
            }`}</NumberComments>
          </ContainerSummaryDate>
          {comments[comment]?.map((comment: CommentsDto) => {
            return (
              <ContainerList key={comment.comment}>
                <CommentItem comment={comment} code={code} />
              </ContainerList>
            );
          })}
        </div>
      ))}
    </Container>
  );
};

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ContainerSummaryDate = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: '16px',
  paddingLeft: '16px',
});

const ActualDate = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: isLight ? '#231536' : '#D2D4EF',
  marginRight: '18px',
}));

const NumberComments = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: isLight ? '#231536' : '#D2D4EF',
  marginLeft: '6px',
}));

const ContainerList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '32px',
});
