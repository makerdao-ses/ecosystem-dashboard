import React from 'react';
import styled from '@emotion/styled';
import ParticipantRoles from './participant-roles';
import lightTheme from '../../../../../styles/theme/light';
import AuditorCommentList from './comment-list';

const AuditorCommentsContainer: React.FC = () => {
  return (
    <Container>
      <AuditorCommentList />
      <ParticipantsColumn>
        <ParticipantRoles />
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
