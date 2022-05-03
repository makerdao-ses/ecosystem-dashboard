import React from 'react';
import styled from '@emotion/styled';
import { Title, Value } from '../cutable-column-expenditures/cutable-column-expenditures';
import { AvatarGroup, Avatar } from '@mui/material';
import { getTwoInitials } from '../../../core/utils/string-utils';
import { getColorForString } from '../../../core/utils/color-utils';
import './cutable-column-team-member.scss';

interface Member {
  name: string
}

interface CutableColumnTeamMemberProps {
  members: Member[]
}

export const CutableColumnTeamMember = (props: CutableColumnTeamMemberProps) => {
  return <Container>
    <Data>
      <Title>FTEs</Title>
      <Value style={{ justifyContent: 'center' }}>{props.members.length}</Value>
    </Data>
    <AvatarGroup max={5}>
      {props.members.map((member, i) => <Avatar
        key={member.name + i}
        sx={{ width: '32px', height: '32px', backgroundColor: getColorForString(member.name), fontSize: '1rem' }}
        alt={member.name}>
        {getTwoInitials(member.name)}
      </Avatar>)}
    </AvatarGroup>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  fontFamily: 'Roboto, sans-serif'
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '8px',
});
