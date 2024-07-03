import { Skeleton, styled } from '@mui/material';

export const BaseSkeleton = styled(Skeleton)(({ theme }) => ({
  background: theme.palette.isLight ? '#ECF1F3' : '#31424E',
  width: '100%',
  borderRadius: 25,
  transform: 'scale(1)',
}));
