import { Button, styled } from '@mui/material';
import React from 'react';

interface Props {
  onClick?: () => void;
  title?: string;
  color?: string;
  className?: string;
}

const BigButton = ({ onClick, title = 'Back', className }: Props) => (
  <StyledBigButton onClick={onClick} className={className}>
    {title}
  </StyledBigButton>
);

const StyledBigButton = styled(Button)(({ theme }) => ({
  border: `1px solid ${
    theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800]
  }`,

  borderRadius: '6px',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: 12,
  lineHeight: '18px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.charcoal[700],
  padding: '8px 64px',
  letterSpacing: '0px',
  fontFamily: 'Inter, sans-serif',
  height: '30px',
  minWidth: '287px',
}));

export default BigButton;
