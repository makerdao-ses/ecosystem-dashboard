import { styled } from '@mui/material';
import React from 'react';
import ToolTipsCU from './ToolTips';

interface Props {
  value: number;
}

export const ActualsTooltip: React.FC<Props> = ({ value }) => (
  <ToolTipsCU>
    <Container>
      <Value>
        {value.toLocaleString('en-US', {
          maximumFractionDigits: 0,
        })}
      </Value>
      <Text>Actuals Expenditure</Text>
    </Container>
  </ToolTipsCU>
);

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

const Text = styled('label')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 16,
  fontWeight: 500,
  lineHeight: '24px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
}));
const Value = styled('div')(({ theme }) => ({
  fontFamily: 'Inter, sans-serif',
  fontSize: 18,
  fontWeight: 700,
  lineHeight: '21.6px',
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
}));
