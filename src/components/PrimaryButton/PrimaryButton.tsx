import { styled } from '@mui/material';
import React from 'react';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  className?: string;
  disabled?: boolean;
}

const PrimaryButton: React.FC<Props> = ({ title, onClick, className, disabled = false }) => (
  <Button onClick={onClick} className={className} disabled={disabled}>
    {title}
  </Button>
);

export default PrimaryButton;
const Button = styled('button')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  padding: '4px 24px ',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  cursor: 'pointer',
  letterSpacing: '-0.32px',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[200],
  color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[900],
  border: '1px solid transparent',
  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[700] : theme.palette.colors.charcoal[100],
    color: theme.palette.isLight ? theme.palette.colors.gray[100] : theme.palette.colors.slate[400],
  },
  ':active': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.slate[500],
    color: theme.palette.isLight ? theme.palette.colors.gray[50] : theme.palette.colors.slate[50],
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[900] : theme.palette.colors.charcoal[300]}`,
  },
  ':disabled': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[900],
    color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: theme.palette.isLight ? theme.palette.colors.charcoal[200] : theme.palette.colors.charcoal[900],
      color: theme.palette.isLight ? theme.palette.colors.gray[500] : theme.palette.colors.slate[400],
    },
  },
}));
