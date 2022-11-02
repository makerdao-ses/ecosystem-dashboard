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
  currentMonth: DateTime;
}
export const ListItemsComments = ({ comments, code, currentMonth }: Props) => {
  const { isLight } = useThemeContext();
  const numberComments = (key: string, comments: Dictionary<CommentsDto[]>, currentMonth: DateTime) => {
    const arrayResult = comments[key];
    const arrayFilter = arrayResult.filter(
      (comment) =>
        DateTime.fromISO(comment.timestamp).month === currentMonth.month &&
        DateTime.fromISO(comment.timestamp).year === currentMonth.year
    );
    return arrayFilter.length;
  };

  return (
    <Container>
      {Object.keys(comments).map((comment, index: number, key: string[]) => (
        <div key={index}>
          <ContainerSummaryDate>
            <ActualDate isLight={isLight}>{comment}</ActualDate>

            <Comments />

            <NumberComments isLight={isLight}>{`${
              numberComments(key[index], comments, currentMonth) === 0
                ? '0 Comment'
                : numberComments(key[index], comments, currentMonth) === 1
                ? '1 Comment'
                : `${numberComments(key[index], comments, currentMonth)} Comments`
            }`}</NumberComments>
          </ContainerSummaryDate>
          {comments[key[index]]?.map((comment: CommentsDto) => {
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
