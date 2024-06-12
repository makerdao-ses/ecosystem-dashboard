import { styled } from '@mui/material';
import React from 'react';

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: string;
  className?: string;
}

const ButtonOpenMenu: React.FC<Props> = ({ title, onClick, className }) => (
  <Button onClick={onClick} className={className}>
    {title}
  </Button>
);

export default ButtonOpenMenu;
const Button = styled('button')(({ theme }) => ({
  padding: '4px 24px ',
  borderRadius: '8px',
  border: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.isLight ? theme.palette.colors.gray[200] : 'red',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : 'red',
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 600,
  cursor: 'pointer',
}));
