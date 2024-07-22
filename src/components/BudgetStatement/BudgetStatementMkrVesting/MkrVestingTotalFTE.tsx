import { styled } from '@mui/material';
import React from 'react';

interface MkrVestingTotalFTEProps {
  totalFTE: string | number;
  className?: string;
}

const MkrVestingTotalFTE: React.FC<MkrVestingTotalFTEProps> = ({ totalFTE, className }) => (
  <Container className={className}>
    <TotalFte>
      <span>Total FTEs</span>
      <u>{totalFTE}</u>
    </TotalFte>
  </Container>
);

export default MkrVestingTotalFTE;

const Container = styled('div')({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  cursor: 'pointer',
  marginBottom: 16,
});

const TotalFte = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: 18,
  lineHeight: '21.6px',
  color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],

  '> u': {
    fontStyle: 'normal',
    fontFamily: 'Inter, sans-serif',
    fontWeight: 700,
    fontSize: 20,
    lineHeight: '24px',
    paddingBottom: '2px',
    textDecoration: 'none',
    color: theme.palette.isLight ? theme.palette.colors.gray[900] : theme.palette.colors.gray[50],
    marginLeft: 8,
  },
}));
