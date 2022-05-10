import React from 'react';
import styled from '@emotion/styled';
import { CustomPopover } from '../custom-popover/custom-popover';
import { Typography } from '@mui/material';

interface Props {
  fte: number,
}

const TeamMember = ({ fte }: Props) => {
  return <Container>
    <CustomPopover
      title={'FTE = Permanent contributor fulltime equivalent'}
      id={'popover-fulltime equivalent'}
    >
      <Data>
        <StyleTypography >{fte}</StyleTypography>
        <Title>FTEs</Title>
      </Data>
    </CustomPopover>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  fontFamily: 'Inter',
  fontWeight: 400,
  cursor: 'pointer',

});

const StyleTypography = styled(Typography)`
font-family:'Inter';
font-style: normal;
font-weight: 700;
font-size: 20px;
line-height: 24px;
color: #25273D;
text-decoration:underline;
`;

const Title = styled(Typography)`
  font-family:'Inter';
font-style: normal;
font-weight: 700;
font-size: 14px;
line-height: 17px;
color: #000000;
margin-left:16px ;
text-align:center ;
`;

const Data = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export default TeamMember;
