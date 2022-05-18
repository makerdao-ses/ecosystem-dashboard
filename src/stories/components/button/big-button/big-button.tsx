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
    <StyledBigButton onClick={onClick} >{title}</StyledBigButton>
  );
};

const StyledBigButton = styled(Button)({
  minWidth: '512px',
  height: '32px',
  border: '1px solid rgba(37, 39, 61, 0.75)',
  borderRadius: '8px',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  textTransform: 'none',
  color: '#000000',
});

export default BigButton;
