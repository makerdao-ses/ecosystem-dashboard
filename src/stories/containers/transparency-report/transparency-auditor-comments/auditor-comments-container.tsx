import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import ParticipantRoles from './participant-roles';
import lightTheme from '../../../../../styles/theme/light';
import AuditorCommentList from './comment-list';
import { CommentsBudgetStatementDto } from '../../../../core/models/dto/core-unit.dto';
import { TransparencyEmptyAudit } from '../placeholders/transparenct-empty-audit';
import { UserDTO } from '../../../../core/models/dto/auth.dto';
import { useCoreUnitContext } from '../../../../core/context/CoreUnitContext';

export type AuditorCommentsContainerProps = {
  comments: CommentsBudgetStatementDto[];
};

const AuditorCommentsContainer: React.FC<AuditorCommentsContainerProps> = ({ comments }) => {
  const [cuParticipants, setCuParticipants] = useState<UserDTO[]>([]);
  const [auditors, setAuditors] = useState<UserDTO[]>([]);
  const { currentCoreUnit } = useCoreUnitContext();

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

  if (comments.length === 0) {
    return <TransparencyEmptyAudit />;
  }

  return (
    <Container>
      <AuditorCommentList comments={comments} />
      <ParticipantsColumn>
        <ParticipantRoles cu={cuParticipants} auditors={auditors} />
      </ParticipantsColumn>
    </Container>
  );
};

export default AuditorCommentsContainer;

const Container = styled.div({
  display: 'grid',
  gridTemplateColumns: 'auto',

  [lightTheme.breakpoints.up('table_834')]: {
    gridTemplateColumns: 'auto auto',
  },
});

const ParticipantsColumn = styled.div({
  [lightTheme.breakpoints.down('table_834')]: {
    borderTop: '1px solid #D4D9E1',
    paddingTop: 32,
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
