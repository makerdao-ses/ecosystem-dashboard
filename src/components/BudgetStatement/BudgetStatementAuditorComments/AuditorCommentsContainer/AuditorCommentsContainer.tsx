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
    width: 'calc(100% - 243px)',
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 'calc(100% - 246px)',
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 'calc(100% - 308px)',
  },

  [theme.breakpoints.up('desktop_1440')]: {
    width: 'calc(100% - 368px)',
  },
}));

const ParticipantsColumn = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('tablet_768')]: {
    borderTop: `1px solid ${
      theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.charcoal[800]
    }`,
    paddingTop: 16,
    width: '100%',
    marginBottom: 8,
  },

  [theme.breakpoints.up('tablet_768')]: {
    width: 219,
    marginLeft: 24,
  },

  [theme.breakpoints.up('desktop_1024')]: {
    width: 222,
  },

  [theme.breakpoints.up('desktop_1280')]: {
    width: 276,
    marginLeft: 32,
  },
}));
