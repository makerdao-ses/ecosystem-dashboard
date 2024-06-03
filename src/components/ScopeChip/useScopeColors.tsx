import { useTheme } from '@mui/material';

interface ColorScheme {
  color: string;
  colorDark: string;
  borderColor?: string;
  borderColorDark?: string;
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
      color: theme.palette.colors.slate[200],
      borderColor: 'rgba(179, 179, 211, 1)',
      colorDark: 'rgba(111, 122, 133, 0.6)',
      borderColorDark: 'rgba(179, 179, 211, 0.4)',
    },
    'Support Scope': {
      color: theme.palette.colors.blue[800],
      colorDark: 'rgba(0, 132, 255, 0.4)',
    },
    'Stability Scope': {
      color: theme.palette.colors.red[800],
      colorDark: 'rgba(234, 67, 53, 0.4)',
    },
    'Accessibility Scope': {
      color: theme.palette.colors.green[700],

      colorDark: 'rgba(52, 168, 83, 0.4)',
    },
    'Protocol Scope': {
      color: theme.palette.colors.orange[700],
      colorDark: 'rgba(255, 138, 0, 0.4)',
    },
    'Governance Scope': {
      color: theme.palette.colors.purple[800],
      colorDark: 'rgba(142, 85, 234, 0.4)',
    },
  };

  return colors;
};

export default useScopeColors;
