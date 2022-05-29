import React from 'react';
import styled from '@emotion/styled';
import { Title } from '../cu-table-column-expenditures/cu-table-column-expenditures';
import { Theme, Typography } from '@mui/material';
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
      <Circle key={props.member.name} name={props.member.name}>
        {getTwoInitials(props.member.name)}
      </Circle>
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
      {props.members.map((member, i) => <CustomPopover key={member.name + i} title={<MemberInfo member={member}/>} id={member.name + i}>
        <Circle name={member.name} style={{
          marginLeft: i === 0 ? 0 : '-9px'
        }}>
        {getTwoInitials(member.name)}
      </Circle>
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
  '> span': {
    marginLeft: '10.5px'
  }
});

const CirclesWrapper = styled.div({
  display: 'flex',
});

const Circle = styled.div<{ name: string }>(({ theme, name }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: '2px solid #E7FCFA',
  display: 'block',
  textAlign: 'center',
  lineHeight: '30px',
  fontFamily: (theme as Theme).typography.fontFamily,
  fontWeight: 900,
  fontSize: '14px',
  color: 'white',
  background: getColorForString(name)
}));

const Value = styled(Typography)({
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#25273D',
});
