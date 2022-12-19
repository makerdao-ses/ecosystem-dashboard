import React from 'react';
import styled from '@emotion/styled';
import ParticipantRoles from '../participant-roles';
import lightTheme from '../../../../../../styles/theme/light';
import AuditorCommentList from '../comment-list';
import {
  ActivityFeedDto,
  BudgetStatementDto,
  CommentsBudgetStatementDto,
} from '../../../../../core/models/dto/core-unit.dto';
import CommentForm from '../comment-form/comment-form';
import { TransparencyEmptyAudit } from '../../placeholders/transparency-empty-audit';
import useCommentsContainer from './useCommentsContainer';

export type AuditorCommentsContainerProps = {
  comments: (CommentsBudgetStatementDto | ActivityFeedDto)[];
  budgetStatement?: BudgetStatementDto;
};

const AuditorCommentsContainer: React.FC<AuditorCommentsContainerProps> = ({ budgetStatement, comments }) => {
  const { cuParticipants, auditors, canComment, currentBudgetStatus } = useCommentsContainer(comments, budgetStatement);

  return (
    <Container>
      <CommentsContainer>
        {comments.length === 0 && !canComment ? (
          <TransparencyEmptyAudit />
        ) : (
          <>
            <AuditorCommentList comments={comments} />
            {canComment && (
              <CommentForm
                currentBudgetStatus={currentBudgetStatus}
                budgetStatementId={budgetStatement?.id?.toString() || ''}
              />
            )}
          </>
        )}
      </CommentsContainer>
      <ParticipantsColumn>
        <ParticipantRoles cu={cuParticipants} auditors={auditors} />
      </ParticipantsColumn>
    </Container>
  );
};

export default AuditorCommentsContainer;

const Container = styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  position: 'relative',
});

const CommentsContainer = styled.div({
  width: '100%',

  [lightTheme.breakpoints.up('table_834')]: {
    width: 'calc(100% - 225px)',
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 'calc(100% - 264px)',
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    width: 'calc(100% - 272px)',
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    width: 'calc(100% - 280px)',
  },
});

const ParticipantsColumn = styled.div({
  [lightTheme.breakpoints.down('table_834')]: {
    borderTop: '1px solid #D4D9E1',
    paddingTop: 32,
    width: '100%',
  },

  [lightTheme.breakpoints.up('table_834')]: {
    width: 201,
    marginLeft: 24,
  },

  [lightTheme.breakpoints.up('desktop_1194')]: {
    width: 240,
  },

  [lightTheme.breakpoints.up('desktop_1280')]: {
    marginLeft: 32,
  },

  [lightTheme.breakpoints.up('desktop_1440')]: {
    marginLeft: 40,
  },
});
