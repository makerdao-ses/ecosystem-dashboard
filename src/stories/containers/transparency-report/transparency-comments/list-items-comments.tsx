import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import React from 'react';
import { CuCommentDto } from '../../../../core/models/dto/core-unit-comment.dto';
import Comments from '../../../components/svg/comments';
import CommentItem from './comment-item';

interface Props {
  comments: CuCommentDto[];
  actualDate: Date;
  code: string;
}
export const ListItemsComments = ({ comments, actualDate, code }: Props) => {
  return (
    <Container>
      <ContainerSummaryDate>
        <ActualDate>{`${DateTime.fromJSDate(actualDate).toFormat('d-MMM-y')}`}</ActualDate>

        <Comments />

        <NumberComments>{`${comments.length || 0} Comments`}</NumberComments>
      </ContainerSummaryDate>
      {comments?.map((comment) => {
        return <CommentItem comment={comment} code={code} />;
      })}
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
});

const ActualDate = styled.div({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#231536',
  marginRight: '18px',
});

const NumberComments = styled.div({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: '#231536',
  marginLeft: '6px',
});
