import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import Markdown from 'marked-react';
import lightTheme from '../../../../../styles/theme/light';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CuCommentDto } from '../../../../core/models/dto/core-unit-comment.dto';
import { customRenderer } from '../../../components/markdown/renderUtils';

interface Props {
  comment: CuCommentDto;
  code: string;
}
const CommentItem = ({ comment, code }: Props) => {
  const isLight = useThemeContext().themeMode === 'light';

  return (
    <CommentItemContainer isLight={isLight}>
      <UTCDate isLight={isLight}>
        {`Comment on ${DateTime.fromISO(comment.commentDate ?? '')
          .setZone('UTC')
          .toFormat('dd-LLL-y HH:hh ZZZZ')} by the ${code} Core Unit`}
      </UTCDate>
      <Line isLight={isLight} />
      <ContainerComment>
        <Markdown value={comment?.comment} renderer={customRenderer} />
      </ContainerComment>
    </CommentItemContainer>
  );
};

const CommentItemContainer = styled.div<{ isLight: boolean; isLoading?: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  background: isLight ? 'white' : '#10191F',
  marginTop: '16px',
  paddingTop: '16px',
  paddingBottom: '32px',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
}));

const UTCDate = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: isLight ? '#708390' : '#546978',
  marginLeft: '32px',
  marginRight: '32px',

  [lightTheme.breakpoints.up('table_834')]: {
    marginBottom: '4px',
  },
}));

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  height: '1px',
  width: '100%',
  background: isLight ? '#D4D9E1' : '#405361',
  marginTop: '16px',
  marginBottom: '16px',
}));

const ContainerComment = styled.div({
  marginLeft: '32px',
  marginRight: '32px',
});

export default CommentItem;
