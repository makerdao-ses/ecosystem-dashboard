import { styled } from '@mui/material';
import React from 'react';

interface Props {
  year: string;
}

const LineYearBorderBottomChart: React.FC<Props> = ({ year }) => (
  <YearXAxis>
    <YearText>{year}</YearText>
  </YearXAxis>
);

export default LineYearBorderBottomChart;

const YearXAxis = styled('div')(({ theme }) => {
  const border = `1px solid ${theme.palette.mode === 'light' ? '#6EDBD0' : '#1AAB9B'}`;

  return {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 5,
    height: 11,
    borderLeft: border,
    borderRight: border,
    borderBottom: border,
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  };
});

const YearText = styled('div')(({ theme }) => ({
  fontSize: 11,
  lineHeight: 'normal',
  color: theme.palette.mode === 'light' ? '#139D8D' : '#2DC1B1',
  position: 'absolute',
  bottom: -6,
  width: 52,
  left: '50%',
  transform: 'translateX(-50%)',
  backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#000000',
  textAlign: 'center',
}));
