import { styled } from '@mui/material';
import AuditorCommentList from '../AuditorCommentList';
import CommentForm from '../CommentForm/CommentForm';
import NoComments from '../NoComments';
import ParticipantRoles from '../ParticipantRoles';
import useCommentsContainer from './useCommentsContainer';
import type { ChangeTrackingEvent } from '@ses/core/models/interfaces/activity';
import type { BudgetStatement } from '@ses/core/models/interfaces/budgetStatement';
import type { BudgetStatementComment } from '@ses/core/models/interfaces/budgetStatementComment';
import type { ResourceType } from '@ses/core/models/interfaces/types';

export type AuditorCommentsContainerProps = {
  comments: (BudgetStatementComment | ChangeTrackingEvent)[];
  budgetStatement?: BudgetStatement;
  resource: ResourceType;
};

const AuditorCommentsContainer: React.FC<AuditorCommentsContainerProps> = ({ budgetStatement, comments, resource }) => {
  const { cuParticipants, auditors, canComment, currentBudgetStatus, coreUnitCode } = useCommentsContainer(
    comments,
    resource,
    budgetStatement
  );

  return (
    <Container>
      <CommentsContainer>
        {!budgetStatement || (comments.length === 0 && !canComment) ? (
          <NoComments />
        ) : (
          <>
            <AuditorCommentList comments={comments} resource={resource} />
            {canComment && (
              <CommentForm
                currentBudgetStatus={currentBudgetStatus}
                budgetStatementId={budgetStatement?.id?.toString() || ''}
                resource={resource}
              />
            )}
          </>
        )}
      </CommentsContainer>
      <ParticipantsColumn>
        <ParticipantRoles cu={cuParticipants} auditors={auditors} teamShortCode={coreUnitCode} resource={resource} />
      </ParticipantsColumn>
    </Container>
  );
};

export default AuditorCommentsContainer;

const Container = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  position: 'relative',
});

const CommentsContainer = styled('div')(({ theme }) => ({
  width: '100%',

  [theme.breakpoints.up('tablet_768')]: {
    width: 'calc(100% - 225px)',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 'calc(100% - 264px)',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 'calc(100% - 272px)',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 'calc(100% - 280px)',
  },
}));

const ParticipantsColumn = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('tablet_768')]: {
    borderTop: theme.palette.isLight ? '1px solid #D4D9E1' : '1px solid  #405361',
    paddingTop: 32,
    width: '100%',
    marginBottom: 8,
  },

  [theme.breakpoints.up('tablet_768')]: {
    width: 201,
    marginLeft: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 240,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    marginLeft: 32,
  },

  [theme.breakpoints.up('desktop_1440')]: {
    marginLeft: 40,
  },
}));
