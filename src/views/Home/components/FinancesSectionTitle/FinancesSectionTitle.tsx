import { styled } from '@mui/material';

export const SectionTitle = styled('h2')(({ theme }) => ({
  margin: 0,
  fontWeight: 700,
  fontSize: 24,
  lineHeight: '28.8px',
  color: theme.palette.isLight ? theme.palette.colors.gray[600] : theme.palette.colors.slate[300],

  [theme.breakpoints.up('desktop_1280')]: {
    fontSize: 32,
    lineHeight: '38.4px',
  },
}));
