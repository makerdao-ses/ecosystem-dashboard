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

const StyledBigButton = styled(Button)`
min-width: 512px;
height: 32px;
border:1px solid rgba(37, 39, 61, 0.75);
border-radius: 8px;
font-family: 'Inter, sans-serif';
font-style: normal;
font-weight: 500;
font-size: 12px;
line-height: 15px;
text-align: center;

color: #000000;
`;

export default BigButton;
