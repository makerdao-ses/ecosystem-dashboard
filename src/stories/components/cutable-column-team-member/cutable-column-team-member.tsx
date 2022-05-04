import React from 'react';
import styled from '@emotion/styled';
import { Title, Value } from '../cutable-column-expenditures/cutable-column-expenditures';
import { AvatarGroup, Avatar } from '@mui/material';
import { getTwoInitials } from '../../../core/utils/string-utils';
import { getColorForString } from '../../../core/utils/color-utils';
import './cutable-column-team-member.scss';
import { CustomPopover } from '../custom-popover/custom-popover';

interface Member {
  name: string
}

interface CutableColumnTeamMemberProps {
  members: Member[]
}

export const CutableColumnTeamMember = (props: CutableColumnTeamMemberProps) => {
  return <Container className="TeamMembers">
    <CustomPopover
      title={'FTEs = Full-Time Equivalents'}
      id={'popover-fulltime-equivalents'}
    >
      <Data>
        <Title>FTEs</Title>
        <Value style={{ justifyContent: 'center' }}>{props.members.length}</Value>
      </Data>
    </CustomPopover>
    <AvatarGroup max={5}>
      {props.members.map((member, i) => <CustomPopover
        css={{ marginLeft: '-8px' }}
        key={member.name + i}
        title={<MemberInfo member={member}/>}
        id={`${member.name}-${i}`}
      >
          <Avatar
          sx={{ width: '32px', height: '32px', backgroundColor: getColorForString(member.name), fontSize: '1rem' }}
          alt={member.name}>
          {getTwoInitials(member.name)}
        </Avatar>
      </CustomPopover>)}
    </AvatarGroup>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  fontFamily: 'Roboto, sans-serif',
  cursor: 'pointer',
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'column',
  marginRight: '16px',
});

const MemberInfoContainer = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const MemberInfo = (props: { member: Member }) => {
  return <MemberInfoContainer>
    <Avatar
      sx={{ width: '32px', height: '32px', backgroundColor: getColorForString(props.member.name), fontSize: '1rem', marginRight: '8px' }}
      alt={props.member.name}>
      {getTwoInitials(props.member.name)}
    </Avatar>
    <span>{props.member.name}</span>
  </MemberInfoContainer>;
};
