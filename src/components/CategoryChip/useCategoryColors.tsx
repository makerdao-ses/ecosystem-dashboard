import { useTheme } from '@mui/material';

export interface ColorScheme {
  border: string;
  borderDark: string;
}

export interface CustomColors {
  Legal: ColorScheme;
  Technical: ColorScheme;
  Growth: ColorScheme;
  Operational: ColorScheme;
  Support: ColorScheme;
  Business: ColorScheme;
  RWAs: ColorScheme;
  All: ColorScheme;
  Finance: ColorScheme;
  ScopeFacilitator: ColorScheme;

  // TODO: This need new colors
  AdvisoryCouncilMember: ColorScheme;
  ActiveEcosystemActor: ColorScheme;
  [key: string]: ColorScheme;
}

export const useCategoryColors = () => {
  const theme = useTheme();

  const colors: CustomColors = {
    All: {
      border: '#CED3DC',
      borderDark: '#373E4DB2',
    },

    Legal: {
      border: theme.palette.colors.green[100],
      borderDark: '#4FC86F4D',
    },
    Technical: {
      border: theme.palette.colors.blue[600],
      borderDark: '#0084FF4D',
    },
    Growth: {
      border: theme.palette.colors.red[300],
      borderDark: '#EA43354D',
    },
    Operational: {
      border: theme.palette.colors.purple[300],
      borderDark: '#8E55EA4D',
    },
    Support: {
      border: theme.palette.colors.orange[300],
      borderDark: '#FF8A004D',
    },
    Business: {
      border: theme.palette.colors.green[300],
      borderDark: '#34A8534D',
    },
    RWAs: {
      border: theme.palette.colors.fusion[200],
      borderDark: '#FF104D4D',
    },
    Finance: {
      border: theme.palette.colors.blue[100],
      borderDark: '#329DFF4D',
    },
    ActiveEcosystemActor: {
      border: theme.palette.colors.orange[100],
      borderDark: '#FFA1324D',
    },
    AdvisoryCouncilMember: {
      border: theme.palette.colors.orange[100],
      borderDark: '#FFA1324D',
    },
    ScopeFacilitator: {
      border: theme.palette.colors.orange[100],
      borderDark: '#FFA1324D',
    },
  };

  return colors;
};
