import React from 'react';
import styled from '@emotion/styled';
import { CustomPopover } from '../custom-popover/custom-popover';
import { Typography } from '@mui/material';

interface CutableColumnInitiativesProps {
  initiatives: number
}

export const CutableColumnInitiatives = (props: CutableColumnInitiativesProps) => {
  return <Container>
    <CustomPopover
      id="mouse-over-popover-initiatives"
      title={'Click to see all initiatives'}
    >
      <a href="" style={{ textDecoration: 'none' }}>
        <RoundedBox>
          {props.initiatives}
        </RoundedBox>
      </a>
    </CustomPopover>
  </Container>;
};

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const RoundedBox = styled(Typography)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  backgroundColor: '#333366',
  borderRadius: '10px',
  textDecoration: 'none',
  color: 'white',
  fontSize: '16px'
}));
