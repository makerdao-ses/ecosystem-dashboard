import styled from '@emotion/styled';
import { DateTime } from 'luxon';
import Markdown from 'marked-react';
import lightTheme from '../../../../../styles/theme/light';
import { useThemeContext } from '../../../../core/context/ThemeContext';
import { CuCommentDto } from '../../../../core/models/dto/comments.dto';
import { customRenderer, customRendererDark } from '../../../components/markdown/renderUtils';

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
      <ContainerCommentDate>
        {isLight ? (
          <Markdown value={comment?.comment} renderer={customRenderer} />
        ) : (
          <Markdown value={comment?.comment} renderer={customRendererDark} />
        )}
      </ContainerCommentDate>
    </CommentItemContainer>
  );
};

const CommentItemContainer = styled.div<{ isLight: boolean; isLoading?: boolean }>(({ isLight }) => ({
  fontFamily: 'Inter, sans-serif',
  display: 'flex',
  flexDirection: 'column',
  background: isLight ? 'white' : '#10191F',
  paddingTop: '16px',
  paddingRight: '16px',
  paddingLeft: '16px',
  paddingBottom: '32px',
  boxShadow: isLight
    ? '0px 20px 40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)'
    : '0px 20px 40px rgba(7, 22, 40, 0.4), 0px 1px 3px rgba(30, 23, 23, 0.25)',
  [lightTheme.breakpoints.up('table_834')]: {
    paddingRight: '32px',
    paddingLeft: '32px',
  },
}));

const UTCDate = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  display: 'flex',
  flexDirection: 'row',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: isLight ? '#708390' : '#546978',
  width: 243,
  [lightTheme.breakpoints.up('table_834')]: {
    width: '100%',
  },
}));

const Line = styled.div<{ isLight: boolean }>(({ isLight }) => ({
  height: '1px',
  width: '100%',
  background: isLight ? '#D4D9E1' : '#405361',
  marginTop: '16px',
}));

const ContainerCommentDate = styled.div({
  marginTop: '2px',
});

export default CommentItem;
