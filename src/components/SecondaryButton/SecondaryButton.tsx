import { styled } from '@mui/material';
import React from 'react';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  className?: string;
  disabled?: boolean;
}

const SecondaryButton: React.FC<Props> = ({ title, onClick, className, disabled = false }) => (
  <Button onClick={onClick} className={className} disabled={disabled}>
    {title}
  </Button>
);

export default SecondaryButton;
const Button = styled('button')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  padding: '4px 24px ',
  borderRadius: '8px',

  textAlign: 'center',
  fontSize: 16,
  lineHeight: '24px',
  fontWeight: 600,
  cursor: 'pointer',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[100],
  border: '1px solid transparent',
  ':hover': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[300] : theme.palette.colors.slate[400]}`,
    color: theme.palette.isLight ? theme.palette.colors.gray[700] : theme.palette.colors.slate[50],
  },
  ':active': {
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[500],
    border: `1px solid ${theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.slate[300]}`,
  },
  ':disabled': {
    border: '1px solid transparent',
    backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[700],
    color: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.slate[300],
    cursor: 'not-allowed',
    ':hover': {
      backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : theme.palette.colors.slate[700],
      color: theme.palette.isLight ? theme.palette.colors.gray[400] : theme.palette.colors.slate[300],
    },
  },
}));
