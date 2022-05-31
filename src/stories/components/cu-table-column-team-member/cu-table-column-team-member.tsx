import React from 'react';
import styled from '@emotion/styled';
import { Title } from '../cu-table-column-expenditures/cu-table-column-expenditures';
import { Typography } from '@mui/material';
import './cu-table-column-team-member.scss';
import { CustomPopover } from '../custom-popover/custom-popover';
import { FacilitatorModel } from '../../../core/models/facilitator.model';
import { CircleAvatar } from '../circle-avatar/circle-avatar';

interface CuTableColumnTeamMemberProps {
  members: FacilitatorModel[],
  facilitatorImages: { [id: string]: string },
  fte: number,
}

export const CuTableColumnTeamMember = ({ facilitatorImages, ...props }: CuTableColumnTeamMemberProps) => {
  const MemberInfo = (props: { member: FacilitatorModel }) => {
    return <MemberInfoContainer>
      <CircleAvatar key={props.member.name}
                    name={props.member.name}
                    image={facilitatorImages[props.member?.id ?? '']}
                    fontSize={'14px'}
                    width={'32px'}
                    imageStyle={{ border: '2px solid #E7FCFA' }}
                    height={'32px'}/>
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
    <CirclesWrapper>
      {props.members.map((member, i) => <CustomPopover
        key={member.name + i}
        title={<MemberInfo member={member}/>}
        id={member.name + i}>
        <CircleAvatar key={member.name}
                      name={member.name}
                      fontSize={'14px'}
                      width={'32px'}
                      height={'32px'}
                      imageStyle={{
                        marginLeft: i === 0 ? 0 : '-9px',
                        border: '2px solid #E7FCFA'
                      }}
                      image={facilitatorImages[member?.id ?? '']}/>
      </CustomPopover>)}
    </CirclesWrapper>
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
  alignItems: 'center',
  marginRight: '16px',
});

const MemberInfoContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  overflow: 'hidden',
  '> span': {
    marginLeft: '10.5px'
  }
});

const CirclesWrapper = styled.div({
  display: 'flex',
});

const Value = styled(Typography)({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#25273D',
});
