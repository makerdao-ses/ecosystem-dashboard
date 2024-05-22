import { useTheme } from '@mui/material';

interface ColorScheme {
  color: string;
  background: string;
  colorDark: string;
  backgroundDark: string;
}

export interface CustomColors {
  All: ColorScheme;
  RFC: ColorScheme;
  'Formal Submission': ColorScheme;
  Rejected: ColorScheme;
  Accepted: ColorScheme;
  Obsolete: ColorScheme;
  Withdrawn: ColorScheme;
}

export const useCustomColors = () => {
  const theme = useTheme();
  const colors: CustomColors = {
    All: {
      color: '#5D48FF',
      background: '#F7F5FF',
      colorDark: '#5D48FF',
      backgroundDark: '#432CFF33',
    },
    RFC: {
      color: theme.palette.colors.blue[800],
      background: theme.palette.colors.blue[100],
      colorDark: theme.palette.colors.blue[50],
      backgroundDark: 'rgba(0, 132, 255, 0.4)',
    },
    'Formal Submission': {
      color: theme.palette.colors.orange[800],
      background: theme.palette.colors.orange[100],
      colorDark: theme.palette.colors.orange[100],
      backgroundDark: 'rgba(255, 138, 0, 0.4)',
    },
    Rejected: {
      color: theme.palette.colors.red[800],
      background: theme.palette.colors.red[100],
      colorDark: theme.palette.colors.red[100],
      backgroundDark: 'rgba(234, 67, 53, 0.4)',
    },
    Accepted: {
      color: theme.palette.colors.green[800],
      background: theme.palette.colors.green[100],
      colorDark: theme.palette.colors.green[50],
      backgroundDark: 'rgba(52, 168, 83, 0.4)',
    },
    Withdrawn: {
      color: theme.palette.colors.orange[800],
      background: theme.palette.colors.orange[100],
      colorDark: theme.palette.colors.orange[100],
      backgroundDark: 'rgba(255, 138, 0, 0.4)',
    },
    Obsolete: {
      color: theme.palette.colors.gray[500],
      background: theme.palette.colors.slate[50],
      colorDark: theme.palette.colors.gray[50],
      backgroundDark: 'rgba(72, 82, 101, 0.4)',
    },
  };

  return colors;
};
