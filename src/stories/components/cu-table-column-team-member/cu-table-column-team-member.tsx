import React from 'react';
import styled from '@emotion/styled';
import { Title, Value } from '../cu-table-column-expenditures/cu-table-column-expenditures';
import { AvatarGroup, Avatar } from '@mui/material';
import { getTwoInitials } from '../../../core/utils/string.utils';
import { getColorForString } from '../../../core/utils/color.utils';
import './cu-table-column-team-member.scss';
import { CustomPopover } from '../custom-popover/custom-popover';
export interface FacilitatorModel {
  name: string,
  imageUrl?: string,
  id?: string,
}

interface CuTableColumnTeamMemberProps {
  members: FacilitatorModel[],
  facilitatorImages: {[id:string]: string},
  fte: number,
}

export const CuTableColumnTeamMember = ({ facilitatorImages, ...props }: CuTableColumnTeamMemberProps) => {
  const MemberInfo = (props: { member: FacilitatorModel }) => {
    return <MemberInfoContainer>
      <Avatar
        sx={{
          width: '32px',
          height: '32px',
          backgroundColor: getColorForString(props.member.name),
          fontSize: '1rem',
          marginRight: '8px'
        }}
        alt={props.member.name}
        src={facilitatorImages[props.member?.id ?? '']}
      >
        {getTwoInitials(props.member.name)}
      </Avatar>
      <span>{props.member.name}</span>
    </MemberInfoContainer>;
  };

  return <Container className="TeamMembers">
    <CustomPopover
      title={'FTEs = Full-Time Equivalents'}
      id={'popover-fulltime-equivalents'}
    >
      <Data>
        <Title>FTEs</Title>
        <Value style={{ justifyContent: 'center' }}>{props.fte}</Value>
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
          sx={{
            width: '32px',
            height: '32px',
            backgroundColor: getColorForString(member.name),
            fontSize: '1rem'
          }}
          alt={member.name}
          src={facilitatorImages[member?.id ?? '']}
        >
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
  fontWeight: 400,
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
