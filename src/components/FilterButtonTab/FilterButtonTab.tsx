import { styled } from '@mui/material';
import React from 'react';

interface Props {
  label: string;
  className?: string;
  handleChange: (value: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isSelect?: boolean;
}

const FilterButtonTab: React.FC<Props> = ({ label, className, handleChange, isSelect = false }) => (
  <Container className={className} onClick={handleChange} isSelect={isSelect}>
    <Text>{label}</Text>
  </Container>
);
export default FilterButtonTab;

const Container = styled('button')<{ isSelect: boolean }>(({ theme, isSelect }) => ({
  minHeight: 32,
  display: 'flex',
  borderRadius: 8,
  border: '0px solid transparent',
  cursor: 'pointer',
  padding: '4px 24px 4px 24px',

  alignItems: 'center',
  background: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  borderBottom: `1px solid ${theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.gray[600]}`,
  ':hover': !isSelect && {
    background: theme.palette.isLight ? theme.palette.colors.slate[100] : theme.palette.colors.charcoal[700],
    borderBottom: theme.palette.isLight
      ? `1px solid ${theme.palette.colors.gray[700]}`
      : `1px solid ${theme.palette.colors.gray[500]}`,
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[500],
    },
  },
  ...(isSelect && {
    background: theme.palette.isLight ? theme.palette.colors.slate[200] : theme.palette.colors.charcoal[600],
    border: theme.palette.isLight
      ? `1px solid ${theme.palette.colors.slate[300]}`
      : `1px solid ${theme.palette.colors.slate[300]}`,
    '& div': {
      color: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.slate[50],
    },
  }),
}));
const Text = styled('div')(({ theme }) => ({
  fontWeight: 600,
  fontSize: 14,
  flexDirection: 'row',
  lineHeight: '24px',
  letterSpacing: '-2%',
  fontFamily: 'Inter, sans-serif',
  color: theme.palette.isLight ? theme.palette.colors.gray[800] : theme.palette.colors.gray[600],
  [theme.breakpoints.up('tablet_768')]: {
    fontSize: 16,
  },
}));
