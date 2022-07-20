import React from 'react';
import styled from '@emotion/styled';
import { CustomPopover } from '../custom-popover/custom-popover';
import { Divider, Typography } from '@mui/material';

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
        <ContainerRow> <StyleTypography >{fte}</StyleTypography> <Divider sx={{ bgcolor: '#231536' }} /></ContainerRow>
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
  fontFamily: 'Inter,sanserif',
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '24px',
  color: '#231536',
});

const Title = styled(Typography)({
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '20px',
  lineHeight: '24px',
  color: '#231536',
  marginLeft: '8px',
  textAlign: 'center',
  fontFamily: 'FT Base, sans-serif',
  letterSpacing: '0.4px',
});

const Data = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const ContainerRow = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '4px 8px',
  borderRadius: '6px',
});

export default TeamMember;
