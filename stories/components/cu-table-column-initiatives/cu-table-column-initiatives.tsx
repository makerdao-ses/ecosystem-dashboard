import React from 'react';
import styled from '@emotion/styled';
import { CustomPopover } from '../custom-popover/custom-popover';

interface CuTableColumnInitiativesProps {
  initiatives: number
}

export const CuTableColumnInitiatives = (props: CuTableColumnInitiativesProps) => {
  return <Container>
    <CustomPopover
      id="mouse-over-popover-initiatives"
      title={'Click to see all initiatives'}
    >
      <a href="" style={{ textDecoration: 'none' }}>
        <RoundedBox className={`${props.initiatives === 0 ? 'disabled' : ''}`}>
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

const RoundedBox = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontFamily: 'SF Pro Text, sans-serif',
  fontWeight: 500,
  width: '58px',
  height: '34px',
  background: '#ECF1F3',
  boxShadow: '0px 20px 40px -40px rgba(219, 227, 237, 0.4), 0px 1px 3px rgba(190, 190, 190, 0.25)',
  borderRadius: '22px',
  color: '#546978',
  '&.disabled': {
    color: '#9FAFB9'
  }
});
