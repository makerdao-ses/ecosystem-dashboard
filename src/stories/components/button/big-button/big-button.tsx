import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

interface Props {
  onClick?: () => void;
  title?: string
  color?: string
}

const BigButton = ({ onClick, title = 'Back' }: Props) => {
  return (
    <StyledBigButton onClick={onClick}>{title}</StyledBigButton>
  );
};

const StyledBigButton = styled(Button)({
  minWidth: '287px',
  height: '30px',
  border: '1px solid #D4D9E1',
  borderRadius: '6px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '12px',
  lineHeight: '14px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#708390',
  padding: ' 8px 64px',
  letterSpacing: '0px',
  fontFamily: 'FT Base, sans-serif'
});

export default BigButton;
