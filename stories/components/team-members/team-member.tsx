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
  fontWeight: 400,
  cursor: 'pointer',

});

const StyleTypography = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
  color: '#25273D',
  textDecoration: 'underline'
});

const Title = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '17px',
  color: '#000000',
  marginLeft: '16px',
  textAlign: 'center'
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export default TeamMember;
