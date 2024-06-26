import { styled } from '@mui/material';
import React from 'react';

interface Props extends React.PropsWithChildren {
  className?: string;
}

const ToolTipsCU: React.FC<Props> = ({ className, children }) => (
  <Container className={className}>{children}</Container>
);

export default ToolTipsCU;

const Container = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 12,
  backgroundColor: theme.palette.isLight ? theme.palette.colors.slate[50] : theme.palette.colors.charcoal[800],
  boxShadow: theme.palette.isLight ? theme.fusionShadows.graphShadow : theme.fusionShadows.darkMode,
  color: theme.palette.isLight ? theme.palette.colors.charcoal[900] : theme.palette.colors.charcoal[100],
}));
