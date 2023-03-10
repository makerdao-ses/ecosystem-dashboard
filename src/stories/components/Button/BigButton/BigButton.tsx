import styled from '@emotion/styled';
import { Button } from '@mui/material';
import React from 'react';
import { useThemeContext } from '../../../../core/context/ThemeContext';

interface Props {
  onClick?: () => void;
  title?: string;
  color?: string;
}

const BigButton = ({ onClick, title = 'Back' }: Props) => {
  const { isLight } = useThemeContext();
  return (
    <StyledBigButton isLight={isLight} onClick={onClick}>
      {title}
    </StyledBigButton>
  );
};

const StyledBigButton = styled(Button, { shouldForwardProp: (prop) => prop !== 'isLight' })<{ isLight: boolean }>(
  ({ isLight }) => ({
    minWidth: '287px',
    height: '30px',
    border: isLight ? '1px solid #D4D9E1' : '1px solid #405361',
    borderRadius: '6px',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '12px',
    lineHeight: '15px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#708390',
    padding: '8px 64px',
    letterSpacing: '0px',
    fontFamily: 'Inter, sans-serif',
  })
);

export default BigButton;
