/* eslint-disable indent */

import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';

interface Props {
    onClick?: () => void;
    title?: string
    color?: string
}

const SmallButton = ({ onClick, title = 'Back' }: Props) => {
    return (
        <StyledSmallButton onClick={onClick} >{title}</StyledSmallButton>
    );
};

const StyledSmallButton = styled(Button)`
border-radius: 8px;
background-color  : #C4C4C4 ;
width: 45px;
height: 23px;
font-family: 'Inter, sans-serif';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
color: #25273D;
padding:4px 8px;
:hover {
    background-color  : #C4C4C4 ;
    color: #25273D;
}
`;

export default SmallButton;
