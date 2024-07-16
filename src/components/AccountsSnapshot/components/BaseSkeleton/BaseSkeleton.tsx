import { Skeleton, styled } from '@mui/material';

export const BaseSkeleton = styled(Skeleton)(({ theme }) => ({
  background: theme.palette.isLight ? theme.palette.colors.charcoal[100] : theme.palette.colors.charcoal[800],
  width: '100%',
  borderRadius: 4,
  transform: 'scale(1)',
}));
