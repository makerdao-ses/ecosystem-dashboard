import React from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

interface Props {
  onClick?: () => void;
  title?: string;
}

const SmallButton = ({ onClick, title = 'Back' }: Props) => {
  return (
    <StyledSmallButton onClick={onClick} >{title}</StyledSmallButton>
  );
};

const StyledSmallButton = styled(Button)`
border-radius: 8px;
display:flex ;
flex-direction: row;
background-color  : #C4C4C4 ;
 min-width: 45px;
height: 23px;
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
color: #25273D;
padding:4px 8px;
text-transform:none ;
:hover {
    background-color  : #C4C4C4 ;
}
`;

export default SmallButton;
