import React from 'react';
import styled from '@emotion/styled';
import { Title } from '../cu-table-column-expenditures/cu-table-column-expenditures';
import { CustomPopover } from '../custom-popover/custom-popover';
import { FacilitatorModel } from '../../../core/models/facilitator.model';
import { CircleAvatar } from '../circle-avatar/circle-avatar';

interface CuTableColumnTeamMemberProps {
  members: FacilitatorModel[],
  facilitatorsDescription: { [id: string]: { name: string, image: string} },
  fte: number,
}

export const CuTableColumnTeamMember = ({ facilitatorsDescription, ...props }: CuTableColumnTeamMemberProps) => {
  const MemberInfo = (props: { member: FacilitatorModel }) => {
    return <MemberInfoContainer>
      <CircleAvatar key={facilitatorsDescription[props.member?.id ?? '']?.name ?? ''}
                    name={facilitatorsDescription[props.member?.id ?? '']?.name ?? ''}
                    image={facilitatorsDescription[props.member?.id ?? '']?.image ?? ''}
                    fontSize={'14px'}
                    width={'32px'}
                    imageStyle={{ border: '2px solid #E7FCFA' }}
                    height={'32px'}/>
      <span>{facilitatorsDescription[props.member?.id ?? '']?.name}</span>
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
                      style={{
                        marginLeft: i === 0 || (facilitatorsDescription[member?.id ?? '']) ? 0 : '-9px',
                        border: !(facilitatorsDescription[member?.id ?? '']) ? '2px solid #E7FCFA' : 'none'
                      }}
                      imageStyle={{
                        marginLeft: i === 0 ? 0 : '-9px',
                        border: '2px solid #E7FCFA'
                      }}
                      image={facilitatorsDescription[member?.id ?? '']?.image ?? ''}/>
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
  marginRight: '8px',
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

const Value = styled.div({
  fontFamily: 'SF Pro Display, sans-serif',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#231536',
});
