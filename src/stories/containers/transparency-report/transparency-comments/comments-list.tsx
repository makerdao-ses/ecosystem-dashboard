import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CuCommentDto } from '../../../../core/models/dto/comments.dto';
import Comments from '../../../components/svg/comments';
import CommentItem from './comment-item';
import { Dictionary } from 'lodash';

interface Props {
  comments: Dictionary<CuCommentDto[]>;
  code: string;
}
export const ListItemsComments = ({ comments, code }: Props) => {
  const numberComments = (key: string, comments: Dictionary<CuCommentDto[]>) => {
    const arrayResult = comments[key];
    return arrayResult.length;
  };

  const isLight = useThemeContext().themeMode === 'light';
  return (
    <Container>
      {Object.keys(comments).map((comment, index, key) => (
        <div>
          <ContainerSummaryDate>
            <ActualDate isLight={isLight}>{`${DateTime.fromISO(key[index]).toFormat('dd-MMM-y')}`}</ActualDate>

            <Comments />

            <NumberComments isLight={isLight}>{`${numberComments(key[index], comments) || 0} Comments`}</NumberComments>
          </ContainerSummaryDate>
          {comments[key[index]]?.map((comment) => {
            return (
              <ContainerList>
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
