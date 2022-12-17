import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ParticipantRoles from './participant-roles';
import lightTheme from '../../../../../styles/theme/light';
import AuditorCommentList from './comment-list';
import {
  BudgetStatementDto,
  BudgetStatus,
  CommentsBudgetStatementDto,
} from '../../../../core/models/dto/core-unit.dto';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import { useCoreUnitContext } from '../../../../core/context/CoreUnitContext';
import CommentForm from './comment-form/comment-form';
import { useAuthContext } from '../../../../core/context/AuthContext';

export type AuditorCommentsContainerProps = {
  comments: CommentsBudgetStatementDto[];
  budgetStatement?: BudgetStatementDto;
};

const AuditorCommentsContainer: React.FC<AuditorCommentsContainerProps> = ({ budgetStatement, comments }) => {
  const { permissionManager } = useAuthContext();
  const { currentCoreUnit } = useCoreUnitContext();
  const [cuParticipants, setCuParticipants] = useState<UserDTO[]>([]);
  const [auditors, setAuditors] = useState<UserDTO[]>([]);

  useEffect(() => {
    const cu = new Map<string, UserDTO>();
    const aud = new Map<string, UserDTO>();

    for (const comment of comments) {
      if (currentCoreUnit?.auditors?.findIndex((a) => a.id === comment.author.id) !== -1) {
        aud.set(comment.author.id, comment.author);
      } else {
        cu.set(comment.author.id, comment.author);
      }
    }
    setCuParticipants(Array.from(cu.values()));
    setAuditors(Array.from(aud.values()));
  }, [comments, currentCoreUnit]);

  // if (comments.length === 0) {
  //   return <TransparencyEmptyAudit />;
  // }

  return (
    <Container>
      <CommentsContainer>
        <AuditorCommentList comments={comments} />
        {permissionManager.isAuthenticated() && permissionManager.coreUnit.canComment(currentCoreUnit || '-1') && (
          <CommentForm
            currentBudgetStatus={budgetStatement?.status || BudgetStatus.Draft}
            budgetStatementId={budgetStatement?.id?.toString() || ''}
          />
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
