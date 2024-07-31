import { useTheme } from '@mui/material';

interface ColorScheme {
  color: string;
  colorDark: string;
  borderColor?: string;
  borderColorDark?: string;
  background?: string;
  backgroundDark?: string;
}

export interface ScopeColors {
  All: ColorScheme;
  'Support Scope': ColorScheme;
  'Stability Scope': ColorScheme;
  'Accessibility Scope': ColorScheme;
  'Protocol Scope': ColorScheme;
  'Governance Scope': ColorScheme;
}

const useScopeColors = (): ScopeColors => {
  const theme = useTheme();
  const colors: ScopeColors = {
    All: {
      color: theme.palette.colors.charcoal[500],
      borderColor: theme.palette.colors.charcoal[500],
      background: theme.palette.colors.charcoal[100],
      colorDark: 'rgba(111, 122, 133, 0.70)',
      borderColorDark: 'rgba(179, 179, 211, 0.40)',
      backgroundDark: 'rgba(179, 179, 211, 0.15)',
    },
    'Support Scope': {
      color: theme.palette.colors.blue[700],
      colorDark: 'rgba(0, 132, 255, 0.70)',
      background: theme.palette.colors.blue[50],
      backgroundDark: 'rgba(0, 132, 255, 0.15)',
    },
    'Stability Scope': {
      color: theme.palette.colors.red[800],
      colorDark: 'rgba(234, 67, 53, 0.70)',
      background: theme.palette.colors.red[100],
      backgroundDark: 'rgba(234, 67, 53, 0.15)',
    },
    'Accessibility Scope': {
      color: theme.palette.colors.green[700],
      colorDark: 'rgba(52, 168, 83, 0.70)',
      background: theme.palette.colors.green[50],
      backgroundDark: 'rgba(52, 168, 83, 0.15)',
    },
    'Protocol Scope': {
      color: theme.palette.colors.orange[700],
      colorDark: 'rgba(255, 138, 0, 0.70)',
      background: theme.palette.colors.orange[100],
      backgroundDark: 'rgba(255, 138, 0, 0.15)',
    },
    'Governance Scope': {
      color: theme.palette.colors.purple[800],
      colorDark: 'rgba(142, 85, 234, 0.70)',
      background: theme.palette.colors.purple[100],
      backgroundDark: 'rgba(142, 85, 234, 0.15)',
    },
  };

  return colors;
};

export default useScopeColors;
